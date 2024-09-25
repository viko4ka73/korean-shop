import React, { useState } from "react";
import { signIn } from "../../api"; 
import { useAuth } from "../../sections/AuthProvider";
import AdminDashboard from "./AdminDashboard";

const AdminPanel = () => {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
      const response = await signIn({ username, password }); 
      if (response && response.access_token) {
        login(response); 
      } else {
        setError("Ошибка: не удалось получить токен доступа."); 
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Неверное имя пользователя или пароль."); 
    }
  };


  if (isAuthenticated) {
    return <AdminDashboard />;
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-8 rounded shadow-md w-80"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4">Вход администратора</h2>
        {error && <p className="text-red-500">{error}</p>}{" "}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Имя пользователя"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button
          type="submit"
          className="w-full bg-main text-white p-2 rounded hover:bg-main-dark"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
