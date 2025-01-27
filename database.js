import Sequalize from "sequelize";
const { DataTypes, Op } = Sequalize;

const sequelize = new Sequalize("gyakorlas", "admin", "admin", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Student = sequelize.define("student", {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    min: 4,
    max: 20,
  },
  favourite_class: {
    type: DataTypes.STRING,
    defaultValue: "Computer Science",
    max: 25,
  },
  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    min: 1,
    max: 13,
  },
  has_language_exam: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

sequelize.sync().then(() => {
  Student.bulkCreate([
    {
      name: "John Doe",
      school_year: 12,
      has_language_exam: true,
    },
    {
      name: "Jane Doe",
      school_year: 10,
      has_language_exam: false,
    },
    {
      name: "Alice Doe",
      school_year: 9,
      has_language_exam: false,
    },
  ]);
});

function feladatA() {
    return Student.findAll({
        where: {
            [Op.or]: [
                { favourite_class: "Computer Science" },
                { has_language_exam: true }
            ]
        }
    })
};

function feladatB() {
    return Student.findAll({
        attributes: [
            "school_year",
            [Sequalize.fn("COUNT", Sequalize.col("school_year")), "num_students"]
        ],
        group: ["school_year"],
        order: ["school_year"]
    });
}

feladatA();
feladatB();