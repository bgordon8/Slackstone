import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelData } from '../actions/channel';
import { newChannelMessage } from '../actions/channel';
import { NEW_CHANNEL_MESSAGE } from '../constants/types';

const SOCKET_SERVER = 'http://localhost:4000';

const Channel = () => {
  const { workspaceId, channelId } = useParams();
  const messageContainerRef = useRef();
  const socketRef = useRef();
  const [message, setMessage] = useState('');
  const channel = useSelector((state) => state.channel);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messageContainerRef.current) scrollToBottom();
  }, [channel.messages]);

  useEffect(() => {
    dispatch(getChannelData({ channelId }));

    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { workspaceId },
    });

    socketRef.current.on(NEW_CHANNEL_MESSAGE, (message) => {
      if (parseInt(channelId) === message.channelId) {
        dispatch(newChannelMessage({ message }));
      }
    });

    return () => {
      socketRef.current.close();
    };
  }, [dispatch, workspaceId, channelId]);

  const scrollToBottom = () => {
    messageContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <Header>{channel.name}</Header>
      <Messages>
        <MessagesList>
          {channel.messages.map((message) => (
            <MessagesListItem key={message.messageId}>
              {message.text}
            </MessagesListItem>
          ))}
          <div ref={messageContainerRef}></div>
        </MessagesList>
      </Messages>
      <InputContainer>
        <Input
          type="text"
          placeholder={`message #${channel.name}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              socketRef.current.emit(NEW_CHANNEL_MESSAGE, {
                workspaceId: parseInt(workspaceId),
                channelId: parseInt(channelId),
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
