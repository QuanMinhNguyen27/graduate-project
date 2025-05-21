import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import {
  AuthContainer,
  AuthContent,
  AuthForm,
  Title,
  Subtitle,
  FormGroup,
  Label,
  Input,
  Button,
  LinkText,
  CheckboxContainer,
  CheckboxLabel,
  ForgotPassword,
} from '../styles/AuthStyles';

interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean(),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const initialValues: LoginValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const handleSubmit = async (values: LoginValues) => {
    try {
      const response = await authApi.login({
        email: values.email,
        password: values.password,
      });

      if (response.success) {
        navigate('/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <AuthContainer>
      <AuthContent>
        <AuthForm>
          <Title>Welcome back!</Title>
          <Subtitle>Please sign in to your account</Subtitle>

          {error && (
            <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <FormGroup>
                  <Label htmlFor="email">Email address</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email && (
                    <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.email}
                    </div>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {errors.password && touched.password && (
                    <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.password}
                    </div>
                  )}
                </FormGroup>

                <CheckboxContainer>
                  <CheckboxLabel>
                    <Field type="checkbox" name="rememberMe" />
                    Remember me
                  </CheckboxLabel>
                  <ForgotPassword href="/forgot-password">Forgot password?</ForgotPassword>
                </CheckboxContainer>

                <Button type="submit">Sign in</Button>
              </Form>
            )}
          </Formik>

          <LinkText>
            Don't have an account? <Link to="/register">Sign up</Link>
          </LinkText>
        </AuthForm>
      </AuthContent>
    </AuthContainer>
  );
};

export default Login; 