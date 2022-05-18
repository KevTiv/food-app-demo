import { orderInfoType, ORDER_STATUS } from "@food-app/api-interfaces";
import { prisma } from "../prisma"

// Get
export const findAllOrders=()=>{
    return prisma.orders.findMany();
};
export const findAllOrdersByUser=(user_id:string)=>{
    return prisma.orders.findMany({
        where: {user_id: user_id}
    })
};
export const findAllOrdersByStatus=(status: ORDER_STATUS)=>{
    return prisma.orders.findMany({
        where: {status: status}
    })
};
export const findOrderMetadata=(order_id:string)=>{
    return prisma.orders.findUnique({
        where: {id: order_id}
    })
};

// Post 
export const newOrder= async(orderInfo:orderInfoType)=>{
    await prisma.orders.create({
        data:{
            user_id: orderInfo.user_id,
            status: ORDER_STATUS.InProgress,
            products: orderInfo.products,
            amount: orderInfo.amount,
            payment_id: orderInfo.payment_id
        }
    })
}

// Put
export const updateOrder=async(orderInfo:orderInfoType, order_id:string)=>{
    await prisma.orders.update({
        where:{id: order_id},
        data:{
            user_id: orderInfo.user_id,
            status: orderInfo.status,
            products: orderInfo.products,
            amount: orderInfo.amount,
            payment_id: orderInfo.payment_id
        }
    })
};