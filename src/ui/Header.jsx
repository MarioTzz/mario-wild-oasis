import styled from 'styled-components';
import HeadMenu from './HeadMenu';
import UserAvatar from '../features/authentication/UserAvatar';
const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;
`;

function Header() {
  // 这里面使用了样式组件styled component
  return (
    <StyledHeader>
      <UserAvatar />
      <HeadMenu />
    </StyledHeader>
  );
}

export default Header;
