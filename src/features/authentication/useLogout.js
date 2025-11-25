import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutAPI } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutAPI(),
    onSuccess: () => {
      // 清除所有与用户相关的缓存数据，确保登出后不会保留任何敏感信息
      // 这里不指定具体的查询键 直接清除所有缓存
      queryClient.removeQueries();

      // 当用户登出成功后 重定向到登陆界面 replace:true 防止用户通过浏览器后退按钮返回到受保护的页面
      // replace的作用是替换当前的历史记录条目
      // 说白了就是不让用户返回到登出前的页面 因为它被替换更新掉了
      navigate('/login', { replace: true });
    },
  });
  return { logout, isLoading };
}
