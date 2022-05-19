import { storeBranchLocation } from "@food-app/api-interfaces";
import { prisma } from "../../prisma"

// Get
export const findAllStoreLocation=()=>{
    return prisma.store_branch.findMany({
        where:{
            is_public: true
        }
    });
};

// Post
export const newStoreLocation =(storeInfo:storeBranchLocation)=>{
    return prisma.store_branch.create({
        data:{ 
            store_name: storeInfo.store_name,
            description: storeInfo. description,
            city: storeInfo.city,
            store_geo_location: storeInfo.store_geo_location,
            is_public: storeInfo.is_public,
        }
    })
};

// Delete
export const deleteBranch=(storeId:string)=>{
    prisma.store_branch.delete({
        where:{id: storeId}
    })
};