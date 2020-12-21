import * as SQLite from "expo-sqlite";

// DBに関する処理
const db = SQLite.openDatabase("db");

const createDailyTable = () => {
  const result = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists daily (id integer primary key not null, date text, count number)",
        null,
        () => {
          console.log("table create success")
          resolve(true);
        },
        () => {console.log("fail")}
      )
    });
  });
  return result;
};

const insertDailyColumn = (date) => {
  let test = ["2020-12-10", 3];

  const result = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `insert into daily (date, count) values (?, ?)`,
        [date, 5],
        () => {
          console.log("success insert");
          resolve(true);
        },
        () => {console.log("fail insert");}
      )
    });
  });
  return result;
};

const updateDailyColumn = (date, count) => {
  const result = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `update daily set count = ? where date = ?`,
        [count, date],
        () => {
          console.log("success update");
          resolve(true);
        },
        () => {console.log("fail update");}
      )
    });
  });
  return result;
};

const getDailyTable = () => {
  const array = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "select * from daily",
        null,
        (_, {rows}) => {
          const rows_len = [...Array(rows.length).keys()];
          const rows_array = rows_len.map(i => rows.item(i));
          resolve(rows_array);
        }
      );
    });
  });
  return array;
};

// 第2引数: year, month, day
const getDailyColumn = (data, type) => {
  // test用
  // let start_date = "2020-12-01";
  // let end_date = "2020-12-20";

  let start_date;
  let end_date;

  if(type == "day") {
    start_date = data;
    end_date = data;
  }

  const array = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from daily where date between (?) and (?)`,
        [start_date, end_date],
        (_, {rows}) => {
          const rows_len = [...Array(rows.length).keys()];
          const rows_array = rows_len.map(i => rows.item(i));
          console.log("get column success");
          resolve(rows_array);
        },
        () => {console.log("get column fail");}
      );
    });
  });
  return array;
};

const deleteDailyTable = () => {
  const result = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "drop table daily",
        null,
        () => {
          console.log("delete success")
          resolve(true);
        },
        () => {console.log("delete fail")}
      )
    });
  });
  return result;
};

export {
  createDailyTable,
  insertDailyColumn,
  updateDailyColumn,
  getDailyTable,
  getDailyColumn,
  deleteDailyTable
}
