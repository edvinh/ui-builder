import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import Header from './components/Header/'
import Input from './components/Input/'
import Button from './components/Button/'
import Checkbox from './components/Checkbox/'

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
      title="Log in"
      leftIcon="menu"
      rightIcon=""
      placement="center"
      backgroundColor="white"
      foregroundColor="green"
    />
    <ScrollView contentContainerStyle={styles.scrollContentContainer}>
      <Input placeholder="email@example.com" mode="outlined" label="Email" password={false} />
      <Input placeholder="Placeholder" mode="outlined" label="Password" password={true} />
      <Button title="Log in" color="#6200ee" type="contained" />
      <Checkbox label="Remember me" align="center" checked={true} />
    </ScrollView>
  </View>
)

export default App
