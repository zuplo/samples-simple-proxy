import { ZuploRequest } from "@zuplo/runtime";
    
export default async function (request: ZuploRequest) {
  const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
  const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts');

	// read the JSON bodies
  const users = await userResponse.json();
  const posts = await postResponse.json();

	// join the two responses using JavaScript's map function
  const joined = posts.map(p => {
    const user = users.find(u => u.id === p.userId);
    // delete the userId property from the post
    delete p.userId;
    p.user = user;
    return p;
  });

  return joined;
}