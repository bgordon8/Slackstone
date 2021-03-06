import React from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { loginUser } from '../actions/auth';
import LoginForm from '../components/Login/LoginForm';

const Login = ({ loginUser }) => {
  const auth = useSelector(({ auth }) => auth);

  if (auth.isLoggedIn) {
    return <Redirect to="get-started" />;
  }

  return (
    <Container>
      <FormContainer>
        <FormHeader>
          <h2>Login to your account</h2>
          <span>
            Need and account? <Link to="/register">Register</Link>
          </span>
        </FormHeader>
        <LoginForm loginUser={loginUser} />
      </FormContainer>
    </Container>
  );
};

export default connect(null, { loginUser })(Login);

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100;
  padding: 2rem;
`;

const FormContainer = styled.div`
  padding: 2rem;
  width: 100%;
  height: 100%;
  max-width: 500px;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    04px 6px -2px rgba(0, 0, 0, 0.05);
`;

const FormHeader = styled.div`
  margin-bottom: 0.1rem;
`;
