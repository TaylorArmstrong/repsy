import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, InputText, Alert, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base'


export default class RepsCard extends Component {
  constructor(props) {
  super(props);
  }
  render() {
      return (
        <Container>
          <Header />
          <Content>
            <List>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={{ uri: `${reps.reps_photo}` }} />
                </Left>
                <Body>
                  <Text>{reps.fname} {reps.lname}</Text>
                  <Text note numberOfLines={1}>Company: {reps.company}</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>View</Text>
                  </Button>
                </Right>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
}