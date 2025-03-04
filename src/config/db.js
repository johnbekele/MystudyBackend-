// models/index.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import config from '../config/config.json' assert { type: 'json' };
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const db = {};

let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

// Dynamically import all models
const modelFiles = fs.readdirSync(__dirname)
  .filter(file => 
    file.indexOf('.') !== 0 && 
    file !== basename && 
    file.slice(-3) === '.js'
  );

for (const file of modelFiles) {
  const modelPath = path.join(__dirname, file);
  const model = (await import(modelPath)).default(sequelize);
  db[model.name] = model;
}

// Define associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define specific associations
db.User.hasMany(db.Student, { foreignKey: 'parent_id' });
db.Student.belongsTo(db.User, { foreignKey: 'parent_id' });

db.Student.belongsToMany(db.Subject, { through: db.StudentSubject });
db.Subject.belongsToMany(db.Student, { through: db.StudentSubject });

db.Student.hasMany(db.BehaviorRecord);
db.BehaviorRecord.belongsTo(db.Student);

db.Student.hasMany(db.SkillsGift);
db.SkillsGift.belongsTo(db.Student);

db.User.hasMany(db.Notification);
db.Notification.belongsTo(db.User);

db.User.hasMany(db.Flag, { as: 'FlaggedBy', foreignKey: 'flagged_by_user_id' });
db.User.hasMany(db.Flag, { as: 'FlaggedUser', foreignKey: 'target_user_id' });
db.Flag.belongsTo(db.User, { as: 'FlaggedBy', foreignKey: 'flagged_by_user_id' });
db.Flag.belongsTo(db.User, { as: 'FlaggedUser', foreignKey: 'target_user_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;