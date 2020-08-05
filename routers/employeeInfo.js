const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.get('/',async(req,res)=>{
   try{
       const employeeData = await Employee.find();
       res.json(employeeData);

   }
   catch(err)
   {
    res.status(402).send('Something went wrong');

   }
});

router.get('/:id',async(req,res)=>{
    try{
        const employeeData = await Employee.findById(req.params.id);
        res.json(employeeData);
 
    }
    catch(err)
    {
     res.status(402).send('Something went wrong');
 
    }
 });

router.post('/',async(req,res)=>{
    const employ = new Employee(
        {
            name: req.body.name,
            designation: req.body.designation,
            company: req.body.company,
            department: req.body.department
        });
        
        try{
            const data = await employ.save();
            res.json(data);

        }
        catch(err){
            res.status(402).send(err.toString());
        }

});

router.patch('/:id',async(req,res)=>{

    if(!req.body)
    {
        return res.status(400).send({
            message: "Data to update can not be empty!"
          });
    }
    try{
        const employ = await Employee.findById(req.params.id);
        employ.company = req.body.company?req.body.company:employ.company;
        employ.name = req.body.name? req.body.name : employ.name;
        employ.designation = req.body.designation? req.body.designation : employ.designation;
        employ.department = req.body.department? req.body.department : employ.department;
         employ.save().then(data=>{
             if(!data)
             {
                res.status(404).send({message:'Data not found'});

             }
             else
             {
                res.send({message:'Data Updated Successfully!'});

             }
         })


    }
    catch(err){
        res.status(402).send(err.toString());


    }

    
});



router.delete('/:id',async(req,res)=>{

    try{
     Employee.findByIdAndRemove(req.params.id)
     .then(data =>{
         if(!data)
         {
             res.status(404).send('Data not found');
         }
         else{
             res.send({message:"Data was deleted successfully"});
         }
     })

    }
    catch(err)
{
    res.status(402).send(err.toString());


    }
});




module.exports = router