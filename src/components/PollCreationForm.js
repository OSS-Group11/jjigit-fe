// 투표 생성 폼 코드

import React, { useState } from 'react';
import axios from 'axios';

const PollCreationForm = ({ onCreatePoll }) => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, '']);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPoll = {
      title,
      options: options.filter(opt => opt.trim() !== ''),
      isPrivate,
    };
    onCreatePoll(newPoll);
    // 실제 API 호출 로직은 여기에 구현됩니다.
    console.log('Poll Data:', newPoll);
  };

  // LLM 기반 주제 제안을 요청하는 함수
  const suggestTopic = async () => {
    try {
      console.log('LLM-based Topic Suggestion requested...');

      // AI 서버에서 주제 제안 받기
      const response = await axios.post('http://localhost:8000/api/generate');
      const suggestedTitle = response.data.topic;

      setTitle(suggestedTitle);
      console.log('Generated topic:', suggestedTitle);
    } catch (error) {
      console.error('Failed to get AI suggestion:', error);
      alert('AI 주제 생성 중 오류가 발생했습니다. AI 서비스가 실행 중인지 확인해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{textAlign: 'left', maxWidth: '500px', margin: '0 auto'}}>
      <h2>새 투표 만들기</h2>
      <div style={{marginBottom: '15px'}}>
        <input
          type="text"
          placeholder="투표 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="button" onClick={suggestTopic} style={suggestButtonStyle}>
          💡 LLM 주제 제안 받기
        </button>
      </div>


      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`옵션 ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          required
          style={{...inputStyle, display: 'block', marginBottom: '10px'}}
        />
      ))}
      <button type="button" onClick={addOption} style={addOptionStyle}>+ 옵션 추가</button>

      <div style={{marginTop: '20px'}}>
        <input
          type="checkbox"
          id="private"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        <label htmlFor="private">비공개 투표</label>
      </div>

      <button type="submit" style={submitButtonStyle}>투표 생성</button>
    </form>
  );
};

// 간단한 인라인 스타일
const inputStyle = {
    padding: '10px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    marginRight: '10px'
};
const suggestButtonStyle = {
    padding: '10px 15px',
    fontSize: '1em',
    cursor: 'pointer',
    backgroundColor: '#ffc107',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold'
};
const addOptionStyle = {
    padding: '8px 15px',
    fontSize: '0.9em',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginTop: '10px'
};
const submitButtonStyle = {
    padding: '10px 20px',
    fontSize: '1.1em',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginTop: '20px'
};

export default PollCreationForm;
