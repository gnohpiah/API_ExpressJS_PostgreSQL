const pool = require('../../db.js');
const queries = require('./queries.js')

const getStudents = (req,res) =>{
    pool.query(queries.getStudents,(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const getStudentById = (req,res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(error,results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const addStudent = (req,res) =>{
    const {name,email,age,dob} = req.body;
    pool.query(queries.checkEmailExists,[email],(error,results)=>{
        if(results.rows.length){
            res.send("Email already exists");
        }
        else pool.query(queries.addStudent,[name,email,age,dob],(error,results)=>{
            if(error) throw error;
            res.status(201).send("Student created successfully");
        })
    })
}

const removeStudent = (req,res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(error,results)=>{
        if(!results.rows.length){
            res.send("No student found");
        }
        else pool.query(queries.removeStudent,[id],(error,result)=>{
            if(error) throw error;
            res.status(200).send(`Deleted student id = ${id} successfully`)
        })
    })
}

const updateStudent = (req,res) =>{
    const id = parseInt(req.params.id);
    const {name} = req.body;
    pool.query(queries.getStudentById,[id],(error,results)=>{
        if(!results.rows.length){
            res.send("No student found");
        }
        else pool.query(queries.updateStudent,[name,id],(error,results)=>{
            if(error) throw error;
            res.status(200).send(`Updated student ${name} successfully`)
        })
    })
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
}