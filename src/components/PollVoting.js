// 투표 참여 폼 코드

import { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-xl p-6 max-w-2xl">
      <div className="space-y-3">
        {options.map((option) => {
          const optionId = option.optionId || option.id;
          const optionText = option.optionText || option.text;

          return (
            <label
              key={optionId}
              htmlFor={`option-${optionId}`}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedOption === optionId
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                id={`option-${optionId}`}
                name="poll-option"
                value={optionId}
                checked={selectedOption === optionId}
                onChange={() => setSelectedOption(optionId)}
                required
                className="w-5 h-5 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-3 text-base font-medium text-gray-800">{optionText}</span>
            </label>
          );
        })}
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
      >
        투표하기
      </button>
    </form>
  );
};

export default PollVoting;
