const INITIAL_EMPLOYEES = [
  { id: 1, name: "Siva Kumar", role: "Frontend Developer", department: "Engineering" },
  { id: 2, name: "Priya Raj", role: "Product Manager", department: "Product" },
  { id: 3, name: "Arun Kumar", role: "UI/UX Designer", department: "Design" },
];

export const fetchEmployees = async () => {
  const stored = localStorage.getItem("dayflow_employees");
  if (!stored) {
    localStorage.setItem("dayflow_employees", JSON.stringify(INITIAL_EMPLOYEES));
    return INITIAL_EMPLOYEES;
  }
  return JSON.parse(stored);
};

export const createEmployee = async (employee) => {
  const current = await fetchEmployees();
  const updated = [...current, { ...employee, id: Date.now() }];
  localStorage.setItem("dayflow_employees", JSON.stringify(updated));
  return updated;
};

export const deleteEmployeeById = async (id) => {
  const current = await fetchEmployees();
  const updated = current.filter((emp) => emp.id !== id);
  localStorage.setItem("dayflow_employees", JSON.stringify(updated));
  return updated;
};