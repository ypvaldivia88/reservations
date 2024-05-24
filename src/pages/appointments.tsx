"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "@/styles/Home.module.css";

interface Appointment {
  _id: string;
  nombreCliente: string;
  servicio: string;
  fecha: string;
  hora: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [form, setForm] = useState({
    nombreCliente: "",
    servicio: "",
    fecha: "",
    hora: "",
  });

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data.data));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setAppointments([...appointments, data.data]);
      setForm({ nombreCliente: "", servicio: "", fecha: "", hora: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión de Appointments</h1>
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
        <button type="submit" className={styles.button}>
          Agregar Appointment
        </button>
      </form>
      <ul className={styles.list}>
        {appointments.map((appointment) => (
          <li key={appointment._id} className={styles.listItem}>
            {appointment.nombreCliente} - {appointment.servicio} -{" "}
            {appointment.fecha} - {appointment.hora}
          </li>
        ))}
      </ul>
    </div>
  );
}
