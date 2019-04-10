import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import Header from './components/Header/'
import Card from './components/Card/'
import Text from './components/Text/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContentContainer: {
    flex: 1,
  },
})

const App = () => (
  <View style={styles.container}>
    <Header title="Title" leftIcon="menu" rightIcon={null} />
    <ScrollView>
      <Card title="Card Title" image={null} />
      <Card title="Card Title" image={null} />
      <Text>Text View</Text>
    </ScrollView>
  </View>
)

export default App
