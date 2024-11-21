import initDB from 'database/init-db';
import { SQLiteProvider } from 'expo-sqlite/next';
import AuthProvider from './auth-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SQLiteProvider databaseName="dengueDB.db" useSuspense onInit={initDB}>
      <AuthProvider>{children}</AuthProvider>
    </SQLiteProvider>
  );
}
