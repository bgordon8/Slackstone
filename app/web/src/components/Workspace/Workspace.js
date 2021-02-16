import React from 'react';
import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';

const Workspace = ({ workspace }) => {
  const { workspaceId } = useParams();
  const isActive = () => {
    return workspace.id === parseInt(workspaceId);
  };

  return (
    <Container>
      <WorkspaceLink
        key={`workspace-${workspace.id}`}
        isActive={isActive}
        activeClassName="active"
        to={`/workspace/${workspace.id}`}
      >
        {workspace.name.charAt(0).toUpperCase()}
      </WorkspaceLink>
    </Container>
  );
};

export default Workspace;

const Container = styled.div`
  position: relative;
  margin: 0px 15px;
  padding: 0px 15px;
`;

const WorkspaceLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  font-size: 24px;
  border-radius: 11px;
  cursor: pointer;
  transition: border-width ease-in 0.1s;
  text-decoration: none;

  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
  &.active {
    border-style: solid;
    border-width: thick;
    border-color: #fff;
  }
`;
