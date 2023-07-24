import * as SQLite from "expo-sqlite";
import { FormDataValues } from "../models/common.interface";

const db = SQLite.openDatabase("skills.db");

interface UpdateValues {
  key: string;
  value: string | number | boolean;
}

export const init = async () => {
  db.transactionAsync(
    (tx) =>
      new Promise((resolve, reject) => {
        tx.executeSqlAsync(
          `CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            progress DECIMAL NOT NULL,
            goal INTEGER NOT NULL,
            date TEXT NOT NULL,
            isarchive BOOLEAN NOT NULL DEFAULT false
        );`
        )
          .then(() => resolve())
          .catch((error) => reject(error));
      })
  );
};

export const addSkill = async (skill: FormDataValues) => {
  try {
    await db.transactionAsync(async (tx) => {
      try {
        await tx.executeSqlAsync(
          `INSERT INTO skills (title, progress, goal, date) VALUES (?, ?, ?, ?)`,
          [skill.title, +skill.progress, +skill.goal, skill.date]
        );
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// export const addSkillToDb = async (skill: FormDataValues) => {
//   let result: any;
//   console.log(skill);
//   await db.transactionAsync(
//     (tx) =>
//       new Promise((resolve, reject) => {
//         tx.executeSqlAsync(
//           `INSERT INTO skills (title, progress, goal, date) VALUES (?, ?, ?, ?)`,
//           [skill.title, +skill.progress, +skill.goal, skill.date]
//         )
//           .then((value) => {
//             result = value;
//             console.log(value);
//             resolve();
//           })
//           .catch((error) => {
//             console.log(error);
//             reject(error);
//           });
//       })
//   );

//   return result;
// };

export const getAllSkills = async () => {
  try {
    let result: any;

    await db.transactionAsync(async (tx) => {
      try {
        result = await tx.executeSqlAsync("SELECT * FROM skills");
      } catch (error) {
        console.log(error);
      }
    });

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteSkill = async (id: string) => {
  try {
    await db.transactionAsync(async (tx) => {
      try {
        await tx.executeSqlAsync("DELETE FROM skills WHERE id = ?", [id]);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// export const deleteSkillFromDb = async (id: string) => {
//   await db.transactionAsync(
//     (tx) =>
//       new Promise((resolve, reject) => {
//         tx.executeSqlAsync("DELETE FROM skills WHERE id = ?", [id])
//           .then(() => resolve())
//           .catch((error) => reject(error));
//       })
//   );
// };

export const updateSkill = async (id: string, values: UpdateValues[]) => {
  try {
    await db.transactionAsync(async (tx) => {
      try {
        await tx.executeSqlAsync(
          `UPDATE skills SET ${values.reduce(
            (acc, curr, index) =>
              `${index !== 0 ? "," : ""}${acc + curr.key} = ?`,
            ""
          )} WHERE id = ?`,
          [
            ...values.map((item) => {
              if (typeof item.value === "boolean") {
                return item.value ? 1 : 0;
              }
              return item.value;
            }),
            id,
          ]
        );
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {}
};

// export const updateSkillInDb = async (id: string, values: UpdateValues[]) => {
//   await db.transactionAsync(
//     (tx) =>
//       new Promise((resolve, reject) => {
//         tx.executeSqlAsync()
//           .then(() => resolve())
//           .catch((error) => reject(error));
//       })
//   );
// };
