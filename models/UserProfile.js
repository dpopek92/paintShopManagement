const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  postcode: {
    type: String
  },
  NIP: {
    type: String
  },
  city: {
    type: String
  },
  street: {
    type: String
  },
  phone: {
    type: String
  },
  ordersNumber: {
    type: Number,
    default: 0,
    required: true
  },
  currentFreeOrderId: {
    type: Number,
    default: 1,
    required: true
  },
  subordinates: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        },
        name: {
          type: String
        }
      }
    ]
  },
  discounts: {
    manHour: {
      type: Number,
      default: 0
    },
    gloss: {
      oneSide: {
        type: Number,
        default: 0
      },
      bothSides: {
        type: Number,
        default: 0
      },
      oneGlossSecondSemigloss: {
        type: Number,
        default: 0
      }
    },
    semiGloss: {
      oneSide: {
        type: Number,
        default: 0
      },
      bothSides: {
        type: Number,
        default: 0
      }
    },
    customerMaterial: {
      gloss: {
        oneSide: {
          type: Number,
          default: 0
        },
        bothSides: {
          type: Number,
          default: 0
        },
        oneGlossSecondSemigloss: {
          type: Number,
          default: 0
        }
      },
      semiGloss: {
        oneSide: {
          type: Number,
          default: 0
        },
        bothSides: {
          type: Number,
          default: 0
        },
        mordant: {
          type: Number,
          default: 0
        },
        veneerColorless: {
          type: Number,
          default: 0
        }
      },
      milledElement: {
        type: Number,
        default: 0
      },
      milledElementBothSides: {
        type: Number,
        default: 0
      }
    },
    chamfering: {
      type: Number,
      default: 0
    },
    backMilling: {
      type: Number,
      default: 0
    },
    millingHandle: {
      type: Number,
      default: 0
    },
    paintHandle: {
      type: Number,
      default: 0
    },
    milledHandle: {
      type: Number,
      default: 0
    },
    milledPartHandle: {
      type: Number,
      default: 0
    },
    zobalHandle: {
      type: Number,
      default: 0
    },
    hingeHole: {
      type: Number,
      default: 0
    },
    milledElement: {
      type: Number,
      default: 0
    },
    milledElementBothSides: {
      type: Number,
      default: 0
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
        default: 0
      },
      25: {
        type: Number,
        default: 0
      },
      28: {
        type: Number,
        default: 0
      },
      30: {
        type: Number,
        default: 0
      },

      38: {
        type: Number,
        default: 0
      }
    }
  }
});

module.exports = UserProfile = mongoose.model("userProfile", UserProfileSchema);
