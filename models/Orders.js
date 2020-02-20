const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  manHours: {
    hours: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      default: 0
    }
  },
  isPaintOrdered: {
    type: Boolean,
    default: false
  },
  forwardToGriding: {
    type: Number,
    default: 0
  },
  reasonOfComplaint: {
    type: String
  },
  isLostElements: {
    type: Boolean,
    default: false
  },
  isNut: {
    type: Boolean,
    default: false
  },
  isFelc: {
    type: Boolean,
    default: false
  },
  isChamfering: {
    type: Boolean,
    default: false
  },
  isLeftSidesInProduction: {
    type: Boolean,
    default: false
  },
  isMailToCustomer: {
    type: Number
  },
  dateSendToCNC: {
    type: Date
  },
  isBackFromCNC: {
    type: Boolean
  },
  updateHistory: {
    type: Array,
    default: []
  },
  pickUpDate: {
    type: Date
  },
  pickedUpElements: {
    type: Number
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  lastOperation: {
    date: { type: Date },
    position: { type: String }
  },
  isHalfGriding: {
    type: Boolean,
    default: false
  },
  wasInGriding: {
    type: Boolean,
    default: false
  },
  productionHistory: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      desc: {
        type: String,
        required: true
      },
      time: {
        type: Date
      },
      position: {
        type: String,
        required: true
      },
      employees: []
    }
  ],
  number: {
    type: String,
    required: true
  },
  orderType: {
    type: String
  },
  name: {
    type: String,
    lowercase: true,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  finishDate: {
    type: String,
    required: true
  },
  productionFinishDate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Wysłane"
  },
  priority: {
    type: Boolean,
    default: false
  },
  inProduction: {
    type: Array,
    default: []
  },
  isReadyToPickUp: {
    type: Boolean,
    default: false
  },
  employeesComments: [
    {
      position: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      comment: {
        type: String
        // required: true
      }
    }
  ],
  production: {
    surówka: [
      {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        employees: {
          type: [mongoose.Schema.Types.ObjectId]
        }
      }
    ],
    podkład: [
      {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        employees: {
          type: [mongoose.Schema.Types.ObjectId]
        }
      }
    ],
    szlifiernia: [
      {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        employees: {
          type: [mongoose.Schema.Types.ObjectId]
        }
      }
    ],
    lakiernia: [
      {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        employees: {
          type: [mongoose.Schema.Types.ObjectId]
        }
      }
    ],
    polernia: [
      {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        employees: {
          type: [mongoose.Schema.Types.ObjectId]
        }
      }
    ],
    pakowanie: [
      {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        employees: {
          type: [mongoose.Schema.Types.ObjectId]
        }
      }
    ]
  },
  productionStatus: {
    type: String,
    default: "Wysłane"
  },
  color: {
    type: String,
    required: true
  },
  paintMaker: {
    type: String,
    default: ""
  },
  paintMakerBase: {
    type: String,
    default: ""
  },
  paintType: {
    type: String,
    required: true,
    default: ""
  },
  paintStyle: {
    type: String,
    required: true,
    default: ""
  },
  millingSymbol: {
    type: String,
    default: ""
  },
  customMilling: {
    path: {
      type: String
    },
    file: { type: mongoose.Schema.Types.Mixed }
  },
  glassCaseSymbol: {
    type: String,
    default: ""
  },
  veneerSymbol: {
    type: String,
    default: ""
  },
  handleSymbol1: {
    type: String,
    default: ""
  },
  handleSymbol2: {
    type: String,
    default: ""
  },
  isFlat: {
    type: Boolean,
    default: true
  },
  comments: {
    type: String,
    default: ""
  },
  elements: {
    type: Number,
    required: true
  },
  surfaceRight: {
    type: Number,
    default: 0
  },
  surfaceCNC: {
    type: Number
  },
  surfaceLeft: {
    type: Number,
    default: 0
  },
  chamfering: {
    type: Number,
    default: ""
  },
  backMilling: {
    type: Number,
    default: ""
  },
  milledHandle: {
    type: Number,
    default: ""
  },
  milledPartHandle: {
    type: Number,
    default: ""
  },
  hingesHoles: {
    type: Number,
    default: ""
  },
  price: {
    type: Number
    // required: true
  },
  images: {
    type: Boolean,
    default: false
  },

  items: [
    {
      id: {
        type: Number
        // required: true
      },
      image: {
        path: {
          type: String
        },
        file: { type: mongoose.Schema.Types.Mixed }
      },
      type: {
        type: String,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      w1PEdge: {
        type: String,
        required: true
      },
      w2PEdge: {
        type: String,
        required: true
      },
      w1LEdge: {
        type: String,
        required: true
      },
      w2LEdge: {
        type: String,
        required: true
      },
      wLPaintedEdge: {
        type: Boolean,
        default: false
      },
      height: {
        type: Number,
        required: true
      },
      h1PEdge: {
        type: String,
        required: true
      },
      h2PEdge: {
        type: String,
        required: true
      },
      h1LEdge: {
        type: String,
        required: true
      },
      h2LEdge: {
        type: String,
        required: true
      },
      hLPaintedEdge: {
        type: Boolean,
        default: false
      },
      paintRight: {
        type: Boolean,
        default: true
      },
      paintLeft: {
        type: Boolean,
        default: false
      },
      surfaceRight: {
        type: Number,
        default: 0
      },
      surfaceLeft: {
        type: Number,
        default: 0
      },
      milledHandle: {
        type: Number,
        default: ""
      },
      thickness: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      },
      comments: {
        type: String,
        default: ""
      },
      includedToPrice: {
        type: Boolean,
        required: true
      },
      elementLost: {
        position: { type: String },
        quantity: { type: Number }
      },
      elementToCorrect: {
        position: { type: String },
        quantity: { type: Number }
      }
    }
  ]
});

module.exports = Order = mongoose.model("order", OrderSchema);
