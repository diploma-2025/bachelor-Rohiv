const {EntitySchema} = require("typeorm");

const TabEntity = new EntitySchema({
    name: "tab",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: {
            type: 'varchar',
            nullable: false,
            unique: true,
        },
        routeName: {
            type: 'varchar',
            nullable: false,
        },
        canEdit: {
            type: "simple-array",
            nullable: false,
        },
        show: {
            type: "simple-array",
            nullable: false,
        },
    }
})

module.exports = TabEntity;
