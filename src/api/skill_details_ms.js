const { DataTypes } = require('sequelize');
const sequelize = require('../../models/ConnectionManager'); // Set up your Sequelize connection
const SkillDetails = require('../../models/skill_details'); // Import the SkillDetails model
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5006;
app.use(cors()) 
app.use(bodyParser.json());  

app.get('/skill_details', async (req, res) => {
  try {
    const skill_details = await SkillDetails.findAll();

    if (skill_details.length) {
      return res.status(200).json({
        code: 200,
        data: {
          'skill_details': skill_details.map(skill_details => skill_details.toJSON()),
        },
      });
    }
    return res.status(404).json({
      code: 404,
      message: 'There are no skill details.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

app.get('/skill_details/:skill_id', async (req, res) => {
  const skill_id = req.params.skill_id;
  try {
    const skill_details = await SkillDetails.findAll({ where: {skill_id} });

    if (skill_details && skill_details.length > 0) {
      return res.status(200).json({
        code: 200,
        data: {
          'skill_details': skill_details.map(skill_details => skill_details.toJSON()),
        },
      });
    }

    return res.status(404).json({
      code: 404,
      message: 'No specific skill details found.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});


app.listen(PORT, async () => {
  try {
    // Sync the model with the database
    await sequelize.sync({ force: false });
    console.log('Model synchronized with the database.');

    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error syncing the model:', error);
  }
}); 