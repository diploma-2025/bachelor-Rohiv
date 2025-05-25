const {EntitySchema} = require("typeorm")

const TemplateEntity = new EntitySchema({
    name: "template",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        templateName: {
            type: "varchar",
            nullable: false,
        },
        templateStreet: {
            type: "varchar",
            nullable: false,
        },
        templatePhone: {
            type: "simple-array",
            nullable: false,
        },
        templateColumns: {
            type: "simple-array",
            nullable: false,
        }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: "user",
            joinColumn: {
                name: 'userId',
                referencedColumnName: 'id'
            },
            nullable: false
        }
    }
})

module.exports = TemplateEntity
