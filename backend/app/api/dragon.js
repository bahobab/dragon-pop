const { Router } = require("express");

const DragonTable = require("../dragon/table");
const AccountDragonTable = require("../accountDragon/table");
const { authenticatedAccount } = require("./helper");

const router = new Router();

// router.get("/dragons/:dragonId", (req, res, next) => {
//
// });

router.get("/new", (req, res, next) => {
  let accountId, dragon, myDragon;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      // authenticated user
      accountId = account.id;
      dragon = req.app.locals.engine.generation.newDragon(); // create a new dragon
      return DragonTable.storeDragon(dragon);
    })
    .then(({ dragonId }) => {
      dragon.dragonId = dragonId;
      // now store into accountDragon
      return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
    })
    .then(() => res.json({ dragon }))
    .catch(error => next(error));

  // DragonTable.storeDragon(newDragon)
  //   .then(dragonId => {
  //     // console.log("dragonId", dragonId);
  //     newDragon.dragonId = dragonId;

  //     res.json({
  //       dragon: newDragon
  //     });
  //   })
  //   .catch(error => next(error)); // hands over handling to next middleware
});

module.exports = router;
