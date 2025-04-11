import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  //validate
  if (!name) {
    next("Please provide name");
  }
  if (!email) {
    next("Please provide email");
  }
  if (!password) {
    next("Please provide password");
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email Already Register Please Login");
  }

  const user = await userModel.create({ name, email, password });
  //token
  const token = user.createJWT();
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please provide all fields");
  }
  //find user by email
  const user = await userModel.findOne({ email });
  if (!user) {
    next("Invalid username or password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid username or password");
  }

  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "login Successfully",
    user,
    token,
  });
};
