export async function getPost(postId: string) {
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
}
