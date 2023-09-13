import { Button, Modal, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteTask } from "../../api/task";

const { confirm } = Modal;

const DeleteButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async () => {
      await deleteTask(id);
    },
    {
      onSuccess: () => {
        message.success("Task successfully deleted!");
        queryClient.invalidateQueries();
      },
    }
  );

  const onClick = () => {
    return confirm({
      title: "Are you sure you want to delete this task* ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        mutate();
      },
      okText: "Delete",
      cancelButtonProps: {
        shape: "round",
      },
      okButtonProps: {
        loading: isLoading,
        shape: "round",
        style: { backgroundColor: "red" },
      },
    });
  };

  return <Button icon={<DeleteOutlined />} onClick={onClick} />;
};

export default DeleteButton;
