import React from 'react';
import styled from 'styled-components';
import Workspace from './Workspace';
import { useSelector } from 'react-redux';

const Channels = ({ channels, user }) => {
  const workspace = useSelector((state) => state.workspace);
  return (
    <Container>
      <WorkspaceNameHeader>Apollo</WorkspaceNameHeader>
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
