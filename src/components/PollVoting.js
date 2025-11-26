import React, { useState } from 'react';

const PollVoting = ({ options, onVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption) {
      onVote(selectedOption);
    } else {
      alert('옵션을 선택해 주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {options.map((option) => (
        <div key={option.id} style={optionStyle}>
          <input
            type="radio"
            id={`option-${option.id}`}
            name="poll-option"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => setSelectedOption(option.id)}
            required
          />
          <label htmlFor={`option-${option.id}`}>{option.text}</label>
        </div>
      ))}
      <button type="submit" style={voteButtonStyle}>투표하기</button>
    </form>
  );
};

// 간단한 인라인 스타일
const formStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '20px 0'
};

const optionStyle = {
    marginBottom: '10px'
};

const voteButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px'
};

export default PollVoting;
