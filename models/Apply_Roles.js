const { DataTypes } = require('sequelize');

// Matching algorithm test

function jaccardSimilarity(userSkills, roleSkills) {
    const intersection = userSkills.filter(skill => roleSkills.includes(skill));
    const union = [...new Set([...userSkills, ...roleSkills])];
    const similarity = intersection.length / union.length;
    return similarity;
  }