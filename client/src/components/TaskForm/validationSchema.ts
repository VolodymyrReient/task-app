import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  complexity: Yup.string().required("Complexity is required"),
});
