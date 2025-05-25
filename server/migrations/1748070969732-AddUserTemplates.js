const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddUserTemplates1748070969732 {
    name = 'AddUserTemplates1748070969732'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`template\` (\`id\` int NOT NULL AUTO_INCREMENT, \`templateName\` varchar(255) NOT NULL, \`templateStreet\` varchar(255) NOT NULL, \`templatePhone\` text NOT NULL, \`templateColumns\` text NOT NULL , \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`template\` ADD CONSTRAINT \`FK_5e718539594d02a4c75ddc1ca56\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`template\` DROP FOREIGN KEY \`FK_5e718539594d02a4c75ddc1ca56\``);
        await queryRunner.query(`DROP TABLE \`template\``);
    }
}
