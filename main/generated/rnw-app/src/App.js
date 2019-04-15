import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import Header from './components/Header/'
import Card from './components/Card/'
import Input from './components/Input/'

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
    <Header
      title="Title"
      leftIcon="menu"
      rightIcon="more-vert"
      placement="center"
      backgroundColor="#6200ee"
      foregroundColor="white"
    />
    <ScrollView contentContainerStyle={styles.scrollContentContainer}>
      <Card title="Card Title" image="" />
      <Card title="Card Title" image="" />
      <Input placeholder="Placeholder" mode="outlined" label="Label" password={false} />
    </ScrollView>
  </View>
)

export default App
