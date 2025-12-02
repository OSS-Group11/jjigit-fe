// src/pages/NoticePage.js
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios
      .get("/notices")
      .then((res) => setNotices(res.data))
      .catch((e) => console.error(e));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    axios
      .post("/notices", { title, body })
      .then((res) => {
        setNotices((prev) => [res.data, ...prev]);
        setTitle("");
        setBody("");
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="px-8 py-8 space-y-6">
      {/* 작성 폼 (권한 있으면 노출) */}
      <form
        onSubmit={handleSubmit}
        className="border rounded-lg p-4 flex flex-col gap-2 max-w-xl"
      >
        <h2 className="font-semibold text-sm">공지사항 작성</h2>
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border rounded px-2 py-1 text-sm h-24 resize-none"
          placeholder="내용"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          type="submit"
          className="self-end px-3 py-1 rounded bg-blue-600 text-white text-xs"
        >
          등록
        </button>
      </form>

      {/* 리스트 (날짜/제목/글) */}
      <div className="border rounded-lg overflow-hidden text-xs">
        <div className="grid grid-cols-12 bg-gray-50 font-semibold px-3 py-2">
          <div className="col-span-2">날짜</div>
          <div className="col-span-4">제목</div>
          <div className="col-span-6">내용</div>
        </div>
        {notices.map((n) => (
          <div
            key={n.id}
            className="grid grid-cols-12 border-t px-3 py-2"
          >
            <div className="col-span-2">
              {new Date(n.createdAt).toLocaleDateString()}
            </div>
            <div className="col-span-4 font-medium">{n.title}</div>
            <div className="col-span-6 text-gray-700 line-clamp-2">
              {n.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticePage;
