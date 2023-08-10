const express = require('express');
const studentRoutes = require('./src/student/routes');
const app = express();
const port = 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send('Hello world')
})

app.use('/students',studentRoutes);

app.listen(port,()=>{
    console.log(`App running on http://localhost:${port}`);
});