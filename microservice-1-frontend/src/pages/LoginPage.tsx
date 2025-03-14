import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiAuth, setAuthToken } from "../services/api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = async () => {
    try {
      const response = await apiAuth.post("/api/auth/login", { username });
      const token = response.data.token;

      if (token) {
        setToken(token);
        setAuthToken(token);
        navigate("/profile");
      }
    } catch (error) {
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
}

export default LoginPage;
