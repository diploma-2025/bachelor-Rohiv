const UserEntity = require('../src/user/userEntity');
const RoleEntity = require('../src/role/roleEntity');
const AppointmentEntity = require('../src/appointment/appointmentEntity')
const PatientEntity = require("../src/patient/patientEntity");
const TemplateEntity = require("../src/template/templateEntity");
const TabEntity = require("../src/tab/tabEntity");
const OrderEntity = require("../src/order/orderEntity");

const Entities = [
    UserEntity,
    RoleEntity,
    AppointmentEntity,
    PatientEntity,
    TemplateEntity,
    TabEntity,
    OrderEntity
]

module.exports = Entities
