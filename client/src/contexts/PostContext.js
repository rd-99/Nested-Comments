import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../services/posts";
const Context = React.createContext();

export function usePost() {
  return useContext(Context);
}

export function PostProvider({ children }) {
  const { id } = useParams();
  const { loading, error, value: post } = useAsync(() => getPost(id), [id]);

  const groupCommentsByParentId = useMemo(() => {
    if (post?.comments === null) return [];
    const group = {};
    post.comments.array.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
  }, [post.comments]);

  return (
    <Context.Provider
      value={{
        post: {
          id,
          ...post,
        },
      }}
    >
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1 className="error-msg">Error...</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
