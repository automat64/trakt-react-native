/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *

 */
import React, { Component } from 'react';
import {FlatList, Text, View, Image, TextInput, ActivityIndicator } from 'react-native';

import Trakt from "./src/services/trakt";

class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <Text onPress={() => {alert(this.props.name);}} style={{flex: 1}} >Hello {this.props.name}!</Text>
      </View>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: 'alex',
      random: 'test',
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
    console.log('test');
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}</Text>}
          keyExtractor={(item, index) => item.ids.trakt.toString()}
        />
        {/* <Text>{this.state.items[0].title}</Text> */}
        {/* <Text>{this.state.text}</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Image source={pic} style={{width: 193, height: 110}}/>
        <Greeting name="Rexxar" />
        <Greeting style={{flex: 2}} name="Jaina" />
        <Greeting name="Valeera" style={{flex: 3}}/>
        <Greeting name={this.state.text} style={{flex: 4}} /> */}
      </View>
    );
  }
}
