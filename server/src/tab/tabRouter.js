const monobankValidator = require("../../vars/monobank");
const {findOrderById, deleteOrderById} = require("../order/orderFunctions");
const {buyTab} = require("../user/userFunctions");
const tabRouter = require('express').Router();


tabRouter.post('/mono-status', monobankValidator, async (req, res) => {
    const {invoiceId, status} = req.body
    try {
        if (status !== 'success') return res.status(400).json({error: 'Не Оплачено'})

        const order = await findOrderById(invoiceId)
        if (!order) return res.status(400).json({error: 'Не Оплачено'})

        await buyTab(order)
        await deleteOrderById(order.id)

        return res.status(200).json({message: "Успішно оплачено"})
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
});

module.exports = tabRouter;
