const AppDataSource = require("../../ormconfig")
const RoleEntity = require("./roleEntity")
const TabEntity = require("../tab/tabEntity");

const roleRepository = AppDataSource.getRepository(RoleEntity)
const tabsRepository = AppDataSource.getRepository(TabEntity)

const getRoleId = async (name) => {
    return await roleRepository.findOneBy({name})
}

const getRoleName = async (roleId) => {
    const role = await roleRepository.findOneBy({id: roleId})
    return role?.name || 'N/A'
}

const getTabsByRoleId = async (roleId, purchasedTabs) => {
    const tabs = await tabsRepository.find();
    const roleIdNumber = Number(roleId);
    const purchasedTabIdsSet = new Set(purchasedTabs.map(Number));

    return tabs.map(tab => {
        const showNumbers = tab.show.map(Number);
        const canEditNumbers = tab.canEdit.map(Number);

        return {
            id: tab.id,
            routeName: tab.routeName,
            name: tab.name,
            canEdit: canEditNumbers.includes(roleIdNumber),
            isShown: showNumbers.includes(roleIdNumber),
            isBought: purchasedTabIdsSet.has(tab.id)
        };
    });
};

const getRoles = async (roleId) => {
    let roles
    switch (roleId) {
        case 1:
            roles = await roleRepository.find()
            break
        case 2:
            roles = await roleRepository.findBy({id: 3})
            break
        default:
            throw new CustomError("Відмовлено в доступі", 403)
    }
    return roles || []
}

module.exports = {
    getRoleId,
    getRoleName,
    getTabsByRoleId,
    getRoles
}
