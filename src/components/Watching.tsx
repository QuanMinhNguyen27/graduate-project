import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 2.5rem 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  border-bottom: 2px solid ${props => (props.active ? '#1abc9c' : 'transparent')};
  color: ${props => (props.active ? '#1abc9c' : '#888')};
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.2s, border-bottom 0.2s;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const ContentCard = styled.div`
  background: #f8f9fb;
  border-radius: 12px;
  padding: 1.2rem 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContentTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const ContentDesc = styled.p`
  color: #888;
  margin-bottom: 1rem;
`;

const WatchButton = styled.a`
  background: #1abc9c;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: #16a085;
  }
`;

const BackButton = styled.button`
  background: #e6f4ea;
  color: #1abc9c;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 2rem;
  &:hover {
    background: #1abc9c;
    color: #fff;
  }
`;

const contentData = [
  { type: 'movie', title: 'The Social Network', desc: 'Learn English through this drama movie.', url: '#' },
  { type: 'movie', title: 'Inception', desc: 'Explore complex ideas in English.', url: '#' },
  { type: 'song', title: 'Shape of You', desc: 'Learn English through popular songs', url: '#' },
  { type: 'song', title: 'Let It Go', desc: 'Practice English with Disney songs.', url: '#' },
  { type: 'movie', title: 'Thầy Giáo Ba Cười', desc: 'Learn Vietnamese through this comedy video', url: '#' },
  { type: 'song', title: 'See You Again', desc: 'Learn English with emotional lyrics.', url: '#' },
];

const tabOptions = [
  { label: 'All Content', value: 'all' },
  { label: 'Movies', value: 'movie' },
  { label: 'Songs', value: 'song' },
];

const Watching = () => {
  const [tab, setTab] = useState('all');
  const navigate = useNavigate();

  const filteredContent = tab === 'all' ? contentData : contentData.filter(item => item.type === tab);

  return (
    <Container>
      <Title>Watching Content</Title>
      <Tabs>
        {tabOptions.map(option => (
          <Tab key={option.value} active={tab === option.value} onClick={() => setTab(option.value)}>
            {option.label}
          </Tab>
        ))}
      </Tabs>
      <ContentGrid>
        {filteredContent.map((item, idx) => (
          <ContentCard key={idx}>
            <ContentTitle>{item.title}</ContentTitle>
            <ContentDesc>{item.desc}</ContentDesc>
            <WatchButton href={item.url} target="_blank" rel="noopener noreferrer">Watch</WatchButton>
          </ContentCard>
        ))}
      </ContentGrid>
      <BackButton onClick={() => navigate('/dashboard')}>Back to Dashboard</BackButton>
    </Container>
  );
};

export default Watching; 