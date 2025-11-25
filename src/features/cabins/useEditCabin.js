import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createAndEditCabin } from '../../services/apiCabins';
function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createAndEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Cabin has been edited');
      // 还要清空缓存数据，当发生变化时，强制重新获取
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => {
      toast.error(err.message || 'Cabin edit failed');
      throw new Error('Cabin edit failed');
    },
  });
  return { editCabin, isEditing };
}

export default useEditCabin;
