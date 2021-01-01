import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Image, TextInput, StyleSheet, Text, View, Button, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CigarettesNumContext } from "../App";
import { LineChart } from "react-native-chart-kit";
import RNPickerSelect from "react-native-picker-select";

import { getDailyRecord } from "../api/daily";

const Graph = ({ navigation }) => {
  // const { state, dispatch } = useContext(CigarettesNumContext);
  const [currentDate, setCurrentDate] = useState("2020-01-01");
  const [viewLabel, setViewLabel] = useState([]);
  const [viewItem, setViewItem] = useState([]);
  const [viewType, setViewType] = useState("month");

  useEffect(() => {
    let current_date = new Date();
    let year = current_date.getFullYear();
    let month = current_date.getMonth() + 1;
    let day = current_date.getDate();
    current_date = year + "-" + month + "-" + day;
    setCurrentDate(current_date);

    getData(current_date, "month");

  }, []);

  useEffect(() => {console.log(viewLabel);}, [viewLabel]);

  const getData = async (date, type) => {
    const datas = await getDailyRecord(date, type);
    let result_array;

    switch(type) {
    case "month":
      const start = 1;
      const end = 12;
      const months = [...Array(end - start + 1).keys()].map(e => ("00" + (e + start)).slice(-2));

      result_array = months.map(month => {
        return { date: month, count: 0 };
      });

      datas.forEach(row => {
        const row_date = row.date.split("-");
        for(let i = 0; i < result_array.length; i++) {
          if(result_array[i].date == row_date[1]) {
            result_array[i].count += Number(row.count);
            break;
          }
        }
      });
      break;
    case "week":
      let date_array = date.split("-");
      const weeks = ["第1週", "第2週", "第3週", "第4週", "第5週"];
      result_array = weeks.map(week => {
        return { date: week, count: 0 };
      });
      let first_date = `${date_array[0]}-${date_array[1]}-01`;
      first_date = first_date.split("-");
      let first_year = Number(first_date[0]);
      let first_month = Number(first_date[1]);
      let first_day = Number(first_date[2]);
      let previous_last_day = new Date(parseInt(date_array[0], 10), parseInt(Number(date_array[1]) - 1, 10), 0).getDate();
      let current_last_day = new Date(parseInt(date_array[0], 10), parseInt(Number(date_array[1]), 10), 0).getDate();
      let year = first_year;
      let month = first_month;
      let day = first_day;
      let time_count = 0;
      for(let i = 0; i < 35; i++) {
        datas.forEach(row => {
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
          year++;
          month = 1;
        }
        time_count++;
      }
      break;
    case "day":
      result_array = datas.map(row => {
        const row_date = row.date.split("-");
        return { date: `${row_date[1]}/${row_date[2]}`, count: row.count };
      });
      break;
    }

    const labels = result_array.map(data => data.date);
    setViewLabel(labels);
    const items = result_array.map(data => data.count);
    setViewItem(items);
  };

  const changePeriod = () => {

  };

  const changeType = (type) => {
    setViewType(type);
  };

  const Header = () => {
    return (
      <TouchableOpacity
        style={styles.header_wrapper}
        onPress={() => navigation.navigate("HOME")}
      >
        <Text style={styles.header_text}>Graph</Text>
      </TouchableOpacity>
    );
  };

  const buttonColor = (type) => {
    if(viewType == type) {
      return { backgroundColor: "#C6E8E7" };
    } else {
      return { backgroundColor: "#90CECC" };
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scroll_container}
      >
        <View style={styles.button_wrapper}>
          <View
            style={[
              styles.button_day,
              buttonColor("day")
            ]}
            onClick={() => {
              changeType("day");
              getData(currentDate, "day");
            }}
          >
            <Text style={styles.button_text}>day</Text>
          </View>
          <View
            style={[
              styles.button_week,
              buttonColor("week")
            ]}
            onClick={() => {
              changeType("week");
              getData(currentDate, "week");
            }}
          >
            <Text style={styles.button_text}>week</Text>
          </View>
          <View
            style={[
              styles.button_month,
              buttonColor("month")
            ]}
            onClick={() => {
              changeType("month");
              getData(currentDate, "month");
            }}
          >
            <Text style={styles.button_text}>month</Text>
          </View>
        </View>
        <View style={styles.picker_wrapper}>
          <RNPickerSelect
            placeholder={{ label: "日付を選択", value: "" }}
            onValueChange={changePeriod}
            style={picker_style}
            items={[
              { label: "2020/12/07", value: "2020/12/07" },
              { label: "2020/12/08", value: "2020/12/08" },
              { label: "2020/12/09", value: "2020/12/09" },
            ]}
          />
        </View>
        <View style={styles.graph_wrapper}>
          <LineChart
            data={{
              // labels: ["1", "2", "3"],
              labels: viewLabel,
                datasets: [{
                  // data: [1, 4, 3]
                  data: viewItem
                }]
            }}
            width={300}
            height={300}
            yAxisLabel={"本"}
            chartConfig={{
              backgroundColor: "#FFF",
              backgroundGradientFrom: "#FFF",
              backgroundGradientTo: "#FFF",
              color: (opacity = 0.5) => `rgba(0, 0, 0, 0.5)`,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export {
  Graph
}

const picker_style = StyleSheet.create({
  inputIOS: {
    width: 200,
    height: 45,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10
  },
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center"
  },
  scroll_container: {
    width: "90%",
    justifyContent: "center"
  },
  scroll_wrapper: {
    width: 300,
    height: 300
  },
  header_wrapper: {
    width: "100%",
    height: 100,
    borderBottomColor: "#ededed",
    borderBottomWidth: 1,
    backgroundColor: "#90CECC",
    justifyContent: "flex-end"
  },
  header_text: {
    width: "20%",
    height: 70,
    lineHeight: 70,
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  button_wrapper: {
    flexDirection: "row",
    paddingTop: 10
  },
  button_day: {
    width: 100,
    height: 40,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  button_week: {
    width: 100,
    height: 40,
    borderRightWidth: 2,
    borderRightColor: "#FFF",
    borderLeftWidth: 2,
    borderLeftColor: "#FFF",
  },
  button_month: {
    width: 100,
    height: 40,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  button_text: {
    width: 100,
    height: 40,
    lineHeight: 40,
    textAlign: "center",
    color: "#FFF"
  },
  picker_wrapper: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  check_wrapper: {
    height: 58,
    width: "15%",
  },
  check_box: {
    height: 58,
    width: "100%",
    backgroundColor: "red"
  },
  check_img: {
    margin: 9,
    height: 40,
    width: 40
  }
});
