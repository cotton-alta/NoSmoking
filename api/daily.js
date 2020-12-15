import * as SQLite from "expo-sqlite";

// DBに関する処理
const db = SQLite.openDatabase("db");

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists daily (id integer primary key not null, date text, count number)",
      null,
      () => {console.log("success")},
      () => {console.log("fail")}
    )
  });
};

const insertColumn = () => {
  let test = ["2020-12-10", 3];
  db.transaction(tx => {
    tx.executeSql(
      `insert into daily (date, count) values (?, ?)`,
      [test[0], test[1]],
      () => {console.log("success insert");},
      () => {console.log("fail insert");}
    )
  });
};

const getTable = () => {
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

// 第2引数: year, month, date
const getColumn = (data, type) => {
  // test用
  let start_date = "2020-12-01";
  let end_date = "2020-12-20";

  const array = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from daily where date between (?) and (?)`,
        [start_date, end_date],
        (_, {rows}) => {
          const rows_len = [...Array(rows.length).keys()];
          const rows_array = rows_len.map(i => rows.item(i));
          resolve(rows_array);
        },
        () => {console.log("get column fail");}
      );
    });
  });
  return array;
};

const deleteTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      "drop table daily",
      null,
      () => {console.log("delete success")},
      () => {console.log("delete fail")}
    )
  });
};

export {
  createTable,
  insertColumn,
  getTable,
  getColumn,
  deleteTable
}
