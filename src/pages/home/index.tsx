"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/Home.module.css';

interface Turno {
  _id: string;
  nombreCliente: string;
  servicio: string;
  fecha: string;
  hora: string;
}

export default function Home() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [form, setForm] = useState({ nombreCliente: '', servicio: '', fecha: '', hora: '' });

  useEffect(() => {
    fetch('/api/turnos')
      .then((res) => res.json())
      .then((data) => setTurnos(data.data));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/turnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setTurnos([...turnos, data.data]);
      setForm({ nombreCliente: '', servicio: '', fecha: '', hora: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión de Turnos</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="nombreCliente"
          placeholder="Nombre del Cliente"
          value={form.nombreCliente}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="servicio"
          placeholder="Servicio"
          value={form.servicio}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="date"
          name="fecha"
          placeholder="Fecha"
          value={form.fecha}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="time"
          name="hora"
          placeholder="Hora"
          value={form.hora}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Agregar Turno</button>
      </form>
      <ul className={styles.list}>
        {turnos.map((turno) => (
          <li key={turno._id} className={styles.listItem}>
            {turno.nombreCliente} - {turno.servicio} - {turno.fecha} - {turno.hora}
          </li>
        ))}
      </ul>
    </div>
  );
}
