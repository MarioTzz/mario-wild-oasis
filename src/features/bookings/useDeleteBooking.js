import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
function useDeleteBooking() {
  const queryClient = useQueryClient();
  // 使用useMutation来处理删除操作 在React Query中useMutation用于处理创建、更新、删除等操作
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: id => deleteBookingAPI(id),
    onSuccess: () => {
      toast.success('Booking deleted successfully');
      // 直接清空缓存数据，强制重新获取
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: err => {
      toast.error(err.message || 'Booking delete failed');
      throw new Error('Booking delete failed');
    },
  });
  return { deleteBooking, isDeleting };
}
export default useDeleteBooking;
