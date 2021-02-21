import React from 'react';
import styled from 'styled-components';

const Bubble = ({ on = true }) => {
  return on ? (
    <Green>
      <StyledIcon on={true} className="fas fa-circle" />
    </Green>
  ) : (
    <StyledIcon className="far fa-circle" />
  );
};

export default Bubble;

const Green = styled.span`
  color: #38978d;
`;

const StyledIcon = styled.i`
  font-size: 0.5em;
  color: ${(props) => (props.on ? '#38978d' : '#fff')};
`;
