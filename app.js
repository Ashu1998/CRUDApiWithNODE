const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/employeedata'
const app = express();

mongoose.connect(url,{useNewUrlParser:true});
const con = mongoose.connection
con.on('open',()=>{
    console.log('connected...');
});

app.use(express.json());

const emploeeRouter = require('./routers/employeeInfo');
app.use('/employeeInfo',emploeeRouter);


app.listen(9000,()=>{
    console.log('Server Started');
});