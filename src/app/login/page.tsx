"use client";
import { useState, FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from "./page.module.css";

const Login: React.FC = () => {
  

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const router = useRouter();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically make a POST request to your API to authenticate the user
    // After successful authentication, you might want to redirect the user to the home page
    // router.push('/home');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
  </div>
  );
}

export default Login;