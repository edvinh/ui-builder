import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import Header from './components/Header/'
import Card from './components/Card/'
import Button from './components/Button/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContentContainer: {
    padding: 8,
  },
})

const App = () => (
  <View style={styles.container}>
    <Header title="Title" leftIcon="menu" rightIcon="face" />
    <ScrollView contentContainerStyle={styles.scrollContentContainer}>
      <Card title="Card Title" />
      <Card title="Card Title">
        <Button title="Button" />
      </Card>
    </ScrollView>
  </View>
)

export default App
