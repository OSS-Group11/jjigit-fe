// src/components/PollCreationForm.js
import React, { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import axios from "axios";

const PollCreationForm = ({ onCreatePoll }) => {
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollTitle, setPollTitle] = useState("");
  const [description, setDescription] = useState(""); // ⭐ 추가됨
  const [isPublic, setIsPublic] = useState(true); // ⭐ 공개/비공개 (추가 코드 기준)
  const [imageFile, setImageFile] = useState(null); // ⭐ 이미지 업로드
  const [llmSuggestion, setLlmSuggestion] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false); // AI 로딩 상태

  const addOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pollTitle.trim()) {
      alert("투표 제목을 입력하세요.");
      return;
    }
    if (pollOptions.some((opt) => !opt.trim())) {
      alert("모든 옵션을 입력하세요.");
      return;
    }

    const newPollData = {
      title: pollTitle,
      description,
      isPublic, // ⭐ boolean 형태
      options: pollOptions.filter((opt) => opt.trim()),
      imageFile, // ⭐ 부모에서 FormData로 처리됨
      llmSuggestion,
    };

    onCreatePoll(newPollData); // ⭐ 부모로 전달
  };

  const handleLlmSuggest = async () => {
    setIsLoadingAI(true);
    try {
      const AI_SERVICE_URL = process.env.REACT_APP_AI_URL ||
        (window.location.hostname === 'localhost'
          ? 'http://localhost:8000'
          : 'https://jjigit-ai.onrender.com');

      const response = await axios.post(`${AI_SERVICE_URL}/api/generate`);
      const suggestedTopic = response.data.topic;

      // 제안된 주제를 제목에 반영
      setPollTitle(suggestedTopic);
      setLlmSuggestion(suggestedTopic);

      // 성공 메시지
      alert(`AI가 제안한 주제: ${suggestedTopic}`);
    } catch (error) {
      console.error("AI 주제 생성 오류:", error);
      alert(
        "AI 주제 생성 중 오류가 발생했습니다. AI 서비스가 실행 중인지 확인해주세요."
      );
    } finally {
      setIsLoadingAI(false);
    }
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

          {/* Title */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              투표 제목
            </label>
            <input
              type="text"
              value={pollTitle}
              onChange={(e) => setPollTitle(e.target.value)}
              placeholder="예: 팀 회식 장소, 다음 프로젝트 기술 스택"
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 transition-colors bg-white/50 text-gray-900"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              설명 (선택)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="투표에 대한 설명을 입력하세요."
              className="w-full px-5 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 transition-colors bg-white/50 text-gray-900 h-28 resize-none"
            />
          </div>

          {/* LLM Button */}
          <button
            type="button"
            onClick={handleLlmSuggest}
            disabled={isLoadingAI}
            className="w-full mb-8 px-6 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Sparkles size={20} className={isLoadingAI ? "animate-spin" : ""} />
            {isLoadingAI ? "AI가 주제를 생성 중..." : "AI 주제 제안 받기"}
          </button>

          {/* Options */}
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
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors bg-white/50 text-gray-900"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={addOption}
              className="mt-4 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              옵션 추가
            </button>
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              이미지 업로드 (선택)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="text-sm"
            />
          </div>

          {/* Public / Private */}
          <div className="mb-8 p-4 bg-gray-50/50 rounded-xl border border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">
                공개 여부
              </span>
              <select
                value={isPublic ? "public" : "private"}
                onChange={(e) => setIsPublic(e.target.value === "public")}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="public">공개 투표</option>
                <option value="private">비공개 투표</option>
              </select>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
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
