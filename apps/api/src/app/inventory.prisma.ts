import { productInventoryInfoType } from "@food-app/api-interfaces";
import { prisma } from "../prisma"

// Get 
export const findInventoryAtLocation = ()=>{
    return prisma.product_inventory_at_branch.findMany({
        orderBy:{
            store_id: 'asc',
            created_at:'desc'
        }
    })
};
export const findTotalInventory= ()=>{
    return prisma.product_inventory.findMany({
        orderBy:{
            created_at:'desc'
        }
    })
};

// Post
export const newInventoryEntryAtLocation= async(inventoryInfo:productInventoryInfoType)=>{
    await prisma.product_inventory_at_branch.create({
        data:{
            store_id: inventoryInfo.store_id,
            product_id: inventoryInfo.product_id,
            employee_id: inventoryInfo.employee_id,
            quantity: inventoryInfo.quantity,
        }
    })
};
export const newTotalInventory= async(inventoryInfo:productInventoryInfoType)=>{
    await prisma.product_inventory.create({
        data:{
            product_id: inventoryInfo.product_id,
            quantity: inventoryInfo.quantity,
        }
    })
};