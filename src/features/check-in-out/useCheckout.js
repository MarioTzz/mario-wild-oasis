import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useCheckout() {
  // Placeholder for future check-in/check-out logic
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: bookingId => updateBooking(bookingId, { status: 'checked-out' }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully checked out`);
      // active:true 只会更新当前页面的数据
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to check out booking. Please try again.');
    },
  });
  return { checkout, isCheckingOut };
}
export default useCheckout;
