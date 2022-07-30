const mongoose = require('mongoose')

// returning promise since mongoose.connect returns promise
const connectDB = (url)=>{
    mongoose
    .connect(url,
    {
     useNewUrlParser:true,
     useCreateIndex:true,
     useFindAndModify:false,
     useUnifiedTopology:true        
    })
}

module.exports = connectDB