import { useMutation } from '@tanstack/react-query';
import { updateUserData as updatedUserAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
function useUpdateUser() {
  // 同理 更新用户信息逻辑用useMutation
  // useQueryClient用来获取queryClient实例 从而更新缓存
  const queryClient = useQueryClient();
  const { mutate: updatedUser, isLoading: isUpdating } = useMutation({
    mutationFn: updatedUserAPI,
    onSuccess: ({ user }) => {
      toast.success('User data updated successfully');
      // 将更新的数据存储到React Query的缓存中 以便其他组件可以立即获取最新数据，而不需要重新请求服务器，因为React Query可以自动refresh数据
      queryClient.setQueryData(['user'], user);
    },
    onError: () => {
      toast.error('Error updating user data');
    },
  });
  return { updatedUser, isUpdating };
}

export default useUpdateUser;
