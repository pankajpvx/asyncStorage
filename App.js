import { Button, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';









const App = () => {

  const [take, settake] = useState([])
  const [showData, setShowData] = useState([])

  useEffect(() => {
    const showingData = () => {
      return take.map((item, index) => {
        return (
          <View key={index.toString()} style={{ margin: 2 }}>
            <TouchableOpacity onPress={() => settake(take.filter(data => item !== data))}>
              <Text>{item}</Text>
            </TouchableOpacity >
          </View>
        )
      })
    }

    take ? setShowData(showingData()) : null
  }, [take])

  console.log(take)

  const handleSubmit = async (value) => {
    await storeData(value)
    settake(await getData())
  }

  const storeData = async (str) => {

    let value = await getData()
    value.push(str)


    value = JSON.stringify(value)


    try {
      await AsyncStorage.setItem('123456212', value)
      setAValue('')
    } catch (e) {
      console.warn(e)
    }

  }

  const getData = async () => {
    try {
      const returnValue = await AsyncStorage.getItem('123456212')
      if (returnValue !== null) {
        return JSON.parse(returnValue)
      }
      return []

    } catch (e) {
      // error reading value
    }
  }


  const [value, setAValue] = useState('')




  return (
    <View style={{ justifyContent: 'center' }}>
      <View>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder='enter your name'
          onChangeText={(text) => setAValue(text)}
          value={value}
        />
      </View>
      <Button title='submit' onPress={() => handleSubmit(value)} />
      {showData}

    </View>
  )
}

export default App

const styles = StyleSheet.create({})





