import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = () => {
  return (
    <Wrapper>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </Wrapper>
  );
};

export default Loader;
