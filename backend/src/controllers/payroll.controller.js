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

// Employee: View own payroll details
const getMyPayroll = async (req, res) => {
  try {
    const employeeId = await getEmployeeId(req.user.id);
    const { data, error } = await supabase
      .from("payroll")
      .select("*")
      .eq("employee_id", employeeId)
      .single();

    if (error)
      return res
        .status(404)
        .json({ success: false, message: "Payroll record not found" });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// HR: Fetch all payroll records
const getAllPayroll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("payroll")
      .select("*, employees(first_name, last_name, email, department)");

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// HR: Create or update employee payroll
const updatePayroll = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { baseSalary, allowances, deductions } = req.body;

    const { data, error } = await supabase
      .from("payroll")
      .upsert(
        {
          employee_id: employeeId,
          base_salary: baseSalary,
          allowances,
          deductions,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "employee_id" },
      )
      .select();

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    return res
      .status(200)
      .json({
        success: true,
        message: "Payroll updated successfully",
        data: data[0],
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getMyPayroll, getAllPayroll, updatePayroll };
