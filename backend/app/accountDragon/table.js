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
}

/******************* debugging code *****************/

// AccountDragonTable.storeAccountDragon({ accountId: 1, dragonId: 3 })
//   .then(() => console.log("created an accountDragon"))
//   .catch(e => console.log(e));

module.exports = AccountDragonTable;
