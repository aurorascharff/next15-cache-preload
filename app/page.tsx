import { cache, Suspense } from 'react';

const getPosts = async () => {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });
  return [
    {
      body: 'This is the first post on this blog.',
      id: 1,
      title: 'Hello World',
    },
  ];
};

const getComments = cache(async () => {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });
  return [
    {
      body: 'This is the first comment on this blog.',
      id: 1,
      postId: 1,
    },
  ];
});

async function Comments() {
  const comments = await getComments();

  return (
    <>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => {
          return <li key={comment.id}>{comment.body}</li>;
        })}
      </ul>
    </>
  );
}

async function Posts() {
  const posts = await getPosts();

  return (
    <>
      <ul>
        {posts.map(post => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Comments />
      </Suspense>
    </>
  );
}

export default function RootPage() {
  getComments();

  return (
    <div>
      <h1>Posts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Posts />
      </Suspense>
    </div>
  );
}
