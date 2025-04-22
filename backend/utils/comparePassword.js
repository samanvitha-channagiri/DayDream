import bcrypt from 'bcryptjs'

export const comparePassword=async(hashPassword,hashedPassword)=>{
    return await bcrypt.compare(hashPassword,hashedPassword)
}