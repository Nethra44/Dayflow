const { supabase } = require("../config/supabase");
const jwt = require("jsonwebtoken");

// Register new user
const signup = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  // 1. Sign up user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return res.status(400).json({ success: false, message: authError.message });
  }

  // 2. Insert corresponding record in employees table
  const { data: employeeData, error: employeeError } = await supabase
    .from("employees")
    .insert([
      {
        auth_id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        role: role || "employee",
      },
    ])
    .select();

  if (employeeError) {
    return res
      .status(400)
      .json({ success: false, message: employeeError.message });
  }

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { user: authData.user, employee: employeeData[0] },
  });
};

// Sign in existing user
const signin = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ success: false, message: error.message });
  }

  // Generate JWT token for backend API requests
  const token = jwt.sign(
    { id: data.user.id, email: data.user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: data.user,
  });
};

// Get current user details
const getMe = async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

module.exports = { signup, signin, getMe };
