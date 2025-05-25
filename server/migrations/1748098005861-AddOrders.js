const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddOrders1748098005861 {
    name = 'AddOrders1748098005861'

    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_routeName\` ON \`tab\``);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`tabId\` int NOT NULL, \`invoiceId\` varchar(255) NOT NULL, \`amount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_routeName\` ON \`tab\` (\`routeName\`)`);
    }
}
