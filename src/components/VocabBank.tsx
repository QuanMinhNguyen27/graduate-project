import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 700px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 2.5rem 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const WordList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const WordItem = styled.li`
  background: #f8f9fb;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
`;

const AddForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AddInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
`;

const AddButton = styled.button`
  background: #1abc9c;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
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
  &:hover {
    background: #1abc9c;
    color: #fff;
  }
`;

const VocabBank = () => {
  const [words, setWords] = useState<string[]>(['hello', 'world', 'react', 'dashboard']);
  const [search, setSearch] = useState('');
  const [newWord, setNewWord] = useState('');
  const navigate = useNavigate();

  const filteredWords = words.filter(word => word.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord && !words.includes(newWord)) {
      setWords([newWord, ...words]);
      setNewWord('');
    }
  };

  return (
    <Container>
      <Title>Vocab Bank</Title>
      <SearchInput
        type="text"
        placeholder="Search words..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <AddForm onSubmit={handleAdd}>
        <AddInput
          type="text"
          placeholder="Add a new word..."
          value={newWord}
          onChange={e => setNewWord(e.target.value)}
        />
        <AddButton type="submit">Add</AddButton>
      </AddForm>
      <WordList>
        {filteredWords.map((word, idx) => (
          <WordItem key={idx}>{word}</WordItem>
        ))}
      </WordList>
      <BackButton onClick={() => navigate('/dashboard')}>Back to Dashboard</BackButton>
    </Container>
  );
};

export default VocabBank; 