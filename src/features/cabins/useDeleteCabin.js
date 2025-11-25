import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabins as deleteCabinsAPI } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
function useDeleteCabin() {
  const queryClient = useQueryClient();
  // 使用useMutation来处理删除操作 在React Query中useMutation用于处理创建、更新、删除等操作
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: id => deleteCabinsAPI(id),
    onSuccess: () => {
      toast.success('Cabin deleted successfully');
      // 直接清空缓存数据，强制重新获取
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => {
      toast.error(err.message || 'Cabin delete failed');
      throw new Error('Cabin delete failed');
    },
  });
  return { deleteCabin, isDeleting };
}
export default useDeleteCabin;
