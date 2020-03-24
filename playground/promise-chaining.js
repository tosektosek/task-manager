require('../src/db/mongoose');
const User = require('../src/models/user');

const updateAgeAndCount = async (id, age) => {
  await User.findByIdAndUpdate(id, {
    age,
  });
  return await User.countDocuments({ age });
};

updateAgeAndCount('5e787159f87e90ef077fc5b2', 77)
  .then(console.log)
  .catch(console.log);
