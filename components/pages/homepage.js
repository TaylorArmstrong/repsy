import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import store, { URI } from '../../store'
import { getDoctorsConditions } from '../../utils/api'
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body
} from 'native-base'

import FooterMenu from '../elements/FooterMenu'


export default class Homepage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    doctorsConditions: store.getState().doctorsConditions,
    isLoading: true,
    userID: store.getState().user.id
  }
}

//Subscribe doctorsConditions state to the store to update on change
async componentDidMount(){
  this.unsubscribe = store.onChange(() => {
    this.setState({
      doctorsConditions: store.getState().doctorsConditions,
      userID: store.getState().user.id
    })
  })
  //Get the conditions from the doctors_conditions route passing in the doctor ID from the user state
  let conditions = []
  conditions = await getDoctorsConditions()
  console.log('Conditions Loaded:', conditions);
//Set the store state with the conditions. This should cause local state to update a re-render
  store.setState({
    doctorsConditions: conditions,
  })
}




componentWillUnmount(){
  //disconnect from store notifications
  this.unsubscribe()
}



  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Text>Hello Bejan</Text>
          </Left>
          <Body>
          </Body>
          <Right>
            <Button
              onPress={() => { Actions.ConditionsLibrary() }}
            >
              <Text>Conditions</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Button onPress={() => store.setState({
            doctorsConditions: ['Hacked 1', 'Hacked 2', 'Hacked 3', 'Hacked 4']
          })}>
            <Text>PRESS</Text>
          </Button>
          <Text style={styles.title}>Selected Conditions</Text>
          {this.state.doctorsConditions.map((condition, idx) => (
            <Button key={idx} rounded style={styles.button}>
              <Text>{condition.name}</Text>
            </Button>
          ))}
        </Content>
        <Footer>
          <FooterMenu/>
        </Footer>
      </Container>
    ) // End of return
  } // End of render

} // End of componenet

// Variables to changes the height and width dynamically for all screens
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// Put styles in here to format the page
const styles = StyleSheet.create({
    button: {
      margin: 15,
      width: '80%',
    },
    title: {
      fontSize: 40,
      margin: 10,
    }
});
