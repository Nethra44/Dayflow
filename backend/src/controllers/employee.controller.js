const { supabase } = require("../config/supabase");

// HR: Fetch all employees
const getAllEmployees = async (req, res) => {
  try {
    const { data, error } = await supabase.from("employees").select("*");
    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Fetch single employee profile by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .eq("id", id)
      .single();

    if (error)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Update employee details
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from("employees")
      .update(updates)
      .eq("id", id)
      .select();

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res
      .status(200)
      .json({
        success: true,
        message: "Profile updated successfully",
        data: data[0],
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllEmployees, getEmployeeById, updateEmployee };
