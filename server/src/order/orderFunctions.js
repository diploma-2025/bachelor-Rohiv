const AppDataSource = require("../../ormconfig");
const OrderEntity = require("./orderEntity");

const orderRepository = AppDataSource.getRepository(OrderEntity)

const findOrderById = async (invoiceId) => {
    return orderRepository.findOneBy({invoiceId: invoiceId})
}

const createOrder = async (data, userId, invoiceId) => {
    const order = orderRepository.create({
        userId: userId,
        tabId: data.tabId,
        amount: data.amount,
        invoiceId: invoiceId,
    })
    return await orderRepository.save(order)
}

const deleteOrderById = async (orderId) => {
    await orderRepository.delete({id: orderId})
}

module.exports = {
    findOrderById,
    createOrder,
    deleteOrderById,
}
