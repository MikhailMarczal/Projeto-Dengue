import { SQLiteDatabase } from 'expo-sqlite/next';

import { V1 } from './v1';

export default async function initDB(db: SQLiteDatabase) {
  //Ao atualizar o banco do aplicativo (em produção), adicionar outro execAsync das outras mudanças do banco de dados.
  // Criar também outro arquivo com os comandos necessários para atualizar o banco, caso contrário, será necessário limpar os dados do app de cada celular para atualizar o banco.
  await db.execAsync(V1);

  await db.execAsync('PRAGMA journal_mode = WAL');
  await db.execAsync('PRAGMA foreign_keys = ON');
}
