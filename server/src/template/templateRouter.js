const {getUserValidator} = require("../user/userValidators");
const {createUserTemplate, getUserTemplates} = require("./templateFunctions");
const {createTemplateValidator} = require("./templateValidators");
const templateRouter = require('express').Router();

templateRouter.get("/", getUserValidator, async (req, res) => {
    try {
        const templates = await getUserTemplates(req.userId)
        if (!templates.length) return res.json({error: "Шаблони ще не створені"})

        return res.status(200).json(templates);
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

templateRouter.post("/", getUserValidator, createTemplateValidator, async (req, res) => {
    try {
        const template = await createUserTemplate(req.body, req.userId)
        if (!template) return res.status(400).json({error: 'Шаблон не створено'})

        return res.status(201).json({message: "Шаблон успішно створено", template})
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

module.exports = templateRouter;
