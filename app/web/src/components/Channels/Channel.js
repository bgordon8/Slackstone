import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import StyledLink from '../StyledLink';
import SideBarListItem from '../SideBarListItem';

const Channel = ({ channel }) => {
  const { url } = useRouteMatch();
  return (
    <StyledLink
      key={`channel-${channel.id}`}
      to={`${url}/channel/${channel.id}`}
    >
      <SideBarListItem># {channel.name}</SideBarListItem>
    </StyledLink>
  );
};

export default Channel;
