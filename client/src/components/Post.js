import { usePost } from "../contexts/PostContext";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
export function Post() {
  const { post, rootComments } = usePost();
  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <CommentForm />
      <h3 className="comment-title">Comments</h3>
      <section>
        {rootComments !== null && rootComments?.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  );
}
