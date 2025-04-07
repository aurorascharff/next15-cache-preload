import { getComments } from '@/data/comment';

export const preloadComments = (id: string) => {
  void getComments(id);
};

export async function Comments({ postId }: { postId: string }) {
  const comments = await getComments(postId);

  return (
    <div className="rounded border-2 border-slate-500 p-4">
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => {
          return <li key={comment.id}>{comment.body}</li>;
        })}
      </ul>
    </div>
  );
}
