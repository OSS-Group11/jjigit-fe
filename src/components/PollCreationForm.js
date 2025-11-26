import React, { useState } from 'react';

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

  // LLM 기반 주제 제안을 요청하는 더미 함수
  const suggestTopic = async () => {
    console.log('LLM-based Topic Suggestion requested...');
    // API 호출을 통해 AI 서버에서 주제 제안을 받습니다.
    const suggestedTitle = "오늘 점심 메뉴 투표"; // 예시 데이터
    setTitle(suggestedTitle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>새 투표 만들기</h2>
      <input
        type="text"
        placeholder="투표 제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="button" onClick={suggestTopic}>
        💡 LLM 주제 제안 받기
      </button>

      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`옵션 ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          required
        />
      ))}
      <button type="button" onClick={addOption}>+ 옵션 추가</button>

      <div>
        <input
          type="checkbox"
          id="private"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        <label htmlFor="private">비공개 투표</label>
      </div>

      <button type="submit">투표 생성</button>
    </form>
  );
};

export default PollCreationForm;
