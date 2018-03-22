import React, { Component } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";

class SecondScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Second Screen</Text>
        {/* <Button onPress={() => this.props.navigator.pop()}> Go to Home Screen </Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default SecondScreen;
