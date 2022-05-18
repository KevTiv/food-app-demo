import { prisma } from "../prisma"

// Get
export const findAllStoreLocation=()=>{
    return prisma.store_branch.findMany({
        where:{
            is_public: true
        }
    });
};
