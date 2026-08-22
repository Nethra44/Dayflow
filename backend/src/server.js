const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/auth.routes");
const employeeRoutes = require("./routes/employee.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const leaveRoutes = require("./routes/leave.routes");
const payrollRoutes = require("./routes/payroll.routes");

const app = express();

// Global Middleware
// Configured CORS Options
const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // React dev server URLs
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies or authorization headers across origins
};

app.use(cors(corsOptions));
app.use(express.json());

// Comprehensive Swagger Specification
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Dayflow HRMS Backend API",
    version: "1.0.0",
    description: "Interactive REST API portal for Dayflow HRMS platform",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Local Development Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/auth/signup": {
      post: {
        summary: "Register a new user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password", "firstName", "lastName"],
                properties: {
                  email: { type: "string", example: "employee@dayflow.com" },
                  password: { type: "string", example: "Password123!" },
                  firstName: { type: "string", example: "John" },
                  lastName: { type: "string", example: "Doe" },
                  role: { type: "string", example: "employee" },
                  department: { type: "string", example: "Engineering" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "User registered successfully" } },
      },
    },
    "/auth/signin": {
      post: {
        summary: "Sign in user & get token",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "employee@dayflow.com" },
                  password: { type: "string", example: "Password123!" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Sign-in successful" } },
      },
    },
    "/auth/me": {
      get: {
        summary: "Get current logged-in user profile",
        tags: ["Auth"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Current user details" } },
      },
    },
    "/attendance/check-in": {
      post: {
        summary: "Record check-in time",
        tags: ["Attendance"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Checked in successfully" } },
      },
    },
    "/attendance/check-out": {
      post: {
        summary: "Record check-out time",
        tags: ["Attendance"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Checked out successfully" } },
      },
    },
    "/attendance/me": {
      get: {
        summary: "Get my attendance logs",
        tags: ["Attendance"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Attendance records list" } },
      },
    },
    "/leaves": {
      post: {
        summary: "Submit a leave request",
        tags: ["Leaves"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["leaveType", "startDate", "endDate", "reason"],
                properties: {
                  leaveType: { type: "string", example: "annual" },
                  startDate: { type: "string", example: "2026-09-01" },
                  endDate: { type: "string", example: "2026-09-05" },
                  reason: { type: "string", example: "Vacation" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Leave request created" } },
      },
      get: {
        summary: "Get all leave requests (HR/Admin)",
        tags: ["Leaves"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "List of all employee leave requests" },
        },
      },
    },
    "/leaves/me": {
      get: {
        summary: "Get my submitted leave requests",
        tags: ["Leaves"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of personal leave requests" } },
      },
    },
    "/payroll/me": {
      get: {
        summary: "Get my payroll details",
        tags: ["Payroll"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Personal salary details" } },
      },
    },
  },
};

// Mount Swagger Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount API Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payroll", payrollRoutes);

// Base Route
app.get("/", (req, res) => {
  res.json({ message: "Dayflow HRMS Backend API is running..." });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI live at http://localhost:${PORT}/api-docs`);
});
