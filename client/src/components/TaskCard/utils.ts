import { StatusType, ComplexityType } from "../../types";

export const getStatusTagColor = (status: StatusType) => {
  switch (status) {
    case "done":
      return "#87d068";
    case "in progress":
      return "processing";
    default:
      return "cyan";
  }
};

export const getComplexityTagColor = (complexity: ComplexityType) => {
  switch (complexity) {
    case "difficult":
      return "volcano";
    case "medium":
      return "orange";
    default:
      return "green";
  }
};
