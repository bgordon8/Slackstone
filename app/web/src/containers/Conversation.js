import React, { useState } from 'react';
import styled from 'styled-components';

const SOCKET_SERVER = 'http://localhost:4000';

const Conversation = () => {
  const [message, setMessage] = useState('');
  return (
    <>
      <Header>direct message username</Header>
      <Messages>
        <MessagesList>
          {[{ id: 1, text: `howdy` }].map((message) => (
            <MessageListItem key={message.id}>{message.text}</MessageListItem>
          ))}
        </MessagesList>
        <InputContainer>
          <Input
            type="text"
            placeholder={`# user name`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputContainer>
      </Messages>
    </>
  );
};

export default Conversation;

const Header = styled.div`
  background-color: #fff;
  grid-column: 3;
  grid-row: 1;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
  padding: 1em;
  text-align: center;
`;

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
  display: flex;
  flex-direction: column;
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 0;
`;

const MessageListItem = styled.li`
  padding: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  background-color: #f2f2f2;
`;
const InputContainer = styled.div`
  background-color: #fff;
  grid-column: 3;
  grid-row: 3;
  padding: 1em;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 1em;
  outline: none;
  border: 1px solid #f2f2f2;
`;
