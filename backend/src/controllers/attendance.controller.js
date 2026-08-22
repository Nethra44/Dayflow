const { supabase } = require("../config/supabase");

// Helper function to get employee UUID from auth_id
const getEmployeeId = async (authId) => {
  const { data, error } = await supabase
    .from("employees")
    .select("id")
    .eq("auth_id", authId)
    .single();
  if (error || !data) return null;
  return data.id;
};

// Check-in endpoint
const checkIn = async (req, res) => {
  try {
    const employeeId = await getEmployeeId(req.user.id);
    if (!employeeId) {
      return res
        .status(404)
        .json({ success: false, message: "Employee profile not found" });
    }

    const { data, error } = await supabase
      .from("attendance")
      .insert([
        {
          employee_id: employeeId,
          check_in: new Date().toISOString(),
          date: new Date().toISOString().split("T")[0],
        },
      ])
      .select();

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res
      .status(201)
      .json({
        success: true,
        message: "Checked in successfully",
        data: data[0],
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Check-out endpoint
const checkOut = async (req, res) => {
  try {
    const employeeId = await getEmployeeId(req.user.id);
    if (!employeeId) {
      return res
        .status(404)
        .json({ success: false, message: "Employee profile not found" });
    }

    const today = new Date().toISOString().split("T")[0];

    // Find today's check-in record
    const { data: record, error: findError } = await supabase
      .from("attendance")
      .select("id")
      .eq("employee_id", employeeId)
      .eq("date", today)
      .is("check_out", null)
      .single();

    if (findError || !record) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No active check-in session found for today",
        });
    }

    const { data, error } = await supabase
      .from("attendance")
      .update({ check_out: new Date().toISOString() })
      .eq("id", record.id)
      .select();

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res
      .status(200)
      .json({
        success: true,
        message: "Checked out successfully",
        data: data[0],
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get logged-in employee's attendance history
const getMyAttendance = async (req, res) => {
  try {
    const employeeId = await getEmployeeId(req.user.id);
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("employee_id", employeeId)
      .order("date", { ascending: false });

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// HR: Fetch all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("attendance")
      .select("*, employees(first_name, last_name, email)")
      .order("date", { ascending: false });

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { checkIn, checkOut, getMyAttendance, getAllAttendance };
