// src/components/CommentList.js
// 전체 투표에 대한 댓글 목록 (단순화)

/**
 * props
 *  - comments: 댓글 배열 (optionId가 null인 전체 댓글만)
 */
const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-sm text-gray-400 mb-4">아직 댓글이 없습니다.</p>;
  }

  return (
    <ul className="space-y-3 mb-4">
      {comments.map((comment) => (
        <li
          key={comment.commentId}
          className="border rounded-lg px-4 py-3 bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {comment.authorUsername || "익명"}
            </span>
            <span className="text-xs text-gray-400">
              {comment.createdAt}
            </span>
          </div>
          <p className="text-sm text-gray-800">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
