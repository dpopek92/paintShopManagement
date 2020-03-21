const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  type: {
    type: String,
    default: "nowe"
  },
  date: {
    type: Date,
    default: Date.now
  },
  finishDate: {
    type: Date,
    required: true
  },
  pickUpDate: {
    type: Date
  },
  number: {
    type: Number,
    required: true
  },
  name: {
    type: String
  },
  commnets: {
    type: String
  },
  productionComments: [
    {
      date: {
        type: Date
      },
      user: {
        type: String
      },
      comment: {
        type: String
      }
    }
  ],
  status: {
    type: String,
    default: "wysłane"
  },
  color: {
    type: String,
    required: true
  },
  paintType: {
    type: String,
    required: true
  },
  paintStyle: {
    type: String,
    required: true
  },
  millingSymbol: {
    type: String
  },
  customMilling: {
    path: {
      type: String
    },
    file: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  glassCaseSymbol: {
    type: String
  },
  handleSymbol1: {
    type: String
  },
  handleSymbol2: {
    type: String
  },
  veneerSymbol: {
    type: String
  },
  elements: {
    type: Number,
    required: true
  },
  pickedUpElements: {
    type: Number
  },
  isReadyToPickUp: {
    type: Boolean,
    default: false
  },
  surfacePL: {
    type: Number
  },
  surfacePP: {
    type: Number
  },
  surfaceCNC: {
    type: Number
  },
  milledHandle: {
    type: Number
  },
  backMilling: {
    type: Number
  },
  chamfering: {
    type: Number
  },
  hingeHoles: {
    type: Number
  },
  milledPartHandle: {
    type: Number
  },
  price: {
    type: Number,
    default: 0
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  isMailToCustomer: {
    type: Number,
    default: 0
  },
  paintProducer: {
    type: String
  },
  baseProducer: {
    type: String
  },
  priority: {
    type: Boolean,
    default: false
  },
  isPaintOrdered: {
    type: Boolean,
    default: true
  },
  manHours: {
    hours: {
      type: Number
    },
    price: {
      type: Number
    }
  },
  reasonOfComplaint: {
    type: String
  },
  updateHistory: [
    {
      user: {
        type: String
      },
      date: {
        type: Date
      },
      key: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  items: [
    {
      type: {
        type: String,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      h1P: {
        type: String,
        required: true
      },
      h2P: {
        type: String,
        required: true
      },
      h1L: {
        type: String,
        required: true
      },
      h2L: {
        type: String,
        required: true
      },
      hLPaintedEdge: {
        type: Boolean,
        required: true
      },

      width: {
        type: Number,
        required: true
      },
      w1P: {
        type: String,
        required: true
      },
      w2P: {
        type: String,
        required: true
      },
      w1L: {
        type: String,
        required: true
      },
      w2L: {
        type: String,
        required: true
      },
      wLPaintedEdge: {
        type: Boolean,
        required: true
      },
      paintRight: {
        type: Boolean,
        required: true
      },
      paintLeft: {
        type: Boolean,
        required: true
      },
      surfaceRight: {
        type: Number
      },
      surfaceLeft: {
        type: Number
      },
      milledHandle: {
        type: Number
      },
      thickness: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      comments: {
        type: String
      },
      includedToPrice: {
        type: Boolean,
        default: true
      },
      image: {
        path: {
          type: String
        },
        file: {
          type: mongoose.Schema.Types.Mixed
        }
      }
    }
  ]
});

module.exports = Order = mongoose.model("order", OrderSchema);
