const {EntitySchema} = require("typeorm");

const OrderEntity = new EntitySchema({
    name: 'order',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        userId: {
            type: 'int',
            nullable: false
        },
        tabId: {
            type: 'int',
            nullable: false
        },
        invoiceId: {
            type: 'varchar',
            nullable: false
        },
        amount: {
            type: 'int',
            nullable: false
        },
    }
})

module.exports = OrderEntity;
