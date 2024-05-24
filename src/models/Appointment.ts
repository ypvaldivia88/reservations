import mongoose, { Document, Model, Schema } from "mongoose";

interface IAppointment extends Document {
  nombreCliente: string;
  servicio: string;
  fecha: Date;
  hora: string;
}

const AppointmentSchema: Schema = new Schema({
  nombreCliente: { type: String, required: true },
  servicio: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
});

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
