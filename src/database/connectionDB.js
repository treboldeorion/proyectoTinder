//import { Exception } from "sass";
import { Sequelize } from "sequelize";
import userModel from '../models/User.js';
import companyModel from '../models/Company.js';
import skillModel from '../models/Skill.js';
import serviceModel from '../models/Service.js';


/*const sequelize = new Sequelize(
    process.env.POSTGRES_URL
)
    export {
        sequelize
    }
*/
const sequelize = new Sequelize({
    dialect: 'postgres', // Tipo de base de datos que estás utilizando (puede ser mysql, postgres, sqlite, etc.)
    host: 'localhost', // Dirección del servidor de la base de datos
    username: 'postgres', // Nombre de usuario para la base de datos
    password: '0000', // Contraseña para la base de datos
    database: 'project_tinder' // Nombre de la base de datos

});

userModel(sequelize);
companyModel(sequelize);
skillModel(sequelize);
serviceModel(sequelize);

const { User, Company, Skill, Service } = sequelize.models

User.belongsToMany(Skill, {through:'users_skills'});
Skill.belongsToMany(User, {through:'users_skills'});

Company.hasMany(Service,{
    foreignKey:'company_id',
    sourceKey:'id'
})

Company.belongsTo(Company,{
    foreignKey:'company_id',
    sourceKey:'id'
})

Company.hasMany(Service,{
    foreignKey:'user_id',
    sourceKey:'id'
})

Company.belongsTo(User,{
    foreignKey:'user_id',
    sourceKey:'id'
})



export {
    sequelize,
    User,
    Company,
    Service,
    Skill
}

