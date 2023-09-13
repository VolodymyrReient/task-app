const yup = require("yup");

const complexityValues = ["easy", "medium", "difficult"];
const statusValues = ["new", "in progress", "done"];

const сreateTaskDtoSchema = yup.object({
  body: yup.object({
    name: yup.string().required("Task name is required"),
    description: yup.string().required("Task description is required"),
    complexity: yup
      .string()
      .required("Task complexity is required")
      .oneOf(complexityValues),
    status: yup
      .string()
      .required("Task status is required")
      .oneOf(statusValues),
  }),
});

const updateTaskDtoSchema = yup.object({
  body: yup.object({
    name: yup.string(),
    description: yup.string(),
    complexity: yup.string().oneOf(complexityValues),
    status: yup.string().oneOf(statusValues),
  }),
});

module.exports = { сreateTaskDtoSchema, updateTaskDtoSchema };
