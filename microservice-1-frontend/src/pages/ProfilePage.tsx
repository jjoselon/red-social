import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiUsers } from "../services/api";

interface User {
  username: string,
  email: string,
  age: number,
  city: string,
  photoUrl: string
}

function ProfilePage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchProfile();
    }
  }, [token, navigate]);


  const fetchProfile = async () => {
    try {
      console.log("toKen fetchProfile " + useAuthStore.getState().token)
      const response = await apiUsers.get("/user/profile", {
        headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
      });
      setUser(response.data.data);
    } catch (error) {
      alert("Error al cargar perfil");
    }
  };

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="profile-container">
      <h2>Perfil de {user.username}</h2>
      <img src={user.photoUrl} alt="Foto de perfil" className="profile-image" />
      <p><strong>Ciudad:</strong> {user.city}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Edad:</strong> {user.age} años</p>
    </div>
  );
}

export default ProfilePage;