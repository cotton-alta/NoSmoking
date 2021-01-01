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

const insertDailyRecord = (date) => {
  const result = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `insert into daily (date, count) values (?, ?)`,
        [date, 0],
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

const updateDailyRecord = (date, count) => {
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

// 週初めの日付を取得
// input, output: 文字列Date("2020-01-01")
const getBeginningWeek = (date) => {
  let date_array = date.split("-");

  let date_obj = new Date(date_array[0], Number(date_array[1] - 1), date_array[2]);
  let date_week = date_obj.getDay();

  date_obj.setDate(date_obj.getDate() - date_week);

  let year = date_obj.getFullYear();
  let month = ("00" + (date_obj.getMonth() + 1)).slice(-2);
  let day = ("00" + date_obj.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};

// 第2引数: week, month, day
const getDailyRecord = (date, type) => {
  let date_array = date.split("-");
  let start_date;
  let end_date;

  switch(type) {
  case "day":
    start_date = getBeginningWeek(date);
    let start_date_array = start_date.split("-");
    let date_obj = new Date(start_date_array[0], Number(start_date_array[1]) - 1, start_date_array[2]);
    date_obj.setDate(date_obj.getDate() + 6);
    end_date = date_obj.getFullYear() + "-" + ("00" + (date_obj.getMonth() + 1)).slice(-2) + "-" + ("00" + date_obj.getDate()).slice(-2);
    break;
  case "month":
    start_date = date_array[0] + "-01-01";
    end_date = date_array[0] + "-12-31";
    break;
  case "week":
    let first_date = `${date_array[0]}-${date_array[1]}-01`;
    start_date = getBeginningWeek(first_date);

    let last_day = new Date(parseInt(date_array[0], 10), parseInt(date_array[1], 10), 0).getDate();
    let last_date = new Date(date_array[0], Number(date_array[1] - 1), last_day);
    let last_date_week = last_date.getDay();
    last_date.setDate(last_date.getDate() + 6 - last_date_week);
    let last_year = last_date.getFullYear();
    let last_month = last_date.getMonth() + 1;
    last_day = last_date.getDate();

    end_date = last_year + "-" + ("00" + last_month).slice(-2) + "-" + ("00" + last_day).slice(-2);
    break;
  }

  console.log(`type: ${type} \n start_date: ${start_date}, end_date: ${end_date}`);

  const array = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from daily where date between (?) and (?)`,
        [start_date, end_date],
        (_, {rows}) => {
          const rows_len = [...Array(rows.length).keys()];
          const rows_array = rows_len.map(i => rows.item(i));
          console.log("get record success");
          console.log("rows_array: ", rows_array);
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
  insertDailyRecord,
  updateDailyRecord,
  getDailyTable,
  getDailyRecord,
  deleteDailyTable
}
