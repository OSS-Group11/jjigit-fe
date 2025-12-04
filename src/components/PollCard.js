// src/components/PollCard.js
import { useNavigate } from "react-router-dom";

export default function PollCard({ poll }) {
  const navigate = useNavigate();

  /** -------------------------
   *  1. 시간 경과 계산
   * ------------------------- */
  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;

    const mins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);

    if (mins < 60) return `${mins}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  /** -------------------------
   *  2. 현재 1위 옵션 계산
   * ------------------------- */
  const getLeadingOption = () => {
    if (!poll.votes) return null;
    const entries = Object.entries(poll.votes);
    if (entries.length === 0) return null;

    return entries.reduce(
      (max, [option, count]) =>
        count > max.count ? { option, count } : max,
      { option: entries[0][0], count: entries[0][1] }
    );
  };

  const leadingOption = getLeadingOption();

  /** -------------------------
   *  3. 기본 라우팅
   * ------------------------- */
  const handleClick = () => navigate(`/poll/${poll.id}`);

  return (
    <div
      onClick={handleClick}
      className="
        bg-white rounded-2xl shadow-lg cursor-pointer
        hover:shadow-2xl hover:-translate-y-1
        transition-all duration-300 overflow-hidden group border-2 border-gray-100
      "
    >

      {/* -----------------------------------
          카드 본문
      ----------------------------------- */}
      <div className="p-6">
        {/* 상태 배지 */}
        <div className="mb-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              poll.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {poll.status === "active" ? "진행 중" : "종료"}
          </span>
        </div>

        {/* 제목 */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {poll.title}
        </h3>

        {/* 설명 */}
        {poll.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {poll.description}
          </p>
        )}

        {/* 1위 옵션 */}
        {leadingOption && (
          <div className="bg-purple-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">현재 1위</span>
              <span className="text-purple-600 font-semibold">
                {leadingOption.count}표
              </span>
            </div>
            <div className="text-gray-800 font-medium mt-1">
              {leadingOption.option}
            </div>
          </div>
        )}

        {/* 하단 정보 */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            {/* 작성자 */}
            {poll.author && (
              <span className="flex items-center gap-1">
                <span className="text-lg">👤</span>
                {poll.author}
              </span>
            )}

            {/* 작성일 */}
            {poll.createdAt && (
              <span className="flex items-center gap-1">
                <span className="text-lg">🕒</span>
                {getTimeAgo(poll.createdAt)}
              </span>
            )}
          </div>
        </div>

        {/* 투표 & 댓글 수 */}
        <div className="flex items-center gap-4 mt-3 text-sm">
          {poll.totalVotes !== undefined && (
            <span className="flex items-center gap-1 text-purple-600 font-medium">
              <span className="text-lg">✓</span>
              {poll.totalVotes}명 참여
            </span>
          )}
          {poll.totalComments !== undefined && (
            <span className="flex items-center gap-1 text-gray-600">
              <span className="text-lg">💬</span>
              {poll.totalComments}개 댓글
            </span>
          )}
        </div>

        {/* 공개/비공개 표시 (기존 기능 유지) */}
        {poll.isPublic !== undefined && (
          <p className="text-sm text-gray-500 mt-3">
            {poll.isPublic ? "공개 투표" : "비공개 투표"}
          </p>
        )}
      </div>
    </div>
  );
}
