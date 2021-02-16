import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { loginUser } from '../../actions/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };
  return (
    <Form>
      <FormGroup>
        <label>email:</label>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>password:</label>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <LoginButton onClick={handleLogin}>Login</LoginButton>
    </Form>
  );
};

export default LoginForm;

const Form = styled.form``;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 75px;
  margin-bottom: 0.1rem;
`;

const Input = styled.input`
  color: #1a202c;
  width: 100%;
  border: solid 1px #e2e8f0;
  padding: 0.5rem 0.7rem;
  border-radius: 0.375rem;
`;

const LoginButton = styled.button`
  background: linear-gradient(
    135deg,
    rbga(0, 97, 215, 1) 0%,
    rbga(0, 200, 255, 1) 100%
  );
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
`;
