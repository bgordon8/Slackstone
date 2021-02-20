import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SideBarHeader from '../SideBarHeader';
import StyledLink from '../StyledLink';
import SideBarListItem from '../SideBarListItem';
import Channel from '../Channels/Channel';
import Bubble from '../Channels/Bubble';
import User from '../Channels/User';

const Channels = ({ channels, user }) => {
  const { url } = useRouteMatch();
  const workspace = useSelector((state) => state.workspace);
  const auth = useSelector((state) => state.auth);
  return (
    <Container>
      <>
        <WorkspaceNameHeader>{workspace.name}</WorkspaceNameHeader>
        {user.username}
      </>
      <>
        <SideBarList>
          <SideBarHeader>Channels</SideBarHeader>
          {channels.length &&
            channels.map((channel) => (
              <Channel key={channel.id} channel={channel} />
            ))}
        </SideBarList>
      </>
      <>
        <SideBarList>
          <SideBarHeader>Direct Messages</SideBarHeader>
          <StyledLink to={`${url}/direct-messages/${auth.userInfo.id}`}>
            <SideBarListItem>
              <Bubble /> {auth.userInfo.username} <small>(you)</small>
            </SideBarListItem>
          </StyledLink>
        </SideBarList>
      </>
    </Container>
  );
};

export default Channels;

const Container = styled.div`
  background-color: #52364e;
  grid-column: 2;
  grid-row: 1 / 4;
  color: #fff;
  text-align: center;
`;

const WorkspaceNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0px;
  text-align: left;
`;
