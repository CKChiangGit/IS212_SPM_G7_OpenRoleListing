const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Set up your Sequelize connection
const StaffDetails = require('./staff_details'); // Import the StaffDetails model
const SkillDetails = require('./skill_details'); // Import the SkillDetails model
const RoleDetails = require('./role_details'); // Import the RoleDetails model
const SkillDetails = require('./skill_details'); // Import the SkillDetails model

function jaccardSimilarity(staff_skills, role_skills) {
    const intersection = staff_skills.filter(skill => role_skills.includes(skill));
    const union = [...new Set([...staff_skills, ...role_skills])];
    const similarity = intersection.length / union.length;
    return similarity;
  }