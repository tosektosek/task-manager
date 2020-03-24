const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error('Age must be a positive number');
        if (value > 150) throw new Error('You are not that old');
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lovercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('Provive proper emaill');
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password'))
          throw new Error('this should not be a password word');
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre('remove', async function(next) {
  const user = this;

  await Task.deleteMany({ owner: user._id });

  next();
});

userSchema.statics.findByCredentials = async credentials => {
  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    throw new Error('Wrong email or password');
  }

  const isMatch = await bcrypt.compare(credentials.password, user.password);

  if (!isMatch) {
    throw new Error('Wrong email or password');
  }

  return user;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, 'xddd');

  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
