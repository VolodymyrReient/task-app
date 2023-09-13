import styled from "styled-components";
import { Card } from "antd";

export const SingleTaskCard = styled(Card)`
  text-align: center;

  .ant-card-actions {
    padding: 0 20px;
    justify-content: space-between;
  }
`;

export const TagsWrapper = styled("div")`
  margin-block: 5px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 10px;
`;
