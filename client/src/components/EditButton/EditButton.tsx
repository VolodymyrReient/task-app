import { useState } from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditModal from "../EditModal";

const EditButton = ({ id }: { id: string }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Button icon={<EditOutlined />} onClick={() => setShowEditModal(true)} />
      {showEditModal && (
        <EditModal
          id={id}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
        />
      )}
    </>
  );
};

export default EditButton;
