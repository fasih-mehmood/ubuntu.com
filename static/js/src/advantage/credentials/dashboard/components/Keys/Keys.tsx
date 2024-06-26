import React from "react";
import { useMemo } from "react";
import {
  MainTable,
  // Pagination,
  Spinner,
  Notification,
} from "@canonical/react-components";
import { useQuery } from "react-query";
import { listAllKeys } from "advantage/credentials/api/keys";

interface IProps {
  hidden: boolean;
}

const Keys = (props: IProps) => {
  const { hidden } = props;
  // const [page, setPage] = useState(1);
  const { isLoading, isError, data } = useQuery(
    ["listAllKeys"],
    () => listAllKeys(),
    { keepPreviousData: true }
  );

  const currentRows = useMemo(() => {
    if (data) {
      return data.map((exam: any) => ({
        key: exam.id,
        columns: [
          { content: exam.id },
          { content: exam.user.email },
          { content: exam.score },
          { content: exam.duration_in_minutes },
        ],
      }));
    }
    return [];
  }, [data]);

  // const paginationMeta = useMemo(() => {
  //   if (data) {
  //     return [];
  //     const { meta } = data;
  //     const totalPages = meta.total_pages;
  //     const currentPage = totalPages - meta.current_page + 1;
  //     return {
  //       totalPages,
  //       currentPage,
  //       nextPage: currentPage < totalPages ? currentPage + 1 : null,
  //       previousPage: currentPage > 1 ? currentPage - 1 : null,
  //       totalItems: meta.total_count,
  //     };
  //   }
  //   return {};
  // }, [data, page]);

  // const handleLoadPage = (pageNumber: number) => {
  //   if (isFetching) {
  //     return;
  //   }
  //   setPage(pageNumber);
  // };

  if (hidden) {
    return null;
  }

  if (isLoading) {
    return <Spinner text="Loading..." />;
  }

  if (isError) {
    return (
      <Notification severity="negative" title="Error">
        Something went wrong. Please try again later.
      </Notification>
    );
  }

  if (data) {
    return (
      <>
        <MainTable
          headers={[
            { content: "ID", sortKey: "id" },
            { content: "User", sortKey: "user" },
            { content: "Score", sortKey: "score" },
            { content: "Time Spent", sortKey: "timeSpent" },
          ]}
          paginate={10}
          rows={currentRows}
        />
        {/* {paginationMeta && (
          <Pagination
            currentPage={paginationMeta?.currentPage ?? 1}
            itemsPerPage={10}
            paginate={handleLoadPage}
            totalItems={paginationMeta.totalItems}
            disabled={isFetching}
          />
        )} */}
      </>
    );
  }

  return <></>;
};

export default Keys;
