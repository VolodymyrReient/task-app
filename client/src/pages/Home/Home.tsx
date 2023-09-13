import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Row, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllTasks } from "../../api/task";
import { TasksProps } from "../../types";
import { EmptyWrapper, Footer, TopWrapper, Wrapper } from "./styled-components";
import Loader from "../../components/Loader/Loader";
import TaskCard from "../../components/TaskCard";
import CreateModal from "../../components/CreateModal";
import PieChats from "../../components/PieChats";

const DEFAULT_LIMIT = 12;

const Home = () => {
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading } = useInfiniteQuery(
    ["tasks", DEFAULT_LIMIT, page],
    async () => {
      return await getAllTasks(DEFAULT_LIMIT, page);
    },
    {
      onSuccess: (data) => {
        const totalCount = data?.pages[0]?.data?.totalCount;
        if (totalCount / DEFAULT_LIMIT > page) {
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

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <Wrapper>
      <TopWrapper>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setShowCreateModal(true)}
        >
          Create Task
        </Button>

        <PieChats />
      </TopWrapper>
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

      <Footer>
        {page > 1 && (
          <Button type="primary" disabled={page === 1} onClick={prevPage}>
            Prev page
          </Button>
        )}

        {hasMoreItems && (
          <Button type="primary" disabled={!hasMoreItems} onClick={nextPage}>
            Next page
          </Button>
        )}
      </Footer>

      <CreateModal
        isModalOpen={showCreateModal}
        setShowCreateModal={setShowCreateModal}
      />
    </Wrapper>
  );
};

export default Home;
