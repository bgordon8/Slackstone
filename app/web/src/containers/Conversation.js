import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getDirectMessageData,
  newDirectMessage,
} from '../actions/directMessage';
import { NEW_DIRECT_MESSAGE } from '../constants/types';
const SOCKET_SERVER = 'http://localhost:4000';

const Conversation = () => {
  const { workspaceId, recipientId } = useParams();
  const [message, setMessage] = useState('');
  const messageContainerRef = useRef();
  const socketRef = useRef();
  const dispatch = useDispatch();
  const directMessage = useSelector((state) => state.directMessage);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (messageContainerRef.current) scrollToBottom();
  }, [directMessage.messages]);

  useEffect(() => {
    dispatch(getDirectMessageData({ workspaceId, recipientId }));

    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { workspaceId },
    });

    socketRef.current.on(NEW_DIRECT_MESSAGE, (message) => {
      const workspace = parseInt(workspaceId) === message.workspaceId;
      const isSender = message.userId === auth.userInfo.id;
      const isRecipient = message.recipientId === auth.userInfo.id;

      if (workspace && (isSender || isRecipient)) {
        dispatch(newDirectMessage({ message }));
      }
    });

    return () => {
      socketRef.current.close();
    };
  }, [dispatch, workspaceId, recipientId]);

  const scrollToBottom = () => {
    messageContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (directMessage && !directMessage.user) {
    return null;
  }
  return (
    <>
      <Header>{directMessage.user.username}</Header>
      <Messages>
        <MessagesList>
          {directMessage.messages.map((message) => (
            <MessagesListItem key={message.id}>{message.text}</MessagesListItem>
          ))}
          <div ref={messageContainerRef}></div>
        </MessagesList>
      </Messages>
      <InputContainer>
        <Input
          type="text"
          placeholder={`message ${directMessage.user.username}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              socketRef.current.emit(NEW_DIRECT_MESSAGE, {
                workspaceId: parseInt(workspaceId),
                recipientId: parseInt(recipientId),
                senderId: socketRef.current.id,
                userId: auth.userInfo.id,
                message,
              });
              setMessage('');
            }
          }}
        />
      </InputContainer>
    </>
  );
};

export default Conversation;

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

const Header = styled.div`
  background-color: #fff;
  grid-column: 3;
  grid-row: 1;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
  padding: 1em;
  text-align: center;
`;

const MessagesListItem = styled.li`
  padding: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  background-color: #f2f2f2;
`;

const InputContainer = styled.div`
  background: #fff;
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
