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
} from '../styles/AuthStyles';

interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const initialValues: RegisterValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: RegisterValues) => {
    try {
      const response = await authApi.register(values);

      if (response.success) {
        navigate('/dashboard');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <AuthContainer>
      <AuthContent>
        <AuthForm>
          <Title>Create Account</Title>
          <Subtitle>Please fill in your details to sign up</Subtitle>

          {error && (
            <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
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

                <FormGroup>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.confirmPassword}
                    </div>
                  )}
                </FormGroup>

                <Button type="submit">Sign up</Button>
              </Form>
            )}
          </Formik>

          <LinkText>
            Already have an account? <Link to="/login">Sign in</Link>
          </LinkText>
        </AuthForm>
      </AuthContent>
    </AuthContainer>
  );
};

export default Register; 