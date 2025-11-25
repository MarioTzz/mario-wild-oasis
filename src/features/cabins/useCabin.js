import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
function useCabin() {
  // 通过useQuery来获取API数据
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ['cabins'],
    // 获取Promise 对象
    queryFn: getCabins,
  });
  return { isLoading, error, cabins };
}

export default useCabin;
