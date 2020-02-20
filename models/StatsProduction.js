const mongoose = require("mongoose");

const StatsProductionSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  days: [
    {
      nowe: {
        orders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
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
      surówka: {
        employees: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
            name: { type: String }
          }
        ],
        orders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
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
        },
        corrections: {
          type: Number,
          default: 0
        },
        correctionsData: {
          reasons: {
            particle: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            mechanicalDamage: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            bruise: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            badlyPainted: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            leftSide: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            polishingHole: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            damagedLaminate: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            other: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            }
          },
          surface: {
            type: Number,
            default: 0
          }
        }
      },
      podkład: {
        employees: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
            name: { type: String }
          }
        ],
        orders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
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
        },
        corrections: {
          type: Number,
          default: 0
        },
        correctionsData: {
          reasons: {
            particle: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            mechanicalDamage: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            bruise: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            badlyPainted: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            leftSide: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            polishingHole: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            damagedLaminate: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            other: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            }
          },
          surface: {
            type: Number,
            default: 0
          }
        }
      },
      szlifiernia: {
        employees: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
            name: { type: String }
          }
        ],
        orders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
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
        },
        corrections: {
          type: Number,
          default: 0
        },
        correctionsData: {
          reasons: {
            particle: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            mechanicalDamage: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            bruise: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            badlyPainted: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            leftSide: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            polishingHole: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            damagedLaminate: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            other: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            }
          },
          surface: {
            type: Number,
            default: 0
          }
        }
      },
      lakiernia: {
        employees: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
            name: { type: String }
          }
        ],
        orders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
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
        },
        corrections: {
          type: Number,
          default: 0
        },
        correctionsData: {
          reasons: {
            particle: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            mechanicalDamage: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            bruise: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            badlyPainted: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            leftSide: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            polishingHole: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            damagedLaminate: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            other: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            }
          },
          surface: {
            type: Number,
            default: 0
          }
        }
      },
      polernia: {
        employees: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
            name: { type: String }
          }
        ],
        orders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
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
        },
        corrections: {
          type: Number,
          default: 0
        },
        correctionsData: {
          reasons: {
            particle: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            mechanicalDamage: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            bruise: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            badlyPainted: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            leftSide: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            polishingHole: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            damagedLaminate: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            other: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            }
          },
          surface: {
            type: Number,
            default: 0
          }
        }
      },
      pakowanie: {
        employees: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
            name: { type: String }
          }
        ],
        orders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
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
        },
        corrections: {
          type: Number,
          default: 0
        },
        correctionsData: {
          reasons: {
            particle: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            mechanicalDamage: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            bruise: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            badlyPainted: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            leftSide: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            polishingHole: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            damagedLaminate: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            },
            other: {
              surface: {
                type: Number,
                default: 0
              },
              elements: {
                type: Number,
                default: 0
              }
            }
          },
          surface: {
            type: Number,
            default: 0
          }
        }
      },
      odebrane: {
        orders: [
          {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
            desc: { type: String }
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

module.exports = StatsProduction = mongoose.model(
  "statsProduction",
  StatsProductionSchema
);
