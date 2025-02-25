import { cache, Suspense } from 'react';

const getPost = async (postId: string) => {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });
  return [
    {
      body: 'This is the first post on this blog.',
      id: 1,
      title: 'Hello World',
    },
    {
      body: 'This is the second post on this blog.',
      id: 2,
      title: 'Hello Next.js',
    },
  ].find(post => {
    return post.id.toString() === postId;
  });
};

// When using cache(), the return value can be cached/memoized per render across multiple server components
const getComments = cache(async (postId: string) => {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });
  return [
    {
      body: 'This is the first comment on this blog.',
      id: 1,
      postId: 1,
    },
    {
      body: 'This is the second comment on this blog.',
      id: 2,
      postId: 1,
    },
  ].filter(comment => {
    return comment.postId.toString() === postId;
  });
});

async function Comments({ postId }: { postId: string }) {
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

async function Post({ postId }: { postId: string }) {
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

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;

  // Prefetch the comments, but don't await the promise, so it doesn't block rendering
  getComments(postId);

  return (
    <div>
      <h1>Post: {postId}</h1>
      <Suspense fallback={<div>Loading post...</div>}>
        <Post postId={postId} />
      </Suspense>
    </div>
  );
}
