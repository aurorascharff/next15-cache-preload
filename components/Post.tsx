import { Suspense } from 'react';
import { getPost } from '@/data/post';
import { Comments, preloadComments } from './Comments';

export async function Post({ postId }: { postId: string }) {
  // Prefetch the comments, but don't await the promise, so it doesn't block rendering
  preloadComments(postId);
  const post = await getPost(postId);

  // The suspense boundary around <Comments> will not be visible, because the await has already completed
  return (
    <div className="rounded border-2 border-blue-500 p-4">
      <h2>Title: {post?.title}</h2>
      Post comments:
      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments postId={postId} />
      </Suspense>
    </div>
  );
}
