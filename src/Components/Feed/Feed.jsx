import React from 'react';
import PusherService from '../../Services/PusherService';
import axios from 'axios';
import Post from '../Post/Post';

function Feed() {
    const [ posts, setPosts ] = React.useState([]);

    const getPosts = () => {
      axios.get(`http://localhost/api/post`)
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => console.log(error));
    }

    React.useEffect(() => {
      getPosts();
    }, []);

    const pusherService = new PusherService({
        appId: process.env.REACT_APP_PUSHER_APP_ID,
        appCluster: process.env.REACT_APP_PUSHER_CLUSTER,
        appChannel: 'posts',
        listenTo: 'post-created'
      });
    
      pusherService.bindPostCreated(data => {
        if (data.post) {
          setPosts(prevPosts => {
            const currentPosts = [...prevPosts];
            const isDuplicate = currentPosts.some(post => post.id === data.post.id);
            if (!isDuplicate) {
              return [data.post, ...currentPosts];
            }
            return currentPosts;
          });
        }
      })

    return (
      <ul className="flex flex-col items-center p-8 gap-4">
        {posts.map(post => (
          <li key={post.id} className="w-3/4">
            <Post 
              title={post.title}
              content={post.content}
              date={post.created_at}
            />
          </li>
        ))}
      </ul>
    );
}

export default Feed;