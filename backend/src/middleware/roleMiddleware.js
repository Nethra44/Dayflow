const { supabase } = require("../config/supabase");

const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { data: employee, error } = await supabase
        .from("employees")
        .select("role")
        .eq("auth_id", req.user.id)
        .single();

      if (error || !employee) {
        return res
          .status(403)
          .json({ success: false, message: "User profile or role not found" });
      }

      if (!allowedRoles.includes(employee.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: insufficient permissions",
        });
      }

      req.user.role = employee.role;
      next();
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
};

module.exports = { requireRole };
