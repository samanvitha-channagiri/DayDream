import User from '../models/user.model.js'

export const createUser=async (userData)=>{
    const data=new User(userData);
    return await data.save()

}