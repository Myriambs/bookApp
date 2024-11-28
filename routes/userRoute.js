const express = require('express')
const userRoute = express.Router()
const User= require('../model/AuthModel')
const Feedback = require('../model/FeedBAck')
// ajout library 
//http://localhost:5000/user/library/67483dc1f73ac954874998c9

userRoute.post('/:id/library/:bookId',async(req,res)=>{
    try{
        //id mte3 el user 
const{id}=req.params
//id du livre 
const{bookId} = req.params
const user = await User.findById(id)
user.library.push(bookId)
await user.save()
const newBookLibrary = user.library
res.status(200).json({msg:'book added to ur user library', newBookLibrary,user})
}catch(err){
 res.status(500).json({ error: err.message });
}
})

//creation d'un user 

userRoute.post('/adduser',async(req,res)=>{
    try{
const newUSer = await User.create(req.body)
res.status(200).json({msg:"new user",newUSer})

}catch(err){
        console.log(err)
    }
})


//partie feedback 
//http://localhost:5000/user/67483e5af73ac954874998cc/addfeedback/67483dc1f73ac954874998c9
userRoute.post('/:id/addfeedback/:bookId',async(req,res)=>{
    try{
const {id}=req.params
const {bookId}=req.params

const feedback = await Feedback.create({
    userId:id,
    bookId,
    ...req.body
})

res.status(200).json({msg:"la creation du feedback done",feedback})




    }catch(err){
        res.status(500).json({ error: err.message });

    }
})

userRoute.patch('/:idFeed',async(req,res)=>{
    try{

const {idFeed} = req.params ;
const {note} = req.body;
console.log("note",note,idFeed)
const foundFeedback = await Feedback.findById(idFeed)

if(!foundFeedback){ return res.status(404).json({msg:'Feedback not found'})}
console.log(foundFeedback)
foundFeedback.note = note 
console.log(foundFeedback)
const updatedFeedback = await foundFeedback.save()
console.log(updatedFeedback)

res.status(200).json({msg:'voici la version updated', updatedFeedback})
    }catch(err){
        res.status(500).json({ error: err.message });

    }
})


userRoute.delete('/:idFeed',async(req,res)=>{
    try{

const {idFeed}=req.params
await Feedback.findByIdAndDelete(idFeed)
res.status(200).json({msg:'Feedback deleted'})
    }catch(err){
        res.status(500).json({ error: err.message });

    }
})

userRoute.get('/:id',async(req,res)=>{
    try{
const {id}=req.params
const feedback = await Feedback.findById(id)
.populate('userId','userName')
.populate('bookId','titre author')
if(!feedback){
    return res.status(404).json({msg:" feedback partie populate not found"})
}
res.json(feedback)

    }catch(err){
        res.status(500).json({ error: err.message });

    }
})



module.exports = userRoute