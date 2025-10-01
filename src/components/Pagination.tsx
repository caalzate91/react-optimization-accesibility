import { useTranslation } from 'react-i18next';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
}: Props) {
  const { t } = useTranslation();

  const getVisiblePages = () => {
    const delta = 2;
    const range: Array<number | string> = [];
    const rangeWithDots: Array<number | string> = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '…');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('…', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label={t('pagination', { defaultValue: 'Pagination' })}
      className="flex justify-center items-center gap-2 mt-8"
    >
      <button
  type="button"
  onClick={() => hasPrev && onPageChange(currentPage - 1)}
  aria-label="Previous page"
  disabled={!hasPrev}
  className={`px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700
    ${!hasPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
  `}
>
  Previous
</button>

      {getVisiblePages().map((page, i) =>
        typeof page === 'string' ? (
          <span key={`dots-${i}`} className="px-3 py-2 text-gray-500">
            {page}
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`px-3 py-2 rounded-md ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
  type="button"
  onClick={() => hasNext && onPageChange(currentPage + 1)}
  aria-label="Next page"
  disabled={!hasNext}
  className={`px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700
    ${!hasNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
  `}
>
  Next
</button>
    </nav>
  );
}