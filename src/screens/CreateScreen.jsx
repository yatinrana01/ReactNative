import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
  Text,
  View,
} from "react-native";

const CreateScreen = ({ data, setdata }) => {
  const [itemName, setItemName] = useState("");
  const [stock, setStock] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const handlerAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: parseInt(stock),
    };
    setdata([...data, newItem]);
    setItemName("");
    setStock("");
    setIsEdit(false);
  };

  const deleteItemHandler = (id) => {
    setdata(data.filter((item) => item.id !== id));
  };

  const editItemHandler = (item) => {
    setIsEdit(true);
    setItemName(item.name);
    setEditItemId(item.id);
  };

  const updateItemHandler = () => {
    setdata(
      data.map((item) =>
        item.id === editItemId
          ? { ...item, name: itemName, stock: parseInt(stock) }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter an item name..."
        placeholderTextColor="#999"
        style={styles.input}
        value={itemName}
        onChangeText={(item) => setItemName(item)}
      />
      <TextInput
        placeholder="Enter item stock..."
        placeholderTextColor="#999"
        style={styles.input}
        value={stock}
        onChangeText={(item) => setStock(item)}
      />

      <Pressable
        style={styles.addbutton}
        onPress={() => (isEdit ? updateItemHandler() : handlerAddItem())}
      >
        <Text style={styles.btnText}>{isEdit ? "Edit item" : "Add item"}</Text>
      </Pressable>

      <View style={{ marginTop: 10 }}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.headingText}>All items in stock</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: item.stock < 20 ? "#FFCCCC" : "#D7F6BFFF" },
              ]}
            >
              <Text style={styles.itemText}>{item.name}</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text style={styles.itemText}>{item.stock}</Text>
                <Pressable onPress={() => editItemHandler(item)}>
                  <Text style={styles.itemText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteItemHandler(item.id)}>
                  <Text style={styles.itemText}>Remove</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: "4%",
    gap: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#D7F6BFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  addbutton: {
    backgroundColor: "#CABFEEFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  HeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  itemText: {
    fontWeight: "400",
    fontSize: 15,
  },
});
