import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useCheckin() {
  // Placeholder for future check-in/check-out logic
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, { status: 'checked-in', isPaid: true, ...breakfast }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully checked in`);
      // active:true 只会更新当前页面的数据
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to check in booking. Please try again.');
    },
  });
  return { checkin, isCheckingIn };
}
export default useCheckin;
