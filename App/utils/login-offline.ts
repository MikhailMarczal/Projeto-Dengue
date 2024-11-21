import { AuthDTO } from 'contexts/auth-context';
import { CryptoDigestAlgorithm, digestStringAsync } from 'expo-crypto';
import { SQLiteDatabase } from 'expo-sqlite/next';
import { Usuarios } from 'modules/usuarios/schema';

export async function offlineAuthentication(db: SQLiteDatabase, { user, senha }: AuthDTO) {
  user = await digestStringAsync(CryptoDigestAlgorithm.SHA256, user);
  senha = await digestStringAsync(CryptoDigestAlgorithm.SHA256, senha);
  const usuario = await db.getFirstAsync<Usuarios>('SELECT * FROM usuarios WHERE usuario = ?', [
    user,
  ]);

  if (!usuario || usuario.senha !== senha) throw new Error('Usuário ou senha inválidos');
}
