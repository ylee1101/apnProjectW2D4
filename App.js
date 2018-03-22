import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import NavigationBar from "react-native-navbar";

// using asynchronosly fetches json data and hold for other functions
async function getData() {
  try {
    const data = await fetch(
      "https://devccc.assuredperformance.net/react_test.php"
    );
    return await data.json();
  } catch (err) {
    console.log("Fetch Failed", err);
  }
}

// draft to seperate drawpage and fillpage arrays
// const arrThatWeCantChange = getData();

// const withoutTheFirstTwo = arrThatWeCantChange.slice(2);

// const Buttons = () =>
//   withoutTheFirstTwo.map(button => (
//     <Button text={button[3]} action={button[4]} goingTo={[button[5]]} />
//   ));
// draft to seperate drawpage and fillpage arrays ends

// we seperate the two json arrays sections starting with drawpage and fillpage
const newSetArr = [];

const filterNewSetArr = array => {
  return array.filter(element => element[0] === "drawpage");
};

const matchPage = (array1, array2) => {
  return array1.map(page => {
    page.elements = array2.filter(
      element => element[1] === page[1] && element[0] === "fillpage"
    );
    return page;
  });
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { onLoading: false, page: null, pageIndex: [] };
  }

  // /\d+/g -> any digit from 0 to 9 repeated one or more times (+) The qualifier g will make the search global (ie: don't stop on the first hit)
  componentWillMount() {
    getData()
      .then(data => data.map(element => newSetArr.push(element)))
      .then(res => filterNewSetArr(newSetArr))
      .then(res => matchPage(res, newSetArr))
      .then(res => this.setState({ pageIndex: res }))
      .then(() =>
        this.setState({
          page: parseInt(this.state.pageIndex[0][1].match(/\d+/g) - 1, 10)
        })
      )
      .then(() => this.setState({ onLoading: true }))
      .catch(err => alert("Loading Failed"));
  }

  // we can put the button text or whatever the functionalities that we want to put to be displayed
  fillPage = element => {
    let item = element[2];
    console.log("testing element: ", element);
    switch (item) {
      case "button":
        return (
          <View
            style={{
              position: "relative",
              justifyContent: "flex-start",
              flexDirection: "column",
              position: "relative"
            }}
          >
            <TouchableHighlight
              key={element[3]}
              onPress={() => {
                element[4] === "disabled"
                  ? console.log("your going nowhere")
                  : this.setState({
                      page: parseInt(element[5].match(/\d+/g) - 1, 10)
                    });
              }}
              style={{
                backgroundColor: "#003D50",
                padding: 20,
                borderRadius: 20,
                margin: 10,
                width: 130
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#E6E7E8",
                  textAlign: "center"
                }}
              >
                {element[3]}
              </Text>
            </TouchableHighlight>
          </View>
        );
      case "echo":
        return (
          <Text
            key={element[3]}
            style={{ fontSize: 20, textAlign: "center", marginTop: 40 }}
          >
            {element[3]}!
          </Text>
        );
      default:
        return <Text>{element[3]}</Text>;
    }
  };

  // top navigator buttons starts here
  rightButtonConfig = {
    title: "Next",
    tintColor: "#E6E7E8",
    handler: () => {
      if (this.state.page == this.state.pageIndex.length - 1) {
        return;
      } else {
        this.setState({
          page: this.state.page + 1
        });
      }
    }
  };

  // we need to hide this button when its at homeScreen
  leftButtonConfig = {
    title: "Back",
    tintColor: "#FEFFFE",
    handler: () => {
      if (this.state.page === 0) {
        return;
      } else {
        this.setState({
          page: this.state.page - 1
        });
      }
    }
  };
  // top navigator buttons ends here

  // Title text section starts here
  titleConfig = {
    title: "APN Project",
    tintColor: "#E6E7E8",
    
  };
  // Title text section ends here

  render() {
    console.log("testing: this.data: ", this.data);
    console.log("testing pageIndex: ", this.state.pageIndex);
    // console.log("testing element: ", element)
    if (!this.state.onLoading) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <View style={styles.container}>
          <NavigationBar
            style={styles.navbar}
            tintColor="#092140"
            title={this.titleConfig}
            leftButton={this.leftButtonConfig}
            rightButton={this.rightButtonConfig}
          />
          <View style={styles.buttonContainer}>
            {this.state.pageIndex[this.state.page].elements.map(item =>
              this.fillPage(item)
            )}
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1
  },
  buttonContainer: {
    flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50
  },
  navbar: {
    marginTop: 25,
    marginBottom: 25
  }
};
