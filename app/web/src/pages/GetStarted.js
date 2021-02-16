import React from 'react';
import styled from 'styled-components';

const GetStarted = () => {
  return (
    <Container>
      <Header>
        <h2>SlackStone</h2>
      </Header>
      <Main>
        <Card>
          <Subtitle>Workspaces for user</Subtitle>
          {[{ name: 'apollo' }].map((workspace, idx) => (
            <div key={`workspace-${idx}`}>
              <WorkspaceListItem>{workspace.name}</WorkspaceListItem>
              <Hr />
            </div>
          ))}
        </Card>
      </Main>
    </Container>
  );
};

export default GetStarted;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;

const Hr = styled.hr`
  border: none;
  border-bottom: 1px solid #ddd;
  clear: both;
  margin-bottom: 16px;
`;

const Main = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 960px;
`;

const Card = styled.div`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.div`
  text-align: left;
  padding: 1em;
  margin-bottom: 15px;
  border-bottom: solid 1px rgba(221, 221, 221, 1);
`;

const WorkspaceListItem = styled.div`
  text-align: left;
  color: inherit;
  display: block;
  padding: 15px 0 20px 24px;
`;
