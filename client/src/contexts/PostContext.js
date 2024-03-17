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
    if (post?.comments == null) return [];
    const group = {};
    post.comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [post?.comments]);

  function getReplies(parentId) {
    return groupCommentsByParentId[parentId];
  }
  return (
    <Context.Provider
      value={{
        post: {
          id,
          ...post,
        },
        getReplies,
        rootComments: groupCommentsByParentId[null],
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
