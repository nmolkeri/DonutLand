import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { deleteItem, patchItem, postItem } from "../../api";
import DonutLandButton from "../../components/dButton";
import { generateUUID } from "../../utils";

const AddEditItem = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const id = useSelector((state) => state.item.selectedProductId);
  const type = useSelector((state) => state.item.type);
  const updateAdd = useSelector((state) => state.item.addEdit);

  useEffect(() => {
    const data = route.params.data;
    setName(data.name);
  }, [route.params.data]);

  const sendDataToAPI = async (data) => {
    try {
      if (updateAdd == "add") {
        await postItem(type, data);
        navigation.goBack();
      } else if (updateAdd == "update") {
        await patchItem(type, data.id, data);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const deleteData = async () => {
    await deleteItem(type, id)
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
    navigation.goBack();
  };

  const handleSubmit = () => {
    const data = {
      id: id == "" ? generateUUID(32) : id,
      name: name,
    };
    sendDataToAPI(data);
    console.log(data);
    navigation.goBack();
  };

  const displayDelete = updateAdd == "update" ? "flex" : "none";

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Donut name</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter item name"
        style={styles.input}
      />
      <DonutLandButton title={updateAdd} onPress={handleSubmit} />
      <DonutLandButton
        title="Delete"
        onPress={deleteData}
        isVisible={displayDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
});

export default AddEditItem;