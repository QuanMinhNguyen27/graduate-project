import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import styled from '@emotion/styled';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #1a1a1a;
  margin: 0;
`;

const LogoutButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #ff3333;
  }
`;

const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.getMe();
        if (response.success && response.user) {
          setUser(response.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <WelcomeMessage>
        Welcome back, {user.email}!
      </WelcomeMessage>
    </DashboardContainer>
  );
};

export default Dashboard; 