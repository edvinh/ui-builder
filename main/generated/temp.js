import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import Header from './components/Header/'
import Card from './components/Card/'
import Button from './components/Button/'
import Text from './components/Text/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const App = () => (
  <View style={styles.container}>
    <Header title="Header Title" leftIcon="menu" rightIcon="home" />
    <ScrollView>
      <Card title="Card Title">undefined</Card>
      <Card title="Card 2 Title">undefined</Card>
      <Button title="Button" />
      <Text>Text View</Text>
    </ScrollView>
  </View>
)

export default App
