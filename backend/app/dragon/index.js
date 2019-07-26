const TRAITS = require("../../data/traits.json");
const DragonTable = require("./table");

const DEFAULT_PROPERTIES = {
  dragonId: undefined,
  nickname: "undefined",
  generationId: undefined,

  get birthdate() {
    return new Date().toLocaleDateString();
  },

  get randomTrait() {
    const traits = [];
    TRAITS.forEach(TRAIT => {
      const traitType = TRAIT.type;
      const traitValues = TRAIT.values;

      const traitValue =
        traitValues[Math.floor(Math.random() * traitValues.length)];

      traits.push({ traitType, traitValue });
    });
    return traits;
  }
};

class Dragon {
  constructor({ dragonId, birthdate, nickname, traits, generationId } = {}) {
    this.dragonId = dragonId || DEFAULT_PROPERTIES.dragonId;
    this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.traits = traits || DEFAULT_PROPERTIES.randomTrait;
    this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
  }

  buildDragon() {}
}

module.exports = Dragon;
