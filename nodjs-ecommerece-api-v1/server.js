const express = require('express');
const dotenv = require("dotenv");
const morgan = require('morgan');

// Load environment variables from config.env
dotenv.config({ path: 'config.env' });
const ApiError=require('./utils/ApiError');
const globalError=require('./middleWhere/errorMiddleWhere');
// Express app
const app = express();

// Connect to the database
const dbConnection = require("./config/database");
dbConnection();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Log requests in development mode
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
    console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Import and use routes
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/categories', subCategoryRoute);
//we make this to check if he go in any route iam not make it so handle it
//so this is middle where to catch the error and go by (next) to the globar middlewhere handler to handle the error
app.all("*",(req,res,next)=>{
/* //create error and send it to error handling middlewhere
const err=new Error(`can't find this route:${req.originalUrl}`)
//i want to pass this error the next middlewhere (by next)
next(err.message); */

//here we generate general error handling class to custmize any error 
next(new ApiError(`can't find this route:${req.originalUrl}`,400))
})
//if in the middlewhere above error not happen we not go the below middle where and give her the err to handle it 
//express provide middle where take 4 paremeters express understand that this is error handling middlewhere and give me the error and i can control it
//Global error handling middlewhere for errors in the express
app.use(globalError);

// Dynamic port configuration
const PORT = process.env.PORT || 8000; // Default to 8000 if PORT is not defined
const server= app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

//event => list => callback(err)
//this for all errors out of express the any error of rejection out of express then we handle it
process.on("unhandledRejection",(err)=>{
    console.error(`unhandledRejection error:${err.name}|${err.message}`);
    server.close(()=>{// imake this part bec if we exit first without closing server if any api request is pinding so ito not excute
        console.error(`shutdowen............`);
        process.exit(1);
    })
   
});