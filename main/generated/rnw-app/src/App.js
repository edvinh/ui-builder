import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import Header from './components/Header/'
import Card from './components/Card/'
import Text from './components/Text/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const App = () => (
  <View style={styles.container}>
    <Header title="Title" leftIcon="menu" />
    <ScrollView>
      <Card content="Card Content" title="Card Title" />
      <Card content="Card Content" title="Card Title" />
      <Text>Text View</Text>
    </ScrollView>
  </View>
)

export default App
