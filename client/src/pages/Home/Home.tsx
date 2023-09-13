import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Row, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllTasks } from "../../api/task";
import { TasksProps } from "../../types";
import { EmptyWrapper, Footer, Wrapper } from "./styled-components";
import Loader from "../../components/Loader/Loader";
import TaskCard from "../../components/TaskCard";
import CreateModal from "../../components/CreateModal";

const DEFAULT_LIMIT = 6;

const Home = () => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading } = useInfiniteQuery(
    ["tasks", limit],
    async () => {
      return await getAllTasks(limit);
    },
    {
      onSuccess: (data) => {
        const totalCount = data?.pages[0]?.data?.totalCount;
        if (totalCount > limit) {
          setHasMoreItems(true);
        } else setHasMoreItems(false);
      },
    }
  );

  const list = data?.pages.reduce((acc, item) => {
    if (item.data) {
      return acc.concat(item.data.data.tasks);
    }

    return acc;
  }, []);

  const loadMore = () => {
    setLimit((prev) => prev + DEFAULT_LIMIT);
  };

  return (
    <Wrapper>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setShowCreateModal(true)}
      >
        Create Task
      </Button>

      <Row gutter={[16, 16]} style={{ marginTop: 30 }} justify="center">
        {isLoading ? (
          <Loader />
        ) : list?.length ? (
          list.map((item: TasksProps) => (
            <TaskCard key={item._id} item={item} />
          ))
        ) : (
          <EmptyWrapper>
            <Empty description="No tasks found" />
          </EmptyWrapper>
        )}
      </Row>

      {hasMoreItems && (
        <Footer>
          <Button type="primary" disabled={!hasMoreItems} onClick={loadMore}>
            Load more
          </Button>
        </Footer>
      )}

      <CreateModal
        isModalOpen={showCreateModal}
        setShowCreateModal={setShowCreateModal}
      />
    </Wrapper>
  );
};

export default Home;
