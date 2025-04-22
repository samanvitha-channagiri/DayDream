import User from '../models/user.model.js'
import {hashPassword} from '../utils/hashPassword.js'
import { createUser } from '../services/auth.services.js';
export const registerController=async(req,res,next)=>{

    const {firstName,lastName,email,password}=req.body;
try{
    
    if(!firstName||!lastName||!email||!password){
        return res.status(400).json({message:"All fieldsare required"})
    }
    if(password.length<6){
        return res.status(400).json({message:"Password must be atleast 6 characters long"})
    }

    const user=await User.findOne({email});
    if(user) return res.status(400).json({message:"Email already exists"});
    const hashedPassword=await hashPassword(password);
    const savedData=await createUser({
        firstName,
        lastName,
        email,
        password:hashedPassword
    });

    res.status(201).json({
        error:false,
        data:savedData
    })
}
catch(error){
    console.log("Error in register controller",error);
    res.status(500).json({message:"Internal server error"})

}
    

 


}