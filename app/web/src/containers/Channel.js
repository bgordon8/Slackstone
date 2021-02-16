import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Channel = () => {
  const channel = useSelector((state) => state.channel);
  return (
    <>
      <Header></Header>
      <Messages>
        <MessagesList></MessagesList>
      </Messages>
    </>
  );
};

export default Channel;

const Messages = styled.div`
  background-color: #fff;
  grid-column: 3;
  grid-row: 2;
  padding: 0 1em;
  overflow-y: scroll;
  color: #000;
  padding: 1em;
  text-align: center;
`;
const MessagesList = styled.ul`
  padding: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  background-color: #f2f2f2;
`;

const Header = styled.div`
  background-color: #fff;
  grid-column: 3;
  grid-row: 1;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
  padding: 1em;
  text-align: center;
`;
