import mongoose from "mongoose";

interface ConnectionStatus {
  isConnected: boolean;
}

const connection: ConnectionStatus = {
  isConnected: false,
};

export async function connect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI!, {
    autoIndex: true,
  });

  connection.isConnected = db.connections[0].readyState === 1;
}

export async function disconnect(): Promise<void> {
  if (!connection.isConnected) {
    return;
  }

  await mongoose.disconnect();

  connection.isConnected = false;
}
