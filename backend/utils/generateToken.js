import jwt from 'jsonwebtoken'


export const generateTokens=async(user,secret)=>{
    let token=jwt.sign(
        {
            data:{email:user?.email}
        },
        secret,
        {expiresIn:60*60}
    );
    let refreshToken=jwt.sign(
       { data:{email:user?.email}},
        secret,
        {expiresIn:"7d"}
    );
    return {token,refreshToken}
}