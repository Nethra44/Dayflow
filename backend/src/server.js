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
app.use(cors());
app.use(express.json());

// Inline Swagger Object Specification
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Dayflow HRMS Backend API",
    version: "1.0.0",
    description: "Complete REST API documentation for Dayflow HRMS",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Local Development Server",
    },
  ],
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
                properties: {
                  email: { type: "string", example: "user@dayflow.com" },
                  password: { type: "string", example: "Password123!" },
                  firstName: { type: "string", example: "John" },
                  lastName: { type: "string", example: "Doe" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "User registered successfully" },
        },
      },
    },
    "/auth/signin": {
      post: {
        summary: "Sign in user",
        tags: ["Auth"],
        responses: {
          200: { description: "Successful login" },
        },
      },
    },
  },
};

// Mount Swagger Documentation Route directly
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
