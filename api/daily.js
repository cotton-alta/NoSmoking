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
const getDailyColumn = (date, type) => {
  let date_array = date.split("-");
  let start_date;
  let end_date;

  switch(type) {
    case "day":
      start_date = date_array[0] + "-" + date_array[1] + "-01";
      end_date = date_array[0] + "-" + date_array[1] + "-31";
      break;
    case "month":
      start_date = date_array[0] + "-01-01";
      end_date = date_array[0] + "-12-31";
      break;
    case "year":
      start_date = "2000-01-01";
      end_date = date;
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
          switch(type) {
            case "day":
              resolve(rows_array);
              break;
            case "month":
              const start = 1;
              const end = 12;
              const months = [...Array(end - start + 1).keys()].map(e => ("00" + (e + start)).slice(-2));
              let result_array = months.map(month => {
                return {date: month, count: 0};
              });
              rows_array.forEach(row => {
                const row_date = row.date.split("-");
                for(let i = 0; i < result_array.length; i++) {
                  if(result_array[i].date == row_date[1]) {
                    result_array[i].count += Number(row.count);
                    break;
                  }
                }
              });
              resolve(result_array);
              break;
            case "year":
              resolve(rows_array);
              break;
          }
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
