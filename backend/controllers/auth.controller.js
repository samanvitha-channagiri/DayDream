import User from '../models/user.model.js'
import {hashPassword} from '../utils/hashPassword.js'
import { createUserOrUpdate,findUser} from '../services/auth.services.js';
import { comparePassword } from '../utils/comparePassword.js';
import { generateTokens } from '../utils/generateToken.js';

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
    const savedData=await createUserOrUpdate({
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
    console.log("Error in register controller",error.message);
    res.status(500).json({message:"Internal server error"})

}
}

export const loginController=async(req,res,next)=>{
    const{email,password}=req.body;
    try{
        const user=await findUser(email);
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})

        }
        const correctPassword=await comparePassword(password,user.password);
        if(!correctPassword){
            return res.status(400).json({message:"Invalid credentials"})

        }
        const { token, refreshToken } = await generateTokens(user,process.env.LOGIN_SECRET);

        const updatedData=await createUserOrUpdate(
            {
                refreshToken:refreshToken,
            },user
        );
        res.cookie("accessToken",token,{
            httpOnly:true,
            secure:true,
        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:true
        });
        res.status(201).json({
            error:false,
            data:updatedData,
            accessToken:token,
            refreshToken:refreshToken
        })

    }catch(error){
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal server error"})

    }
}