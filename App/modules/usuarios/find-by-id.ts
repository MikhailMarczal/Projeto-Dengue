import { CryptoDigestAlgorithm, digestStringAsync } from 'expo-crypto';
import { SQLiteDatabase } from 'expo-sqlite/next';

import { Usuarios } from './schema';

export default async function findUserByName(db: SQLiteDatabase, nome: string) {
  const newNome = await digestStringAsync(CryptoDigestAlgorithm.SHA256, nome);
  const user = await db.getFirstAsync<Omit<Usuarios, 'senha'>>(
    'SELECT usuario, id FROM usuarios WHERE usuario = ?',
    [newNome]
  );

  return user;
}
