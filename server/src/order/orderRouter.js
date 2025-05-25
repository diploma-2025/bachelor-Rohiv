const {getUserValidator} = require("../user/userValidators");
const {createOrderValidator} = require("./orderValidator");
const orderRouter = require('express').Router();
const {mono} = require("../../vars/config");
const {createOrder} = require("./orderFunctions");

orderRouter.post('/', getUserValidator, createOrderValidator, async (req, res) => {
    const {amount, redirectUrl} = req.body;
    try {
        const response = await fetch(
            `${mono.monoUrl}/invoice/create`,
            {
                method: "POST",
                headers: {
                    'X-TOKEN': mono.monoXsign
                },
                body: JSON.stringify({
                    amount: amount,
                    redirectUrl: redirectUrl,
                    webHookUrl: `${mono.monoWebhook}/tabs/mono-status`,
                })
            }
        )
        const data = await response.json()
        if (!response.ok) return res.status(response.status).json(response.statusText)
        await createOrder(req.body, req.userId, data.invoiceId)
        return res.status(201).json({pageUrl: data.pageUrl})
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

module.exports = orderRouter;
