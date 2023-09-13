import { Col, Tag } from "antd";
import { TasksProps } from "../../types";
import EditButton from "../EditButton";
import { getStatusTagColor, getComplexityTagColor } from "./utils";
import { SingleTaskCard, TagsWrapper } from "./styled-components";
import DeleteButton from "../DeleteButton";

const TaskCard = ({ item }: { item: TasksProps }) => {
  const statusColor = getStatusTagColor(item.status);
  const complexityColor = getComplexityTagColor(item.complexity);

  return (
    <Col span={8} xs={24} sm={12} md={8} lg={8}>
      <SingleTaskCard
        hoverable
        title={item.name}
        actions={[<EditButton id={item._id} />, <DeleteButton id={item._id} />]}
      >
        <TagsWrapper>
          <Tag color={statusColor}>{item.status.toUpperCase()}</Tag>
          <Tag color={complexityColor}>{item.complexity.toUpperCase()}</Tag>
        </TagsWrapper>
        {item.description}
      </SingleTaskCard>
    </Col>
  );
};

export default TaskCard;
