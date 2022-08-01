const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req,res)=>{
    const tasks = await Task.find({})
    res.status(200).json({tasks})   

    // other options
    // res.status(200).json({tasks,totalTasks:tasks.length})   
    // res.status(200).json({tasks,success:true})  
})

const createTask = asyncWrapper(async (req,res) => {
    const body = req.body;
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper(async(req,res,next) => {
      const{id:taskId} = req.params
      const task = await Task.findOne({_id:taskId});

      if(!task){
        return next(createCustomError(`No task with id : ${taskId}`,404))
      }

      res.status(200).json({task})
      // since we are not really interested in the object we get on deletion
      // we can also use res.status(200).send()
      // or res.status(200).json({task: null,status:'success'})
})

const updateTask = asyncWrapper(async(req,res) => {
      const {id:taskId} = req.params;
      const body = req.body;

      const task = await Task.findOneAndUpdate({_id:taskId},body,{
        new: true,
        runValidators: true,
      }) 

      if(!task){
        return next(createCustomError(`No task with id : ${taskId}`,404))
      }

      res.status(200).json({task})
})

const deleteTask = asyncWrapper(async(req,res) => {
      const{id:taskId} = req.params;
      const task = await Task.findOneAndDelete({_id:taskId})

      if(!task){
        return next(createCustomError(`No task with id : ${taskId}`,404)) 
      }

      res.status(200).json({task})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}