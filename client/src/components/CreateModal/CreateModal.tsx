import { Modal, message } from "antd";
import TaskForm from "../TaskForm/TaskForm";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { FormTypes } from "../../types";
import { createTask } from "../../api/task";

const { error } = message;

type CreateModalProps = {
  isModalOpen: boolean;
  setShowCreateModal: (value: boolean) => void;
};

const createInitialValues: FormTypes = {
  name: "",
  description: "",
  status: "new",
  complexity: "easy",
};

const CreateModal = ({ isModalOpen, setShowCreateModal }: CreateModalProps) => {
  const queryClient = useQueryClient();

  const closeModal = () => {
    setShowCreateModal(false);
  };

  const onSubmit = async (values: FormTypes) => {
    try {
      await createTask(values);
      queryClient.invalidateQueries();
      closeModal();
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        error(e?.message as string);
        console.error(e?.message);
      }
    }
  };

  return (
    <Modal
      title="Create task"
      open={isModalOpen}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <TaskForm initialValues={createInitialValues} onSubmit={onSubmit} />
    </Modal>
  );
};

export default CreateModal;
