import { Formik } from "formik";
import { Form, Input, SubmitButton, Select } from "formik-antd";
import { Row, Col } from "antd";
import { FormTypes } from "../../types";
import { complexityOptions, statusOptions } from "./config";
import { validationSchema } from "./validationSchema";

type TaskFormProps = {
  initialValues: FormTypes;
  onSubmit: (values: FormTypes) => void;
};

const TaskForm = ({ initialValues, onSubmit }: TaskFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form layout="vertical">
        <Form.Item name="name" label="Name">
          <Input name="name" placeholder="Name" suffix={<span />} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea
            autoSize
            name="description"
            placeholder="Description"
          />
        </Form.Item>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item name="status" label="Status">
              <Select options={statusOptions} name="status" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="complexity" label="Complexity">
              <Select options={complexityOptions} name="complexity" />
            </Form.Item>
          </Col>
        </Row>

        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Formik>
  );
};

export default TaskForm;
