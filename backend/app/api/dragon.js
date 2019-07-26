const { Router } = require("express");

const DragonTable = require("../dragon/table");

const router = new Router();

// router.get("/dragons/:dragonId", (req, res, next) => {
//
// });

router.get("/new", (req, res, next) => {
  const newDragon = req.app.locals.engine.generation.newDragon();
  DragonTable.storeDragon(newDragon)
    .then(dragonId => {
      // console.log("dragonId", dragonId);
      newDragon.dragonId = dragonId;

      res.json({
        dragon: newDragon
      });
    })
    .catch(error => next(error)); // hands over handling to next middleware
});

module.exports = router;
