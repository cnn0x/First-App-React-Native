import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from "react-native";

export default function App() {
  const [enteredGoal, SetEnteredGoal] = useState("");
  const [courseGoals, SetCourseGoals] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const goalInputHandler = (enteredText) => {
    SetEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    SetCourseGoals((currentGoals) => [
      ...courseGoals,
      { key: Math.random().toString(), value: enteredGoal },
    ]);
    setAddMode(false);
    SetEnteredGoal("");
  };

  return (
    <View style={styles.screen}>
      <TouchableHighlight
        underlayColor="#8992f0"
        style={{
          height: 50,
          backgroundColor: "#6874EE",
          borderRadius: 5,
          marginTop: 50,
          marginBottom: 15,
          marginHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          setAddMode(true);
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Add Goal +</Text>
      </TouchableHighlight>
      <Modal
        visible={addMode}
        animationType="slide"
        statusBarTranslucent={true}
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Type Your Goal"
            style={styles.input}
            value={enteredGoal}
            onChangeText={goalInputHandler}
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              underlayColor="#8992f0"
              onPress={addGoalHandler}
              style={styles.button}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>Add</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#e38484"
              onPress={() => setAddMode(false)}
              style={styles.buttonCancel}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      {courseGoals.length != 0 ? (
        <></>
      ) : (
        <Text
          style={{
            padding: 10,
            opacity: 0.7,
            textAlign: "center",
            color: "gray",
            fontWeight: "700",
          }}
        >
          There are no goals added.
        </Text>
      )}
      <FlatList
        data={courseGoals}
        renderItem={(itemData) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              marginHorizontal: 20,
            }}
          >
            <View style={styles.goalsContainer}>
              <Text style={styles.goal}>{itemData.item.value}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                SetCourseGoals(
                  courseGoals.filter((item) => item.key != itemData.item.key)
                );
              }}
              style={{
                width: "20%",
                height: 40,
                backgroundColor: "#e85151",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 50,
  },

  input: {
    width: "100%",
    height: 80,
    backgroundColor: "#eeeeee",
    borderRadius: 5,
    paddingHorizontal: 20,
  },

  button: {
    height: 50,
    backgroundColor: "#6874EE",
    borderRadius: 5,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonCancel: {
    height: 50,
    backgroundColor: "#e85151",
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  goalsContainer: {
    width: "75%",
    minHeight: 40,
    backgroundColor: "#eeeeee",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
  },

  buttonContainer: {
    width: "100%",
  },
});
