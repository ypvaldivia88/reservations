import mongoose, { Document, Model, Schema } from "mongoose";

interface ITurno extends Document {
  nombreCliente: string;
  servicio: string;
  fecha: Date;
  hora: string;
}

const TurnoSchema: Schema = new Schema({
  nombreCliente: { type: String, required: true },
  servicio: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
});

const Turno: Model<ITurno> =
  mongoose.models.Turno || mongoose.model<ITurno>("Turno", TurnoSchema);

export default Turno;
