const pool = require("../../databasePool");

class AccountDragonTable {
  static storeAccountDragon({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO accountDragon ("accountId", "dragonId")
                VALUES($1, $2)`,
        [accountId, dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  static getAcountDragon({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "dragonId"
        FROM accountDragon
        WHERE "accountId"=$1`,
        [accountId],
        (error, response) => {
          if (error) return reject(error);

          resolve({ accountDragons: response.rows });
        }
      );
    });
  }
}

/******************* debugging code *****************/

// AccountDragonTable.storeAccountDragon({ accountId: 1, dragonId: 3 })
//   .then(() => console.log("created an accountDragon"))
//   .catch(e => console.log(e));

// AccountDragonTable.getAcountDragon({ accountId: 1 })
//   .then(({ accountDragons }) => console.log(accountDragons))
//   .catch(error => console.log(error));

module.exports = AccountDragonTable;
