import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Bubble from './Bubble';
import StyledLink from '../StyledLink';
import SideBarListItem from '../SideBarListItem';

const User = ({ user }) => {
  const { url } = useRouteMatch();
  return (
    <StyledLink
      key={`user-${user.id}`}
      to={`${url}/direct-messages/${user.id}`}
    >
      <SideBarListItem>
        <Bubble />
        {User.username}
      </SideBarListItem>
    </StyledLink>
  );
};

export default User;
