const {MigrationInterface, QueryRunner} = require("typeorm");

const tabs = [
    {id: 1, name: "Користувачі", routeName: "Users", canEdit: [1, 2], show: [1, 2]},
    {id: 2, name: "Прийоми", routeName: "Appointments", canEdit: [2, 3], show: [2, 3]},
    {id: 3, name: "Пацієнти", routeName: "Patients", canEdit: [2, 3], show: [2, 3]},
    {id: 4, name: "Пацієнт", routeName: "PatientInfo", canEdit: [2, 3], show: []},
];

module.exports = class AddPurchasebleTabs1748090491488 {
    name = 'AddPurchasebleTabs1748090491488'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`tab\`
            (
                \`id\`        int          NOT NULL AUTO_INCREMENT,
                \`name\`      varchar(255) NOT NULL,
                \`routeName\` varchar(255) NOT NULL,
                \`canEdit\`   text         NOT NULL,
                \`show\`      text         NOT NULL,
                UNIQUE INDEX \`IDX_b0324e7e9187c8f50a28be36f4\` (\`name\`),
                UNIQUE INDEX \`IDX_routeName\` (\`routeName\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        await queryRunner.query(`ALTER TABLE \`user\`
            ADD \`tabs\` text NOT NULL`);

        for (const tab of tabs) {
            await queryRunner.query(
                `INSERT INTO \`tab\`(\`id\`, \`name\`, \`routeName\`, \`canEdit\`, \`show\`)
                 VALUES (?, ?, ?, ?, ?)`,
                [
                    tab.id,
                    tab.name,
                    tab.routeName,
                    tab.canEdit.join(','),
                    tab.show.join(',')
                ]
            );
        }
    }

    async down(queryRunner) {
        for (const tab of tabs) {
            await queryRunner.query(`DELETE
                                     FROM \`tab\`
                                     WHERE \`id\` = ?`, [tab.id]);
        }

        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`tabs\``);

        await queryRunner.query(`DROP INDEX \`IDX_b0324e7e9187c8f50a28be36f4\` ON \`tab\``);
        await queryRunner.query(`DROP INDEX \`IDX_routeName\` ON \`tab\``);
        await queryRunner.query(`DROP TABLE \`tab\``);
    }
}
