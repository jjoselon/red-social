import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiPosts } from "../services/api";

interface Post {
  id: number;
  content: string;
  likes: number;
}

function PostsPage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, [token, navigate]);

  const fetchPosts = async () => {
    try {
      console.log("toKen fetchPosts " +  useAuthStore.getState().token)
      const response = await apiPosts.get("/posts/my-posts", {
        headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
      });
      setPosts(response.data.data);
    } catch (error) {
      alert("Error al cargar publicaciones");
    }
  };

  const handleLike = async (postId: number) => {
    try {
      console.log("toKen handleLike " +  useAuthStore.getState().token)
      const response = await apiPosts.post(`/posts/${postId}/like`, {}, {
        headers: { 
          Authorization: `Bearer ${useAuthStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });      
      setPosts(response.data.data.posts);
    } catch (error) {
      alert("Error al dar like");
    }
  };

  return (
    <div>
      <h2>Publicaciones</h2>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.content}</p>
          <button onClick={() => handleLike(post.id)}>Like ({post.likes})</button>
        </div>
      ))}
    </div>
  );
}

export default PostsPage;
