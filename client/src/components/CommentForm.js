import { useState } from "react";

export function CommentForm({ loading, error }) {
  const [message, setMessage] = useState("");
  return (
    <form>
      <div className="comment-form-row">
        <textarea
          className="message-input"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn">Post</button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
}
