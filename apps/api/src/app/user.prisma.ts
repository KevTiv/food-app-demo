import { ROLE, userInfoType } from '@food-app/api-interfaces';
import { prisma } from '../prisma';

// Get user 
export const findAllUsers= async(isActive?: boolean)=>{
    return await prisma.user.findMany({
        where:{ isActive: isActive??true }
    })
};
export const findAllCustomers= (isActive?: boolean)=>{
    return prisma.user.findMany({
        where:{ 
            isActive: isActive ?? true, 
            role: ROLE.C1001
        }
    })
};
export const findAllEmployees= (isActive?: boolean)=>{
    return prisma.user.findMany({
        where:{ 
            isActive: isActive ?? true, 
            role: ROLE.E3210
        }
    })
};
export const findAllManagers= (isActive?: boolean)=>{
    return prisma.user.findMany({
        where:{ 
            isActive: isActive ?? true, 
            role: ROLE.M4321
        }
    })
};

export const findUser=(user_id?:string, username?:string, email?:string)=>{
    if(user_id){
        return prisma.user.findUnique({
            where:{ id: user_id }
        })
    }else if(email){
        return prisma.user.findUnique({
            where:{ email: email }
        })
    } else{
        return prisma.user.findUnique({
            where:{ username: username }
        })
    }
};
export const findUserMetaData= (user_id :string)=>{
    return prisma.user_metadata.findUnique({
        where:{
            user_id: user_id
        }
    })
};
//Post user
export const newUser= async(userInfo:userInfoType)=>{
    await prisma.user.create({
        data:{
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email,
            first_name: userInfo.first_name??'',
            last_name: userInfo.last_name??'',
        }
    })
};
export const newUserMetadata = async(userInfo:userInfoType)=>{
    const {id} = await findUser(userInfo.username);
    await prisma.user_metadata.create({
        data:{
            user_id: id,
            address_line1: userInfo.address_line1??'',
            address_line2: userInfo.address_line2??'',
            city: userInfo.city ??'',
            postal_code: userInfo.postal_code ??'',
            country: userInfo.country ?? '',
            telephone: userInfo.telephone ?? '',
            mobile: userInfo.mobile ?? '',
        }
    })
};

//Modify users
export const updateUser =  async(userInfo:userInfoType, user_id:string)=>{
    await prisma.user.update({
        where: {id:user_id},
        data:{
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email,
            first_name: userInfo.first_name??'',
            last_name: userInfo.last_name??'',
        }
    })
};
export const updateUserMetadata = async(userInfo:userInfoType, user_id:string)=>{
   await prisma.user_metadata.update({
        where: {user_id:user_id},
        data:{
            address_line1: userInfo.address_line1,
            address_line2: userInfo.address_line2,
            city: userInfo.city,
            postal_code: userInfo.postal_code,
            country: userInfo.country,
            telephone: userInfo.telephone,
            mobile: userInfo.mobile,
        }
    })
};
//Deactivate user
export const deactivateUser =  async(user_id:string) =>{
    const {isActive} = await findUser(user_id);
    if(isActive){
        await prisma.user.update({
            where: {id:user_id},
            data:{
                isActive: false
            }
        });
    }
};