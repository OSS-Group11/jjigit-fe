// src/components/CommentForm.js

/*
4. 백엔드에 맞춰야 할 필드/엔드포인트 정리
프런트 코드에 맞추려면 BE에서 다음을 제공해야 한다.​

댓글 엔티티 필드 (예시)

Long commentId

Long pollId

Long optionId (nullable: 전체 투표용)

Long parentId (nullable)

String content

String authorUsername

LocalDateTime createdAt

LocalDateTime updatedAt

API

GET /api/polls/{pollId}/comments

응답: { comments: CommentDto[] }

POST /api/polls/{pollId}/comments

바디: { optionId, content, parentId }

응답: CommentDto (생성된 댓글 1개)

PUT /api/polls/{pollId}/comments/{commentId}

바디: { content }

응답: 수정된 CommentDto

이 구조만 맞춰 주면,

옵션별 댓글 스레드,

대댓글,

댓글 수정,
을 현재 FE 코드에서 모두 처리할 수 있다.​
*/

import React, { useState } from "react";

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="전체 투표에 대한 댓글을 입력하세요"
        className="flex-1 border rounded-lg px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
      >
        등록
      </button>
    </form>
  );
};

export default CommentForm;
