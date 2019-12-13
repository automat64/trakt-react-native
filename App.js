/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *

 */
import React, { Component } from 'react';
import {FlatList, View, Image, TextInput, ActivityIndicator } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, List, ListItem, Text, Spinner  } from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Trakt from "./src/services/trakt";

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Hello",
    };
  }
  
  static navigationOptions = {
    // header: (
    //   <Header>
    //     <Left>
    //       <Button transparent>
    //         <Icon name="ios-arrow-back" onPress={() => this.props.navigate.goBack()} />
    //       </Button>
    //     </Left>
    //     <Body>
    //       <Title>Header</Title>
    //     </Body>
    //     <Right />
    //   </Header>
    // )
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <Text onPress={() => {alert(this.state.title);}} style={{flex: 1}} >Hello {this.props.title}!</Text>
      </Container>
    );
  }
}



class TraktList extends React.Component {
  static navigationOptions = {
    header: (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount =()=>{
    let trakt = new Trakt();
    let items = [{}];
    let that = this;
    trakt
      .traktList('trending')
      .then(function(response) {
        console.log(response);
        that.setState({
            isLoading: false,
            dataSource: response,
          },
          function() {
            // In this block you can do something with new state.
          },
        );
      })
      .catch(function(error) {
        console.log(error);
        //that.initApp();
      });
  };

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    const {navigate} = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <Container>
           <Spinner color='blue' />
        </Container>
      );
    }

    return (
      <Container>
        {/* <Content> */}
          <List
            dataArray={this.state.dataSource}
            renderItem={({item}) => <ListItem onPress={() => navigate('Detail', {title: "item.title"})}><Text>{item.title}</Text></ListItem>}
            keyExtractor={(item, index) => item.ids.trakt.toString()}
          />
        {/* </Content> */}
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const MainNavigator = createStackNavigator({
  List: {screen: TraktList},
  Detail: {screen: DetailScreen},
});

const App = createAppContainer(MainNavigator);
export default App;
