import React, { Component } from "react";
import { AppLoading } from "expo";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import Todo from "./Todo";

//get the scale of window's hegiht and width
const { width } = Dimensions.get("window");

export default class App extends Component {
  state = { newState: "", loadedTodos: false };

  /////////////function storage///////////////////////////
  stateUpdate = (text: string) => {
    this.setState({ newState: text });
  };

  addTodo = () => {
    const { newState } = this.state;
    if (newState !== "") {
      this.setState((preState: any) => {
        const ID = Math.random();
        const newTodoObj = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newState,
            createdAt: Date.now(),
          },
        };
        const updatedState = {
          ...preState,
          newState: "",
          toDos: {
            ...preState.toDos,
            ...newTodoObj,
          },
        };
        return { ...updatedState };
      });
    }
  };
  /////////////////////////////////////////////////////

  //////////////loading action/////////////////////////
  loadTodos = () => {
    this.setState({ loadedTodos: true });
  };
  componentDidMount = () => {
    this.loadTodos();
  };
  /////////////////////////////////////////////////////

  //onSubmitEditing = like <Form onSubmit={}>
  render() {
    const { newState, loadedTodos } = this.state;
    if (!loadedTodos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f6e58d" />
        <Text style={styles.title}>Todo</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.inputStyle}
            placeholder={"What I have to do now"}
            placeholderTextColor={"#f53b57"}
            autoCorrect={false}
            value={newState}
            onChangeText={this.stateUpdate}
            onSubmitEditing={this.addTodo}
          />
          <ScrollView contentContainerStyle={styles.list}>
            <Todo text={"Hello I'm from App"} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6e58d",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#ff7979",
    flex: 1,
    width: width - 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
  },
  inputStyle: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eb2f06",
    fontSize: 25,
  },

  title: {
    color: "#6ab04c",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  list: {
    alignItems: "center",
  },
});
