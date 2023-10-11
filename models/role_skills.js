const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Set up your Sequelize connection
const RoleDetails = require('./role_details'); // Import the RoleDetails model
const SkillDetails = require('./skill_details'); // Import the SkillDetails model

const RoleSkills = sequelize.define('RoleSkills', {
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  skill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'ROLE_SKILLS',
  timestamps: false,
});

RoleSkills.belongsTo(RoleDetails, { foreignKey: 'role_id', as: 'role' });
RoleSkills.belongsTo(SkillDetails, { foreignKey: 'skill_id', as: 'skill' });

module.exports = RoleSkills;

// // --Microservice Portion--
// const express = require('express');
// const mysql2 = require('mysql2');

// const app = express();
// const port = 5005;

// app.get('/role_skills', async (req, res) => {
//   try {
//     const role_skills = await RoleSkills.findAll();

//     if (role_skills.length) {
//       return res.status(200).json({
//         code: 200,
//         data: {
//           'role_skills': role_skills.map(role_skills => role_skills.toJSON()),
//         },
//       });
//     }

//     return res.status(404).json({
//       code: 404,
//       message: 'There are no available staff roles.',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       code: 500,
//       message: 'Internal Server Error',
//     });
//   }
// });