import { payementInfoType } from "@food-app/api-interfaces";
import { prisma } from "../../prisma"
// Get
export const findAllPayements = ()=>{
    return prisma.payment.findMany();
};
export const findAllPayementsByCustomer =(customerId:string)=>{
    return prisma.payment.findMany({
        where:{ customer_id: customerId}
    })
};

// Post
export const newPayement= async(payementInfo: payementInfoType)=>{
    await prisma.payment.create({
        data:{
            order_id: payementInfo.order_id,
            customer_id: payementInfo.customer_id,
            amount:payementInfo.amount,
            provider: payementInfo.provider,
            payement_type: payementInfo.payement_type,
            status: payementInfo.status??'In Progress'
        }
    })
};

// Put
export const updatePayement= async(payementInfo: payementInfoType, payementId: string)=>{
    await prisma.payment.update({
      where:{ id: payementId},
      data:{
        order_id: payementInfo.order_id,
        customer_id: payementInfo.customer_id,
        amount:payementInfo.amount,
        provider: payementInfo.provider,
        payement_type: payementInfo.payement_type,
        status: payementInfo.status
      }
    })
};
