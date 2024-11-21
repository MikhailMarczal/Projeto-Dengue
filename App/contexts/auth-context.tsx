import ShowToast from 'components/toast';
import { useSQLiteContext } from 'expo-sqlite';
import { api } from 'infra/api';
import findUserByName from 'modules/usuarios/find-by-id';
import { createContext, useContext, useState } from 'react';
import { isConnected } from 'utils/is-connected';
import { offlineAuthentication } from 'utils/login-offline';
import onlineAuthentication from 'utils/login-online';

export type AuthDTO = {
  user: string;
  senha: string;
};

type AuthContextProps = {
  signIn(credentials: AuthDTO): Promise<void>;
  logout(): void;
  isAuthenticated: boolean;
  handleApiRequest: (callback: () => void) => void;
};
const AuthContext = createContext({} as AuthContextProps);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [inOfflineSession, setInOfflineSession] = useState(false);
  const [user, setUser] = useState<{ user: string; id: number } | null>();
  const db = useSQLiteContext();

  async function signIn(credentials: AuthDTO) {
    credentials = {
      user: credentials.user.trim(),
      senha: credentials.senha.trim(),
    };

    const hasConection = await isConnected();
    try {
      if (hasConection) {
        await onlineAuthentication(db, credentials);

        setInOfflineSession(false);
      } else {
        await offlineAuthentication(db, credentials);
        setInOfflineSession(true);
      }

      const userFromDb = await findUserByName(db, credentials.user);

      if (userFromDb) {
        return setUser({
          user: userFromDb.usuario,
          id: userFromDb.id,
        });
      }
    } catch (error: any) {
      ShowToast({ text: error.message });
      throw new Error();
    }
  }

  function logout() {
    api.defaults.headers.common.Authorization = '';
    setUser(null);
  }

  async function handleApiRequest(callback: () => void) {
    if (!(await isConnected())) {
      return ShowToast({ text: 'Conecte-se ao Wi-Fi para realizar a sincronização dos dados!!' });
    }
    callback();
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        logout,
        isAuthenticated: !!user,
        handleApiRequest,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
