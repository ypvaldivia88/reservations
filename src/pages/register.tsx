"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/Register.module.css';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
}