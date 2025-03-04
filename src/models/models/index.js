// models/index.js
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import models
const User = require('./user')(sequelize);
const Student = require('./student')(sequelize);
const Subject = require('./subject')(sequelize);
const StudentSubject = require('./studentSubject')(sequelize);
const BehaviorRecord = require('./behaviorRecord')(sequelize);
const SkillsGift = require('./skillsGift')(sequelize);
const Notification = require('./notification')(sequelize);
const Flag = require('./flag')(sequelize);

// Define associations
User.hasMany(Student, { foreignKey: 'parent_id' });
Student.belongsTo(User, { foreignKey: 'parent_id' });

Student.belongsToMany(Subject, { through: StudentSubject });
Subject.belongsToMany(Student, { through: StudentSubject });

Student.hasMany(BehaviorRecord);
B