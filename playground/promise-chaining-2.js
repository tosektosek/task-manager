require('../src/db/mongoose');
const Task = require('../src/models/Task');

// Task.findByIdAndDelete('5e786d1997305feebcf62b8b')
//   .then(task => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(console.log);

deleteTaskAndCountIncompleted = async id => {
  await Task.findByIdAndDelete('5e786d1997305feebcf62b8b');
  return await Task.countDocuments({ completed: false });
};

deleteTaskAndCountIncompleted('5e786d1997305feebcf62b8b')
  .then(console.log)
  .catch(console.log);
