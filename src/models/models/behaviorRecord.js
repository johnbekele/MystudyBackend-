// models/behaviorRecord.js
module.exports = (sequelize) => {
  const BehaviorRecord = sequelize.define('BehaviorRecord', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    severity: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return BehaviorRecord;
};