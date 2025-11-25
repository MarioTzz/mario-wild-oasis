import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
import styled from 'styled-components';
import { useEffect } from 'react';
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1.检查用户是否经过身份验证
  const { isAuthenticated, isLoading } = useUser();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);
  // 2.当加载时，显示加载指示器
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 3.如果没有经过身份验证，重定向到登录页面

  // 4.如果经过身份验证，渲染子组件
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
