import helmet from 'helmet'
import express from 'express'
import authRoutes from '../routes/auth.routes.js'

export const appConfig=async (app)=>{
    const PORT=process.env.PORT||5000
    app.use(express.json())

     app.use('/api/auth',authRoutes)
    app.get('/',(req,res)=>{
        res.send("Server is ready")
    })
   
    
    app.listen(PORT,()=>{
        
        console.log("server is running at the port",PORT);
        
    })

}