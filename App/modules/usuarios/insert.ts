import { SQLiteDatabase } from 'expo-sqlite/next';

import { Usuarios } from './schema';
import { CryptoDigestAlgorithm, digestStringAsync } from 'expo-crypto';

export default async function InsertUsuario(data: Omit<Usuarios, 'id'>, db: SQLiteDatabase) {
  const usuario = await digestStringAsync(CryptoDigestAlgorithm.SHA256, data.usuario);
  const senha = await digestStringAsync(CryptoDigestAlgorithm.SHA256, data.senha);
  await db.runAsync(`INSERT INTO usuarios(usuario, senha) VALUES (?, ?)`, [usuario, senha]);
}
