export type TasksProps = {
  _id: string;
  name: string;
  description: string;
  totalCount: number;
  status: StatusType;
  complexity: ComplexityType;
};

export type StatusType = "new" | "in progress" | "done";

export type ComplexityType = "easy" | "medium" | "difficult";

export type FormTypes = {
  name: string;
  description: string;
  status: StatusType;
  complexity: ComplexityType;
};

export type ErrorType = {
  message: string;
};
