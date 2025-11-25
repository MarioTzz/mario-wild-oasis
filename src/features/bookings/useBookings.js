import { getBookings } from '../../services/apiBookings';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { PAGE_SIZE } from '../../utils/constans';
function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status');
  const sortByValue = searchParams.get('sortBy');
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };
  const sortBy = !sortByValue || sortByValue === 'all' ? null : { field: sortByValue.split('-')[0], direction: sortByValue.split('-')[1] };
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // React Query
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //Pre Fetching 用于提前加载下一页的内容，而不用当场加载
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }
  return { bookings, isLoading, error, count };
}

export default useBookings;
