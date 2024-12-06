import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./ui/pagination";

export default function Paginate({ currentPage, totalPages, onPageChange }) {
  const handleRoute = (page) => `?page=${page}`;

  const renderPaginationItems = () => {
    const paginationItems = [];

    paginationItems.push(
      <PaginationItem key={`page-1`}>
        <PaginationLink
          isActive={currentPage === 1}
          to={handleRoute(1)}
          onClick={() => onPageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (currentPage > 3) {
      paginationItems.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      paginationItems.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink
            isActive={i === currentPage}
            to={handleRoute(i)}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 2) {
      paginationItems.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      paginationItems.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            isActive={currentPage === totalPages}
            to={handleRoute(totalPages)}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={currentPage > 1 ? handleRoute(currentPage - 1) : "#"}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            to={currentPage < totalPages ? handleRoute(currentPage + 1) : "#"}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
