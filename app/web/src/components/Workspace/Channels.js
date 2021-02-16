import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Channel from '../Channels/Channel';
import SideBarHeader from '../SideBarHeader';

const Channels = ({ channels, user }) => {
  const workspace = useSelector((state) => state.workspace);

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
