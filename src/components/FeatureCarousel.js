// src/components/CommentList.js
// 옵션별 댓글 스레드 + 대댓글 + 수정 지원

import React, { useState } from "react";

/**
 * props
 *  - options: [{ optionId, optionText(or text) }, ...]
 *  - comments: [
 *      {
 *        commentId,
 *        optionId,    // 어떤 옵션에 달린 댓글인지 (null이면 전체 투표용)
 *        content,
 *        authorUsername,
 *        createdAt,
 *        updatedAt,
 *        parentId,    // null이면 루트 댓글, 값이 있으면 대댓글
 *      }
 *    ]
 *  - onCreate({ optionId, content, parentId? })
 *  - onUpdate(commentId, content)
 */
const CommentList = ({ options, comments, onCreate, onUpdate }) => {
  if (!comments) comments = [];

  // 전체 투표(global)용 댓글이 있으면 별도 섹션으로 보여줄 수도 있음
  const globalComments = comments.filter((c) => c.optionId == null);

  return (
    <div className="space-y-6">
      {/* 옵션별 스레드 */}
      {options.map((opt) => (
        <OptionThread
          key={opt.optionId || opt.id}
          option={opt}
          comments={comments.filter(
            (c) =>
              c.optionId === opt.optionId ||
              c.optionId === opt.id
          )}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      ))}

      {/* 옵션에 속하지 않은 전체 댓글이 있다면 아래에 출력 */}
      {globalComments.length > 0 && (
        <div className="border rounded p-3">
          <h4 className="text-sm font-semibold mb-2">
            전체 투표에 대한 댓글
          </h4>
          <SimpleCommentList
            comments={globalComments}
            onUpdate={onUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default CommentList;

/** 개별 옵션에 대한 댓글 스레드 */
function OptionThread({ option, comments, onCreate, onUpdate }) {
  const [newContent, setNewContent] = useState("");

  // 부모가 없는 루트 댓글
  const roots = comments.filter((c) => !c.parentId);
  // parentId → childComments 매핑
  const childrenMap = new Map();
  comments.forEach((c) => {
    if (!c.parentId) return;
    if (!childrenMap.has(c.parentId)) childrenMap.set(c.parentId, []);
    childrenMap.get(c.parentId).push(c);
  });

  const optionId = option.optionId || option.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    await onCreate({
      optionId,
      content: newContent.trim(),
      parentId: null,
    });
    setNewContent("");
  };

  return (
    <div className="border rounded p-3">
      <h4 className="text-sm font-semibold mb-2">
        옵션: {option.optionText || option.text}
      </h4>

      {/* 루트 댓글 입력 */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 text-sm mb-3"
      >
        <input
          className="flex-1 border rounded px-2 py-1"
          placeholder="이 옵션에 대한 댓글을 입력하세요"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-1 rounded bg-indigo-600 text-white text-xs"
        >
          등록
        </button>
      </form>

      {/* 댓글 리스트 */}
      {roots.length === 0 ? (
        <p className="text-xs text-gray-400">아직 댓글이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {roots.map((c) => (
            <CommentItem
              key={c.commentId}
              comment={c}
              children={childrenMap.get(c.commentId) || []}
              onCreate={onCreate}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

/** 하나의 댓글 + 대댓글 목록 */
function CommentItem({ comment, children, onCreate, onUpdate }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    await onCreate({
      optionId: comment.optionId,
      content: replyContent.trim(),
      parentId: comment.commentId,
    });
    setReplyContent("");
    setReplyOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editContent.trim()) return;
    await onUpdate(comment.commentId, editContent.trim());
    setEditMode(false);
  };

  return (
    <li className="border rounded px-2 py-1 text-sm bg-white">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {comment.authorUsername || "익명"}
        </span>
        <span className="text-[10px] text-gray-400">
          {comment.createdAt}
        </span>
      </div>

      {/* 내용/수정폼 */}
      {editMode ? (
        <form
          onSubmit={handleUpdate}
          className="mt-1 flex gap-1 text-xs"
        >
          <input
            className="flex-1 border rounded px-1 py-[2px]"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button className="px-2 py-[2px] border rounded">
            저장
          </button>
          <button
            type="button"
            className="px-2 py-[2px] border rounded"
            onClick={() => setEditMode(false)}
          >
            취소
          </button>
        </form>
      ) : (
        <p className="mt-1 text-sm">{comment.content}</p>
      )}

      {/* 액션 버튼 */}
      <div className="mt-1 flex gap-2 text-[11px] text-blue-600">
        <button onClick={() => setReplyOpen((v) => !v)}>
          답글
        </button>
        <button onClick={() => setEditMode(true)}>수정</button>
      </div>

      {/* 대댓글 입력폼 */}
      {replyOpen && (
        <form
          onSubmit={handleReply}
          className="mt-1 ml-2 flex gap-1 text-xs items-center"
        >
          <input
            className="flex-1 border rounded px-1 py-[2px]"
            placeholder="답글을 입력하세요..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button className="px-2 py-[2px] border rounded">
            등록
          </button>
        </form>
      )}

      {/* children (대댓글들) */}
      {children && children.length > 0 && (
        <ul className="mt-2 ml-3 space-y-1">
          {children.map((child) => (
            <CommentItem
              key={child.commentId}
              comment={child}
              children={[]} // 2단계까지만 사용하거나, 필요 시 재귀 확장
              onCreate={onCreate}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/** 옵션과 무관한 단순 댓글 리스트(선택사항) */
function SimpleCommentList({ comments, onUpdate }) {
  if (!comments || comments.length === 0) {
    return <p className="text-xs text-gray-400">댓글이 없습니다.</p>;
  }

  return (
    <ul className="space-y-2">
      {comments.map((c) => (
        <li
          key={c.commentId}
          className="border rounded px-2 py-1 text-sm bg-white"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {c.authorUsername || "익명"}
            </span>
            <span className="text-[10px] text-gray-400">
              {c.createdAt}
            </span>
          </div>
          <p className="mt-1 text-sm">{c.content}</p>
        </li>
      ))}
    </ul>
  );
}
