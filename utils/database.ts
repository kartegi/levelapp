import * as SQLite from "expo-sqlite";
import { FormDataValues } from "../models/common.interface";

const db = SQLite.openDatabase("skills.db");

export const init = async () => {
  db.transactionAsync(
    (tx) =>
      new Promise((resolve, reject) => {
        tx.executeSqlAsync(
          `CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            progress DECIMAL NOT NULL,
            goal INTEGER NOT NULL)`
        )
          .then(() => resolve())
          .catch((error) => reject(error));
      })
  );
};

export const addSkillToDb = async (skill: FormDataValues) => {
  let result: any;

  await db.transactionAsync(
    (tx) =>
      new Promise((resolve, reject) => {
        tx.executeSqlAsync(
          `INSERT INTO skills (title, progress, goal) VALUES (?, ?, ?)`,
          [skill.title, +skill.progress, +skill.goal]
        )
          .then((value) => {
            result = value;
            resolve();
          })
          .catch((error) => reject(error));
      })
  );

  return result;
};

export const getAllSkillsFromDb = async () => {
  let result: any;

  await db.transactionAsync(
    (tx) =>
      new Promise((resolve, reject) => {
        tx.executeSqlAsync("SELECT * FROM skills")
          .then((value) => {
            result = value;
            resolve();
          })
          .catch((error) => reject(error));
      })
  );

  return result;
};
