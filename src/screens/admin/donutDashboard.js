import { useActionSheet } from "@expo/react-native-action-sheet";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { getDonuts, getTopping } from "../../api";
import Item from "../../components/item";
import ItemSectionList from "../../components/itemSectionList";
import { itemSlice } from "../../store/itemSlice";

const DonutDashboard = ({ navigation }) => {
  const [donutData, setDonutData] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    fetchDonutData();
  }, []);

  useEffect(() => {
    fetchToppings();
  }, [donutData]);

  const fetchDonutData = async () => {
    getDonuts()
      .then((response) => {
        console.log("API response:", response.data);
        setDonutData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  const fetchToppings = async () => {
    getTopping()
      .then((response) => {
        console.log("API response:", response.data);
        const sections = [
          {
            title: "Donuts",
            data: donutData,
          },
          {
            title: "Topping",
            data: response.data,
          },
        ];
        setSections(sections);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  const showActionSheet = () => {
    const options = ["Add donut", "Add topping", "Cancel"];
    const cancelButtonIndex = 2;
    const handleActionSheetSelection = (buttonIndex) => {
      if (buttonIndex === 0) {
        dispatch(
          itemSlice.actions.setSelected({
            id: "",
            name: "",
            type: "donut",
            addEdit: "add",
          })
        );
        navigation.navigate("AddEditItem", { data: { name: "" } });
      } else if (buttonIndex === 1) {
        dispatch(
          itemSlice.actions.setSelected({
            id: "",
            name: "",
            type: "topping",
            addEdit: "add",
          })
        );
        navigation.navigate("AddEditItem", { data: { name: "" } });
      }
    };

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      handleActionSheetSelection
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={showActionSheet} title="Add" />,
    });
  }, [navigation]);

  const handleItemPress = (item, section) => {
    console.log("section here ");
    console.log(section);
    dispatch(
      itemSlice.actions.setSelected({
        id: item.id,
        name: item.name,
        type: section.title == "Donuts" ? "donut" : "topping",
        addEdit: "update",
      })
    );
    navigation.navigate("AddEditItem", { data: { name: item.name } });
  };

  const renderItem = ({ item, section }) => (
    <Item name={item.name} onTapped={() => handleItemPress(item, section)} />
  );

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ItemSectionList
        loading={loading}
        data={sections}
        renderHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionHeaderText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DonutDashboard;
