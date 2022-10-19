require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const workoutRoutes=require('./routes/workouts');
const userRoutes =require('./routes/user')
port = 4000;
const PORT = process.env.PORT;

//middleware
app.use(express.json());

app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user',userRoutes)
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res)=>res.sendFile(path.resolve(__dirname, '../', 
    'frontend', 'build', 'index.html')))
}else {
    app.get('/', (req, res)=>{
        res.send('please set to production')
    })
}

//connect to DB
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT || port, ()=>{
        console.log("connected to DB and listening at ",process.env.PORT || port);
    })
}).catch((err)=>{
    console.log(err);
})

 
