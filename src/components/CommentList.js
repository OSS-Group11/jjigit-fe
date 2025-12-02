// src/components/CommentList.js
import React from 'react';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p>아직 댓글이 없습니다.</p>;
  }

  return (
    <ul className="space-y-3">
      {comments.map((c) => (
        <li key={c.commentId} className="border rounded-lg p-3">
          <div className="text-sm text-gray-500 mb-1">
            {c.authorUsername || '익명'} · {c.createdAt}
            {c.votedOptionId && (
              <span className="ml-2 text-xs text-indigo-600">
                (선택한 옵션 ID: {c.votedOptionId})
              </span>
            )}
          </div>
          <div>{c.content}</div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
