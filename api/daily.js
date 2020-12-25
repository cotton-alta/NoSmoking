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
  let date_obj = new Date(date_array[0], Number(date_array[1]) - 1, date_array[2]);

  switch(type) {
    case "day":
      start_date = date_array[0] + "-" + date_array[1] + "-01";
      end_date = date_array[0] + "-" + date_array[1] + "-31";
      break;
    case "month":
      start_date = date_array[0] + "-01-01";
      end_date = date_array[0] + "-12-31";
      break;
    case "week":
      let first_date = new Date(date_array[0], Number(date_array[1] - 1), 1);
      let first_date_week = first_date.getDay();
      first_date.setDate(first_date.getDate() - first_date_week);
      let first_year = first_date.getFullYear();
      let first_month = first_date.getMonth() + 1;
      let first_day = first_date.getDate();

      start_date = first_year + "-" + ("00" + first_month).slice(-2) + "-" + ("00" + first_day).slice(-2);

      let last_day = new Date(parseInt(date_array[0], 10), parseInt(date_array[1], 10), 0).getDate();
      let last_date = new Date(date_array[0], Number(date_array[1] - 1), last_day);
      let last_date_week = last_date.getDay();
      last_date.setDate(last_date.getDate() + 6 - last_date_week);
      let last_year = last_date.getFullYear();
      let last_month = last_date.getMonth() + 1;
      last_day = last_date.getDate();

      end_date = last_year + "-" + ("00" + last_month).slice(-2) + "-" + ("00" + last_day).slice(-2);
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
              // rows_array.forEach(row => {
              //   const row_date = row.date.split("-");
              //   // switch(row_date)
              // });
              // result_array = rows_array.map(row => {
              //   let date = ("00" + row.date.split("-")[1]).slice(-2) + "/" + ("00" + (row.date.split("-")[2])).slice(-2);
              //   return {date: date, count: row.count};
              // });
              resolve(rows_array);
              break;
            case "month":
              const start = 1;
              const end = 12;
              const months = [...Array(end - start + 1).keys()].map(e => ("00" + (e + start)).slice(-2));
              let result_array = months.map(month => {
                return { date: month, count: 0 };
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
            case "week":
              const weeks = ["第1週", "第2週", "第3週", "第4週", "第5週"];
              result_array = weeks.map(week => {
                return { date: week, count: 0 };
              });

              let first_date = new Date(date_array[0], Number(date_array[1] - 1), 1);
              let first_date_week = first_date.getDay();
              first_date.setDate(first_date.getDate() - first_date_week);
              let first_year = first_date.getFullYear();
              let first_month = first_date.getMonth() + 1;
              let first_day = first_date.getDate();

              let previous_last_day = new Date(parseInt(date_array[0], 10), parseInt(Number(date_array[1]) - 1, 10), 0).getDate();
              let current_last_day = new Date(parseInt(date_array[0], 10), parseInt(Number(date_array[1]), 10), 0).getDate();
              let year = first_year;
              let month = first_month;
              let day = first_day;
              let time_count = 0;
              for(let i = 0; i < 35; i++) {
                rows_array.forEach(row => {
                  let row_date = row.date.split("-").map(a => Number(a));
                  if(month == row_date[1] && day == row_date[2]) {
                    let week_name;
                    if(time_count < 7) {
                      week_name = "第1週";
                    } else if(time_count < 14) {
                      week_name = "第2週";
                    } else if(time_count < 21) {
                      week_name = "第3週";
                    } else if(time_count < 28) {
                      week_name = "第4週";
                    } else {
                      week_name = "第5週";
                    }
                    result_array.forEach(week => {
                      if(week.date == week_name) week.count += row.count;
                    });
                  }
                });
                day++;
                if(month == first_month && day > previous_last_day) {
                  month++;
                  day = 1;
                } else if(month > first_month && day > current_last_day) {
                  month++;
                  day = 1;
                }
                if(month > 12) {
                  month = 1;
                }
                time_count++;
              }

              resolve(result_array);
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
