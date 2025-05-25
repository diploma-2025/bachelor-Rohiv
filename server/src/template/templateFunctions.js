const AppDataSource = require("../../ormconfig");
const TemplateEntity = require("./templateEntity");
const CustomError = require("../../vars/error");

const templateRepository = AppDataSource.getRepository(TemplateEntity)

const DEFAULT_TEMPLATE_COLUMNS = [
    {label: "П.І.Б. пацієнта", field: "username"},
    {label: "Дата народження", field: "birthDate"},
    {label: "Дата огляду", field: "reviewDate"},
    {label: "Скарги", field: "complaints"},
    {label: "Анамнез хвороби", field: "medHistory"},
    {label: "Анамнез життя", field: "lifeHistory"},
    {label: "Об’єктивні дані", field: "objData"},
    {label: "План обстеження", field: "examPlan"},
    {label: "Діагноз", field: "diagnosis"},
    {label: "Лікування", field: "treatment"}
];

const createUserTemplate = async (data, userId) => {
    const template = templateRepository.create({
        templateName: data.templateName,
        templateStreet: data.templateStreet,
        templatePhone: data.templatePhone,
        templateColumns: JSON.stringify(DEFAULT_TEMPLATE_COLUMNS),
        user: {id: userId},
    })
    return templateRepository.save(template)
}

const getUserTemplates = async (userId) => {
    const templates = await templateRepository.findBy({user: {id: userId}})
    templates.forEach(template => {
        template.templateColumns = JSON.parse(template.templateColumns)
    })
    if (!templates) throw new CustomError("Шаблони не знайдено", 404);

    return templates
}

module.exports = {
    createUserTemplate,
    getUserTemplates,
}
