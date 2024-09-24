import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/login.css"
import FacebookSVG from "../../storage/img/Facebook.svg"
import DiscordSVG from "../../storage/img/Discord.svg"
import GoogleSVG from "../../storage/img/Google.svg"

function Login() {
  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      nick,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.1.0'
        },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuario autenticado:', data);
        navigate('/home');
      } else {
        // Manejo de error en el inicio de sesión
        setError(data.message || 'Error de inicio de sesión');
      }
    } catch (error) {
      // Manejo de errores de red o de servidor
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <>
      <section className="section__form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login">
          <label htmlFor="nick">Username or Email address</label>
          <input
            type="text"
            id="nick"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <span>Forgot password?</span>
          <input type="submit" value="Log in" />
        </form>
      </section>
      <section>
        <div className="section__line">
          <span>Or Login with</span>
        </div>
        <div className="section__social">
          <a href="/login"><img src={FacebookSVG} alt="Facebook" /></a>
          <a href="/auth/google"><img src={GoogleSVG} alt="Google" /></a>
          <a href="/login"><img src={DiscordSVG} alt="Discord" /></a>
        </div>  
      </section>
    </>
  );
}

export default Login;
