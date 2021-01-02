import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const ConfigCard = (props) => {
  return (
    <TouchableOpacity style={[styles.card_wrapper, props.layout]}>
      <Text style={styles.card_text}>{props.title}</Text>
      <Image
        source={require("../assets/right.png")}
        style={styles.card_img}
      />
    </TouchableOpacity>
  );
};

const ConfigSection = (props) => {
  const section_len = props.sections.content.length;
  return (
    <View style={props.styles}>
    <Text style={styles.section_headline}>{props.sections.headline}</Text>
    {props.sections.content.map((card, i) => {
      let style;
      if(i == 0) {
        style = {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        };
      } else if(i == section_len - 1) {
        style = {
          borderBottomWidth: 1,
          borderBottomColor: "#ededed",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        };
      }
      return (
        <ConfigCard layout={style} key={card.title} title={card.title} to={card.to} />
      )
    })}
    </View>
  );
};

const styles = StyleSheet.create({
  card_wrapper: {
    width: "100%",
    height: 50,
    borderTopWidth: 1,
    borderTopColor: "#ededed",
    borderLeftWidth: 1,
    borderLeftColor: "#ededed",
    borderRightWidth: 1,
    borderRightColor: "#ededed",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  card_text: {
    height: 50,
    lineHeight: 50,
    marginLeft: 15
  },
  card_img: {
    width: 25,
    height: 25,
    marginRight: 15
  },
  section_headline: {
    height: 30,
    lineHeight: 30,
    marginLeft: 10,
    fontSize: 18
  }
});

export {
  ConfigSection
}
