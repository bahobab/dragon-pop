const { Router } = require("express");

const AccountTable = require("../account/table");
const DragonTable = require("../dragon/table");
const AccountDragonTable = require("../accountDragon/table");
const { authenticatedAccount } = require("./helper");
const { getPublicDragons } = require("../dragon/helper");

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

router.put("/update", (req, res, next) => {
  console.log("/update", req.body);

  const { nickname, dragonId, isPublic, saleValue, sireValue } = req.body;

  DragonTable.updateDragon({
    nickname,
    dragonId,
    isPublic,
    saleValue,
    sireValue
  })
    .then(() => res.json({ message: "Dragon nickname successfuly updated" }))
    .catch(error => next(error));
});

router.get("/public-dragons", (req, res, next) => {
  getPublicDragons()
    .then(({ dragons }) => res.json({ dragons }))
    .catch(error => next(error));
});

router.post("/buy", (req, res, next) => {
  const { dragonId, saleValue } = req.body;
  let buyerId;

  DragonTable.getDragon({ dragonId })
    .then(dragon => {
      if (dragon.saleValue !== Number(saleValue))
        throw new Error("Sale value incorrect!");

      if (!dragon.isPublic) throw new Error("Dragon must be public");

      return authenticatedAccount({ sessionString: req.cookies.sessionString });
    })
    .then(({ account, authenticated }) => {
      if (!authenticated) throw new Error("Unauthenticated");

      if (saleValue > account.balance)
        throw new Error("Sale value exceeds account balance");

      // set the id of the buyer
      buyerId = account.id;

      // get the id of the buyer from the dragon
      return AccountDragonTable.getdragonAccount({ dragonId });
    })
    .then(({ accountId }) => {
      // set the seller's id
      const sellerId = Number(accountId);
      if (buyerId === sellerId)
        throw new Error("You cannot buy your own dragon!");

      // buying transaction
      return Promise.all([
        AccountTable.updateAccountBalance({
          accountId: buyerId,
          value: -saleValue
        }),
        AccountTable.updateAccountBalance({
          accountId: sellerId,
          value: saleValue
        }),
        AccountDragonTable.updateDragonAccount({
          dragonId,
          accountId: buyerId
        }),
        DragonTable.updateDragon({ dragonId, isPublic: false })
      ]);
    })
    .then(() => res.json({ message: "Success" }))
    .catch(error => next(error));
});
module.exports = router;
