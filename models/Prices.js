const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "global"
  },
  manHour: {
    type: Number,
    default: 50
  },
  gloss: {
    oneSide: {
      type: Number,
      default: 300
    },
    bothSides: {
      type: Number,
      default: 470
    },
    oneGlossSecondSemigloss: {
      type: Number,
      default: 390
    }
  },
  semiGloss: {
    oneSide: {
      type: Number,
      default: 200
    },
    bothSides: {
      type: Number,
      default: 290
    }
  },
  customerMaterial: {
    gloss: {
      oneSide: {
        type: Number,
        default: 250
      },
      bothSides: {
        type: Number,
        default: 420
      },
      oneGlossSecondSemigloss: {
        type: Number,
        default: 340
      }
    },
    semiGloss: {
      oneSide: {
        type: Number,
        default: 150
      },
      bothSides: {
        type: Number,
        default: 220
      },
      mordant: {
        type: Number,
        default: 220
      },
      veneerColorless: {
        type: Number,
        default: 160
      }
    },
    milledElement: {
      type: Number,
      default: 280
    },
    milledElementBothSides: {
      type: Number,
      default: 370
    }
  },
  chamfering: {
    type: Number,
    default: 15
  },
  backMilling: {
    type: Number,
    default: 5
  },
  milledHandle: {
    type: Number,
    default: 39
  },
  milledPartHandle: {
    type: Number,
    default: 50
  },
  millingHandle: {
    type: Number,
    default: 15
  },
  paintHandle: {
    type: Number,
    default: 25
  },
  zobalHandle: {
    type: Number,
    default: 15
  },
  hingeHole: {
    type: Number,
    default: 3.5
  },
  milledElement: {
    type: Number,
    default: 350
  },
  milledElementBothSides: {
    type: Number,
    default: 440
  },
  board: {
    3: {
      type: Number,
      default: 0
    },
    6: {
      type: Number,
      default: 0
    },
    8: {
      type: Number,
      default: 0
    },
    10: {
      type: Number,
      default: 0
    },
    12: {
      type: Number,
      default: 0
    },
    16: {
      type: Number,
      default: 0
    },
    18: {
      type: Number,
      default: 0
    },
    19: {
      type: Number,
      default: 0
    },
    22: {
      type: Number,
      default: 30
    },
    25: {
      type: Number,
      default: 50
    },
    28: {
      type: Number,
      default: 70
    },
    30: {
      type: Number,
      default: 90
    },
    38: {
      type: Number,
      default: 129
    }
  }
});

module.exports = Price = mongoose.model("price", PriceSchema);
