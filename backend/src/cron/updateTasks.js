const cron = require('node-cron');
const Task = require('../models/task'); // Adjust the path based on your project structure

// Schedule to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    await Task.updateMany(
      { deadline: { $lt: now }, status: { $ne: 'completed' } },
      { $set: { status: 'missing' } }
    );
    console.log('Tasks updated to missing where deadlines have passed.');
  } catch (error) {
    console.error('Error updating tasks:', error);
  }
});
