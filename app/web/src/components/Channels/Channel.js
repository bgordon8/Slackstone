import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveChannel } from '../../actions/workspace';
import StyledLink from '../StyledLink';
import SideBarListItem from '../SideBarListItem';

const Channel = ({ channel }) => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setActiveChannel(channel));
  };
  return (
    <StyledLink
      key={`channel-${channel.id}`}
      to={`${url}/channel/${channel.id}`}
    >
      <SideBarListItem onClick={handleClick}># {channel.name}</SideBarListItem>
    </StyledLink>
  );
};

export default Channel;
