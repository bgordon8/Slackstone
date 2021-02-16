import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getWorkspaces } from '../actions/app';
import { getWorkspaceData } from '../actions/workspace';
import Workspaces from '../components/Workspace/Workspaces';
import Channels from '../components/Workspace/Channels';
import Channel from '../containers/Channel';

const Workspace = () => {
  const { workspaceId } = useParams();
  const { path } = useRouteMatch();
  const app = useSelector((state) => state.app);
  const auth = useSelector((state) => state.auth);
  const workspace = useSelector((state) => state.workspace);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspaceData({ workspaceId }));
  }, [dispatch, workspaceId]);

  useEffect(() => {
    dispatch(getWorkspaces({ userId: auth.userInfo.id }));
  }, [dispatch]);

  return (
    <Container>
      <Workspaces workspaces={app.workspaces} />
      <Channels channels={workspace.channels} user={auth.userInfo} />
      <Switch>
        <Route path={`${path}/channel/:channelId`} />
        <Channel />
      </Switch>
    </Container>
  );
};

export default Workspace;

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;
