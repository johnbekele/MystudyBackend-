// models/studentSubject.js
module.exports = (sequelize) => {
  const StudentSubject = sequelize.define('StudentSubject', {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Students',
        key: 'id'
      }
    },
    subject_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Subjects',
        key: 'id'
      }
    },
    performance_score: {
      type: DataTypes.FLOAT
    },
    notes: {
      type: DataTypes.TEXT
    }
  });

  return StudentSubject;
};