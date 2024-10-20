const mongoose=require('mongoose');
const dbConnection  = ()=>{
//connect to DB
mongoose.connect(process.env.DB_URI).then((conn)=>{
    console.log(`data base connected:${conn.connection.host}`)
})//.catch((err)=>{
    //console.error(`database error:${err}`);
    //process.exit(1);
//});
};
module.exports=dbConnection;