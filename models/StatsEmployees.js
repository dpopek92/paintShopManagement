const mongoose = require("mongoose");

const StatsEmployeesSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee"
  },
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  workedHours: {
    type: Number,
    default: 0
  },
  days: [
    {
      surówka: {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        selfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
          }
        ],
        notSelfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String },
            employees: [
              {
                id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
                name: { type: String }
              }
            ]
          }
        ],
        cncOneSide: {
          type: Number,
          default: 0
        },
        cncBothSides: {
          type: Number,
          default: 0
        },
        flatOneSide: {
          type: Number,
          default: 0
        },
        flatBothSides: {
          type: Number,
          default: 0
        }
      },
      podkład: {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        selfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
          }
        ],
        notSelfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String },
            employees: [
              {
                id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
                name: { type: String }
              }
            ]
          }
        ],
        cncOneSide: {
          type: Number,
          default: 0
        },
        cncBothSides: {
          type: Number,
          default: 0
        },
        flatOneSide: {
          type: Number,
          default: 0
        },
        flatBothSides: {
          type: Number,
          default: 0
        }
      },
      szlifiernia: {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        selfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
          }
        ],
        notSelfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String },
            employees: [
              {
                id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
                name: { type: String }
              }
            ]
          }
        ],
        cncOneSide: {
          type: Number,
          default: 0
        },
        cncBothSides: {
          type: Number,
          default: 0
        },
        flatOneSide: {
          type: Number,
          default: 0
        },
        flatBothSides: {
          type: Number,
          default: 0
        }
      },
      lakiernia: {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        selfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
          }
        ],
        notSelfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String },
            employees: [
              {
                id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
                name: { type: String }
              }
            ]
          }
        ],
        cncOneSide: {
          type: Number,
          default: 0
        },
        cncBothSides: {
          type: Number,
          default: 0
        },
        flatOneSide: {
          type: Number,
          default: 0
        },
        flatBothSides: {
          type: Number,
          default: 0
        }
      },
      polernia: {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        selfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
          }
        ],
        notSelfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String },
            employees: [
              {
                id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
                name: { type: String }
              }
            ]
          }
        ],
        cncOneSide: {
          type: Number,
          default: 0
        },
        cncBothSides: {
          type: Number,
          default: 0
        },
        flatOneSide: {
          type: Number,
          default: 0
        },
        flatBothSides: {
          type: Number,
          default: 0
        }
      },
      pakowanie: {
        timeStart: {
          type: Date
        },
        timeStop: {
          type: Date
        },
        selfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
          }
        ],
        notSelfMadeOrders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String },
            employees: [
              {
                id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
                name: { type: String }
              }
            ]
          }
        ],
        cncOneSide: {
          type: Number,
          default: 0
        },
        cncBothSides: {
          type: Number,
          default: 0
        },
        flatOneSide: {
          type: Number,
          default: 0
        },
        flatBothSides: {
          type: Number,
          default: 0
        }
      }
    }
  ]
});

module.exports = StatsEmployees = mongoose.model(
  "statsEmployees",
  StatsEmployeesSchema
);
