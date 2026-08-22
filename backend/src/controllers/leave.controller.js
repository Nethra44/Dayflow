const { supabase } = require("../config/supabase");

// Helper function to get employee UUID
const getEmployeeId = async (authId) => {
  const { data, error } = await supabase
    .from("employees")
    .select("id")
    .eq("auth_id", authId)
    .single();
  if (error || !data) return null;
  return data.id;
};

// Apply for leave
const applyLeave = async (req, res) => {
  try {
    const employeeId = await getEmployeeId(req.user.id);
    if (!employeeId) {
      return res
        .status(404)
        .json({ success: false, message: "Employee profile not found" });
    }

    const { leaveType, startDate, endDate, reason } = req.body;

    const { data, error } = await supabase
      .from("leaves")
      .insert([
        {
          employee_id: employeeId,
          leave_type: leaveType,
          start_date: startDate,
          end_date: endDate,
          reason,
          status: "pending",
        },
      ])
      .select();

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res
      .status(201)
      .json({
        success: true,
        message: "Leave request submitted",
        data: data[0],
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get employee's own leave requests
const getMyLeaves = async (req, res) => {
  try {
    const employeeId = await getEmployeeId(req.user.id);
    const { data, error } = await supabase
      .from("leaves")
      .select("*")
      .eq("employee_id", employeeId)
      .order("created_at", { ascending: false });

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// HR: Fetch all leave requests
const getAllLeaves = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("leaves")
      .select("*, employees(first_name, last_name, email)")
      .order("created_at", { ascending: false });

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// HR: Approve or reject leave
const reviewLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'
    const reviewerId = await getEmployeeId(req.user.id);

    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Status must be 'approved' or 'rejected'",
        });
    }

    const { data, error } = await supabase
      .from("leaves")
      .update({ status, reviewed_by: reviewerId })
      .eq("id", id)
      .select();

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res
      .status(200)
      .json({ success: true, message: `Leave ${status}`, data: data[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { applyLeave, getMyLeaves, getAllLeaves, reviewLeave };
