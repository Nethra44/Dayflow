import axiosClient from "./axiosClient";

// --- AUTHENTICATION ENDPOINTS ---
// Blueprint: POST /api/auth/signin & GET /api/auth/me
export const loginUser = async (credentials) => {
  const response = await axiosClient.post("/auth/signin", credentials);
  return response.data; // Expected format: { token, user }
};

export const fetchCurrentUser = async () => {
  const response = await axiosClient.get("/auth/me");
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosClient.post("/auth/signout");
  return response.data;
};

// --- EMPLOYEE & PROFILE ENDPOINTS ---
// Blueprint: GET/PATCH /api/employees & GET /api/employees/:id
export const fetchEmployees = async () => {
  const response = await axiosClient.get("/employees");
  return response.data;
};

export const fetchEmployeeById = async (id) => {
  const response = await axiosClient.get(`/employees/${id}`);
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await axiosClient.post("/employees", employeeData);
  return response.data;
};

export const updateEmployeeProfile = async (id, profileData) => {
  const response = await axiosClient.patch(`/employees/${id}`, profileData);
  return response.data;
};

export const deleteEmployeeById = async (id) => {
  const response = await axiosClient.delete(`/employees/${id}`);
  return response.data;
};

// --- ATTENDANCE ENDPOINTS ---
// Blueprint: POST check-in/out, GET /me & GET /all
export const checkIn = async () => {
  const response = await axiosClient.post("/attendance/check-in");
  return response.data;
};

export const checkOut = async () => {
  const response = await axiosClient.post("/attendance/check-out");
  return response.data;
};

export const fetchMyAttendance = async () => {
  const response = await axiosClient.get("/attendance/me");
  return response.data;
};

export const fetchAllAttendance = async () => {
  const response = await axiosClient.get("/attendance/all");
  return response.data;
};

// --- LEAVE ENDPOINTS ---
// Blueprint: POST /leaves, GET /me, GET /leaves, PATCH /leaves/:id/review
export const fetchMyLeaves = async () => {
  const response = await axiosClient.get("/leaves/me");
  return response.data;
};

export const fetchLeaveRequests = async () => {
  const response = await axiosClient.get("/leaves");
  return response.data;
};

export const createLeaveRequest = async (leaveData) => {
  const response = await axiosClient.post("/leaves", leaveData);
  return response.data;
};

export const reviewLeaveRequest = async (id, reviewData) => {
  // reviewData shape: { status: 'Approved' | 'Rejected', review_comment: '...' }
  const response = await axiosClient.patch(`/leaves/${id}/review`, reviewData);
  return response.data;
};

// --- PAYROLL ENDPOINTS ---
// Blueprint: GET /payroll/me, GET /payroll, PATCH /payroll/:employeeId
export const fetchMyPayroll = async () => {
  const response = await axiosClient.get("/payroll/me");
  return response.data;
};

export const fetchAllPayroll = async () => {
  const response = await axiosClient.get("/payroll");
  return response.data;
};

export const updateSalaryStructure = async (employeeId, salaryData) => {
  const response = await axiosClient.patch(`/payroll/${employeeId}`, salaryData);
  return response.data;
};

// --- NOTIFICATIONS & REPORTS ---
// Blueprint: GET /reports/attendance, GET /reports/payroll, GET /notifications
export const fetchNotifications = async () => {
  const response = await axiosClient.get("/notifications");
  return response.data;
};

export const markNotificationRead = async (id) => {
  const response = await axiosClient.patch(`/notifications/${id}/read`);
  return response.data;
};

export const fetchAttendanceReport = async () => {
  const response = await axiosClient.get("/reports/attendance");
  return response.data;
};

export const fetchPayrollReport = async () => {
  const response = await axiosClient.get("/reports/payroll");
  return response.data;
};