import { Suspense } from 'react';
import { Post } from '@/components/Post';

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;

  return (
    <div>
      <h1>Post: {postId}</h1>
      <Suspense fallback={<div>Loading post...</div>}>
        <Post postId={postId} />
      </Suspense>
    </div>
  );
}
