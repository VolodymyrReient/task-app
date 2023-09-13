import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getSingleTask, updateTask } from "../../api/task";
import { Modal, message } from "antd";
import TaskForm from "../TaskForm";
import { FormTypes } from "../../types";
import Loader from "../Loader";

const { error } = message;

type EditModalProps = {
  id: string;
  showEditModal: boolean;
  setShowEditModal: (value: boolean) => void;
};

const EditModal = ({ id, showEditModal, setShowEditModal }: EditModalProps) => {
  const { data, isLoading } = useQuery(["getSingleTask", id], async () => {
    return await getSingleTask(id);
  });
  const queryClient = useQueryClient();

  const initialValues = data?.data.task;

  const closeModal = () => {
    setShowEditModal(false);
  };

  const onSubmit = async (values: FormTypes) => {
    try {
      await updateTask(id, values);
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
      title="Edit task"
      open={showEditModal}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <TaskForm initialValues={initialValues} onSubmit={onSubmit} />
      )}
    </Modal>
  );
};

export default EditModal;
