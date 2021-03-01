const mongoose = require('mongoose');
const Category = mongoose.model('Category')


//Creating new categories in to the DB...
module.exports.create = (req,res)=>{

    //Create a Category...
    const category = new Category({
        title:req.body.title,
        status:req.body.status
    });
    // Save category in databse..
    category.save(category).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({message:err.message||"Some error occurred."})
    });
}

//Retrieve all category from the database..
module.exports.findAll = (req,res)=>{
    const title = req.query.title;
    Category.find(title).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({message:err.message||"Some error occurred."})
    });
}

//Remove Categories from the Database....
module.exports.delete=(req,res)=>{
    //console.log(req.params.id);
    Category.findOneAndRemove({_id:req.params.id},(err,result)=>{  
        if(err){
               res.status(500).json({errmsg:err});
           }else{
               res.status(200).json({msg:result+"Deleted"})
           }
    })
}

//updating categories from the databse..
module.exports.update=(req,res)=>{
    // console.log(req.params.id);
     Category.findOneAndUpdate({_id:req.params.id},req.body,(err,result)=>{
         if(err){
             res.send(err)
         }else{
             res.send(result)
             console.log("updated");
         }
     });
 }