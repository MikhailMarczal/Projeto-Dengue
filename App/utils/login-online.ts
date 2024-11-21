import { AxiosError } from 'axios';
import { AuthDTO } from 'contexts/auth-context';
import { SQLiteDatabase } from 'expo-sqlite/next';
import { api } from 'infra/api';
import findUserByName from 'modules/usuarios/find-by-id';
import InsertUsuario from 'modules/usuarios/insert';

export default async function onlineAuthentication(db: SQLiteDatabase, { senha, user }: AuthDTO) {
  return await api
    .post('/rpc/auth', { login: user, senha })
    .then(async (response) => {
      const token = response.data;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const existingUser = await findUserByName(db, user);
      if (!existingUser)
        await InsertUsuario(
          {
            usuario: user,
            senha,
          },
          db
        );
      return token;
    })
    .catch(() => {
      throw new Error('Algo deu errado, tente novamente mais tarde!');
    });
}
