const pool = require("../../databasePool");
const DragonTraitTable = require("../dragonTrait/table");

class DragonTable {
  static storeDragon(dragon) {
    const { birthdate, nickname, generationId, isPublic, saleValue } = dragon;

    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO dragon(birthdate, nickname, "generationId", "isPublic", "saleValue")
        VALUES($1, $2, $3, $4, $5)
        RETURNING id`,
        [birthdate, nickname, generationId, isPublic, saleValue],
        (error, response) => {
          if (error) return reject(error);

          const dragonId = response.rows[0].id;

          // multiple promises involved here...
          // replace forEach with map for an array of promises
          Promise.all(
            dragon.traits.map(({ traitType, traitValue }) => {
              return DragonTraitTable.storeDragonTrait({
                dragonId,
                traitType,
                traitValue
              });
            })
          )
            .then(traitKeys => {
              resolve({ dragonId }); // return whole dragon object
            })
            .catch(error => reject(error));
        }
      );
    });
  }

  static getDragon({ dragonId }) {
    // select * from dragon INNER JOIN dragonTrait ON dragon.id = dragonTrait."dragonId" INNER JOIN trait ON dragonTrait."traitId" = trait.id;`,

    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT birthdate, nickname, "generationId", "isPublic", "saleValue"
                  FROM dragon
                  WHERE dragon.id = $1`,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);
          if (response.rowCount === 0)
            return reject(new Error("No Dragon Found"));
          resolve(response.rows[0]);
        }
      );
    });
  }

  static updateDragon({ dragonId, nickname, isPublic, saleValue }) {
    console.log("Table: update nickname", { nickname, dragonId });

    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE dragon
        SET nickname = $1, "isPublic" = $2, "saleValue" = $3
        WHERE id = $4`,
        [nickname, isPublic, saleValue, dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}

/*********** debugging code ********************/
/* by visiting http://localhost:3003/gragon/new ***/

// DragonTable.getDragon({ dragonId: 4 })
//   .then(dragon => console.log(">>>dragon", dragon))
//   .catch(error => console.log(">>>error", error));

module.exports = DragonTable;
