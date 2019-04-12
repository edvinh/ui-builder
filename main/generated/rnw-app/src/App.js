import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import Header from './components/Header/'
import Card from './components/Card/'
import Input from './components/Input/'
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
    <Header
      title="Title"
      leftIcon="menu"
      placement="center"
      backgroundColor="#03A9F4"
      foregroundColor="white"
    />
    <ScrollView contentContainerStyle={styles.scrollContentContainer}>
      <Card title="Card Title" />
      <Card title="Card Title" />
      <Input placeholder="Placeholder" label="Label" password={false} />
      <Button title="Button" color="white" backgroundColor="#03A9F4" type="solid" />
    </ScrollView>
  </View>
)

export default App
