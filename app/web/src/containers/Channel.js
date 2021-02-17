import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelData } from '../actions/channel';
import { newChannelMessage } from '../actions/channel';

const Channel = () => {
  const { workspaceId, channelId } = useParams();
  const messageContainerRef = useRef();
  const [message, setMessage] = useState('');
  const channel = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (messageContainerRef.current) scrollToBottom();
  });

  useEffect(() => {
    dispatch(getChannelData({ channelId }));
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
              dispatch(newChannelMessage({ message, channelId }));
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
