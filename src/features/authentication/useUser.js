// 用来获取用户信息 并且存储到本地当中
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
export function useUser() {
  // 获取信息那自然是用Query了
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });
  return { user, isLoading, isAuthenticated: user?.role === 'authenticated' };
}
