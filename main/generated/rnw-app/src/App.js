import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import Header from './components/Header/'
import Text from './components/Text/'
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
    <Header
      title="Favourites"
      leftIcon="menu"
      rightIcon="image"
      placement="center"
      backgroundColor="darksalmon"
      foregroundColor="white"
    />
    <ScrollView contentContainerStyle={styles.scrollContentContainer}>
      <Text color="crimson" fontSize="24" textAlign="left" fontWeight="bold">
        Favourite Pictures
      </Text>
      <Card
        title="Trees"
        image="https://images.unsplash.com/photo-1470260749628-75a34921a98a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      >
        <Button
          title="Visit Photographer"
          color="salmon"
          backgroundColor="salmon"
          type="outline"
        />
      </Card>
      <Card
        title="Plants"
        image="https://images.unsplash.com/photo-1554860746-e74d5092a776?ixlib=rb-1.2.1&auto=format&fit=crop&w=958&q=80"
      >
        <Button
          title="Visit Photographer"
          color="salmon"
          backgroundColor="salmon"
          type="outline"
        />
      </Card>
      <Card
        title="Flowers"
        image="https://images.unsplash.com/photo-1554600401-c269a06e28eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
      >
        <Button
          title="Visit Photographer"
          color="salmon"
          backgroundColor="salmon"
          type="outline"
        />
      </Card>
      <Button
        title="See more"
        color="white"
        backgroundColor="salmon"
        type="solid"
      />
    </ScrollView>
  </View>
)

export default App
