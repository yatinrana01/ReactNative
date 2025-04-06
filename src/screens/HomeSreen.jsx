import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AllItems from "./AllItems";
import CreateScreen from "./CreateScreen";

const HomeScreen = () => {
  const [view, setview] = useState(0);
  const [data, setdata] = useState([
    { id: 1, name: "wheat", stock: 5, unit: "kg" },
    { id: 2, name: "Rice", stock: 5, unit: "kg" },
    { id: 3, name: "Pulse", stock: 5, unit: "kg" },
    { id: 4, name: "Corn", stock: 5, unit: "kg" },
    { id: 5, name: "Biscuit", stock: 5, unit: "pkt" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            view === 0 ? { backgroundColor: "#D7F6BFFF" } : null,
          ]}
          onPress={() => setview(0)}
        >
          <Text
            style={[styles.btntext, view === 0 ? { color: "white" } : null]}
          >
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 1 ? { backgroundColor: "#D7F6BFFF" } : null,
          ]}
          onPress={() => setview(1)}
        >
          <Text
            style={[styles.btntext, view === 1 ? { color: "white" } : null]}
          >
            Low Stocks
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 2 ? { backgroundColor: "#D7F6BFFF" } : null,
          ]}
          onPress={() => setview(2)}
        >
          <Text
            style={[styles.btntext, view === 2 ? { color: "white" } : null]}
          >
            Create
          </Text>
        </Pressable>
      </View>

      {view === 0 && <AllItems data={data} />}
      {view === 1 && <AllItems data={data.filter((item) => item.stock < 20)} />}
      {view === 2 && <CreateScreen data={data} setdata={setdata} />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: "4%",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 3.5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#D7F6BFFF",
  },
  btntext: {
    color: "#D7F6BFFF",
    fontWeight: "400",
    fontSize: 12,
  },
});
