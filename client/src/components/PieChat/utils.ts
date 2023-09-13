import { StatusType } from "../../types";

export const getChartColor = (status: StatusType) => {
  switch (status) {
    case "done":
      return "rgb(135, 208, 104)";
    case "in progress":
      return "#1677ff";
    case "new":
      return "#87e8de";

    default:
      return "6f6fff";
  }
};
