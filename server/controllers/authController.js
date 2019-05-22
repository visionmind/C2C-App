const jwt = require('jwt-simple');
const config = require('../config');

const User = require('../models/user');

exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      const error = new Error('Wrong');
      error.statusCode = 401;
      throw error;
    }

    const validPassword = await user.validPassword(password);

    if (!validPassword) {
      const error = new Error('Wrong');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.encode({
      id: user.id,
    }, config.jwtSecret);
    res.send({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    // This line is invaild
    // validationHandler(req);

    const existedUser = await User.findOne({
      email: req.body.email,
    });
    if (existedUser) {
      const error = new Error('Email already used');
      error.statusCode = 403;
      throw error;
    }

    let user = new User();
    user.email = req.body.email;
    user.password = await User.encryptPassword(req.body.password);
    user.name = req.body.name;
    user = await user.save();

    const token = jwt.encode({ id: user.id }).config.jwtSecret;
    res.send({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    res.send(user);
  } catch (error) {
    next(error);
  }
};
