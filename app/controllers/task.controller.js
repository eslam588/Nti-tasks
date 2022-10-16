const connect = require('../db/connect');
const ObjectId= require("mongodb").ObjectId

class Task {
     // add page
    static addPage = (req,res) => {
        res.render("add")
    }
   
    //add logic
    static addLogic = (req,res) => {
        connect(async(err,db)=>{
            if(err) res.render("error404", {pageTitle:"database error 1"})
            try{
                req.body.status=false;
                req.body.duedate= new Date()
                const task = (await db.collection("tasks").find({title:req.body.title}).toArray())[0];
                if(task){
                    res.render("add", {invalidTitle:"true"})
                } 
                else{
                    await db.collection("tasks").insertOne(req.body);
                    res.redirect("/");  
                }    
            }
            catch(e){
                res.render("error404", {pageTitle:"database error 2"})
            }
        }) 
    }

    //................................................................................................................

    // show all  tasks
    static showAll = (req,res) => {
        connect(async(err,db)=> {
            if(err) res.render("error404")
            try{
                const tasks = await db.collection("tasks").find().toArray()
                res.render("home",{
                pageTitle:"all Tasks",
                tasks,
                isEmpty : !tasks.length
                })
            }
            catch(e){
                res.send(e.message)   
            }
        })
    }

    //................................................................................................................

    // single task

    static single = (req,res)=>{
        connect(async(err,db)=> {
            if(err) res.render("error404")
            try{
                const singleTask = (await db.collection("tasks").find({_id: new ObjectId(req.params.id)}).toArray())[0];
                res.render("single",{
                pageTitle:"single task", 
                singleTask     
                })
            }
            catch(e){
                res.send(e.message)   
            }
        })
    }

    //...............................................................................................................

    // edit page 

    static edit = (req,res) => {
        let Id=req.params.id;
        connect(async(err,db)=> {
            if(err) res.render("error404")
            try{
                const editTask= (await db.collection("tasks").find({_id: new ObjectId(req.params.id)}).toArray())[0];
                // let taskstatus;
                // if(editTask.status=="true"){
                //     taskstatus="checked"
                // }
                // else{
                //     taskstatus="unchecked"
                // }
                res.render("edit",{
                    editTask
                })
            }
            catch(e){
                res.send(e.message)   
            }
        })
    }
    
    static editLogic = (req,res) => {
        connect(async(err,db)=> {
            if(err) res.render("error404")
            try{
                req.body.status=="checked" ? true : false 
                const singleTask = await db.collection("tasks").updateOne({_id: new ObjectId(req.params.id)},{$set : {...req.body}})
                res.redirect("/"); 
            }
            catch(e){
                res.send(e.message)   
            }
        })
        
    }




    //................................................................................................................

    // delete task
    static del = (req,res) => {
        connect(async(err,db)=> {
            if(err) res.render("error404")
            try{
                const data = await db.collection("tasks").deleteOne({_id: new ObjectId(req.params.id)})
                res.redirect("/");
            }
            catch(e){
                res.send(e.message)   
            }
        })

    }
}

module.exports = Task;