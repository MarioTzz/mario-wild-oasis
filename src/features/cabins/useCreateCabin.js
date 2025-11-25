import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createAndEditCabin } from '../../services/apiCabins';
function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createAndEditCabin,
    onSuccess: () => {
      toast.success('newCabin created!');
      // 还要清空缓存数据，当发生变化时，强制重新获取
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => {
      toast.error(err.message || 'Cabin create failed');
      throw new Error('Cabin create failed');
    },
  });
  return { createCabin, isCreating };
}

export default useCreateCabin;
