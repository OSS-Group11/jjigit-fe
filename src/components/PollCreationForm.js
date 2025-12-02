import React, { useState } from 'react';
import { Sparkles, Plus } from 'lucide-react';

const PollCreationForm = ({ onCreatePoll }) => {
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollTitle, setPollTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);   // ✅ 비공개 여부
  const [llmSuggestion, setLlmSuggestion] = useState(''); // ✅ LLM 제안 텍스트 (필요시 사용)

  const addOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const updateOption = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  // ✅ 폼 제출 핸들러: 여기서 newPollData 만들어서 부모로 전달
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pollTitle.trim()) {
      alert('투표 제목을 입력하세요.');
      return;
    }
    if (pollOptions.some(opt => !opt.trim())) {
      alert('모든 옵션을 입력하세요.');
      return;
    }

    const newPollData = {
      title: pollTitle,
      isPublic: !isPrivate,   // 체크박스: 비공개면 false, 공개면 true
      options: pollOptions.map((text,index) =>({
        optionText: text,
        optionOrder: index + 1,
      })),
      
      // ✅ LLM 제안 내용을 백엔드에 같이 보내고 싶다면:
      // llmSuggestion: llmSuggestion,

      // ✅ 나중에 LLM이 자동으로 생성한 옵션을 options에 섞거나
      //    별도 필드로 보내고 싶다면 여기에서 가공하면 됨.
      // 예)
      // options: [...pollOptions, ...generatedOptionsFromLLM],
    };

    // 부모(CreatePollPage)의 handleCreatePoll 호출
    onCreatePoll(newPollData);
  };

  // ✅ LLM 버튼 클릭 시 나중에 실제 LLM 호출 붙일 자리
  const handleLlmSuggest = () => {
    // TODO: 여기서 백엔드 또는 외부 LLM API를 호출해서
    //       제목/옵션 제안값을 받아 setPollTitle / setPollOptions / setLlmSuggestion
    //       으로 상태를 갱신하면 됨.
    alert('LLM 주제 제안 로직은 추후 구현 예정입니다.');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-12"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-10 border border-gray-200/50 shadow-xl">
          <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            투표 만들기
          </h1>

          {/* Poll Title */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              투표 제목
            </label>
            <input
              type="text"
              value={pollTitle}
              onChange={(e) => setPollTitle(e.target.value)}
              placeholder="예: 팀 회식 장소, 다음 프로젝트 기술 스택"
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* LLM Suggestion Button */}
          <button
            type="button"
            onClick={handleLlmSuggest}
            className="w-full mb-8 px-6 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <Sparkles size={20} />
            LLM 주제 제안 받기
          </button>

          {/* Poll Options */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700">
                투표 옵션
              </label>
              <span className="text-sm text-gray-500">
                ({pollOptions.length}개)
              </span>
            </div>

            <div className="space-y-3">
              {pollOptions.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`옵션 ${index + 1}`}
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={addOption}
              className="mt-4 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              옵션 추가
            </button>
          </div>

          {/* Privacy Toggle */}
          <div className="mb-8 p-4 bg-gray-50/50 rounded-xl border border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">
                비공개 투표
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"  // ✅ 폼 제출 트리거
            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            투표 생성
          </button>
        </div>
      </div>
    </form>
  );
};

export default PollCreationForm;
