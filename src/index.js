const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server up on port: ${port}`);
});

const jwt = require('jsonwebtoken');

const my = async () => {
  const token = jwt.sign({ _id: 'abc' }, 'thisiskamilsapplicationxddd', {expiresIn: '7 days'});
  console.log(token);

  const a = jwt.verify(token, 'thisiskamilsapplicationxddd');
  console.log(a)
};
my();
