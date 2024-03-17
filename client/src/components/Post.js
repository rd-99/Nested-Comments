import { usePost } from "../contexts/PostContext";
import { CommentList } from "./CommentList";
export function Post() {
  const { post, rootComments } = usePost();
  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3 className="comment-title">Comments</h3>
      {console.log(rootComments)}
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
