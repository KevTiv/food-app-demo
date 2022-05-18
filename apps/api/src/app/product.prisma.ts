import { productInfoType } from "@food-app/api-interfaces";
import { prisma } from "../prisma"

// Get product
export const findAllProducts= ()=>{
    return prisma.product.findMany()
};
export const findAllProductCategories= ()=>{
    return prisma.product_category.findMany()
};
export const findAllProductsByCategory= (category_id?:number)=>{
    return prisma.product.findMany({
        where: {category_id: category_id}
    })
};
export const findProduct= (name?:string, SKU?:string)=>{
    if(name){
        return prisma.product.findMany({
            where:{name: name}
        })
    }else if(SKU){
        return prisma.product.findMany({
            where:{SKU: SKU}
        })
    }
};

// Post product
export const newProduct= async(productInfo: productInfoType)=>{
    await prisma.product.create({
        data:{
            name: productInfo.name,
            description: productInfo.description,
            SKU: productInfo.SKU,
            category_id: productInfo.category_id,
            inventory_id: productInfo.inventory_id,
            price: productInfo.price,
            weight: productInfo.weight,
            units: productInfo.units
        }
    })
};

// Put product
export const updateProduct = async(productInfo: productInfoType, product_id: string)=>{
    await prisma.product.update({
        where: {id: product_id},
        data:{
            name: productInfo.name,
            description: productInfo.description,
            SKU: productInfo.SKU,
            category_id: productInfo.category_id,
            inventory_id: productInfo.inventory_id,
            price: productInfo.price,
            weight: productInfo.weight,
            units: productInfo.units
        }
    })
};

// Delete product
export const deleteProduct = async(product_id: string)=>{
    await prisma.product.delete({
        where: { id: product_id}
    })
};