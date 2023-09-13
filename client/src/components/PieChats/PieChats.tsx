import { useQuery } from "@tanstack/react-query";
import { Row, Col } from "antd";
import PieChat from "../PieChat";
import { getTasksStats } from "../../api/task";
import Loader from "../Loader";
import { StatsProps } from "../../types";

const PieChats = () => {
  const { data, isLoading } = useQuery(["stats"], async () => {
    return await getTasksStats();
  });

  const result = data?.data?.result;

  const getXlCol = (length: number) => {
    switch (length) {
      case 1:
        return 8;
      case 2:
        return 4;
      case 3:
        return 3;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    !!result?.length && (
      <Row gutter={[5, 5]} justify="end">
        {result.map((item: StatsProps) => (
          <Col
            key={item.status}
            xs={8}
            sm={8}
            md={8}
            lg={6}
            xl={getXlCol(result.length)}
          >
            <PieChat {...item} />
          </Col>
        ))}
      </Row>
    )
  );
};

export default PieChats;
