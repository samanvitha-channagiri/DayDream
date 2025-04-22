import User from '../models/user.model.js'

export const createUserOrUpdate=async (userData,updateUser)=>{
    if(Boolean(updateUser)){
        for(let key in userData){
            updateUser[key]=userData[key];
        }
        return updateUser.save(); //here await is not needed
    }
    const data=new User(userData);
    return await data.save() //here await is needed

}

export const findUser=async (email)=>{
    const user=User.findOne({email})
    if(user){
        return await user;
    }
}