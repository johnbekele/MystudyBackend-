// models/skillsGift.js
module.exports = (sequelize) => {
  const SkillsGift = sequelize.define('SkillsGift', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Students',
        key: 'id'
      }
    },
    skill_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    level: {
      type: DataTypes.STRING
    }
  });

  return SkillsGift;
};