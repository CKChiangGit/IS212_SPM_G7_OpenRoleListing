const Role_Skill = require('./models/role_skill'); // Import the Role model

async function readRow() {
  try {
    // Read all records from the "roles" table
    const allRole_Skill = await Role_Skill.findAll();
    console.log('All Role_skill:', allRole_Skill);
  } catch (error) {
    console.error('Error reading role_skill:', error);
  }
}

readRow(); // Call the function to read roles