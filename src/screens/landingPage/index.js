import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './styles';

export default function landingPage() {
  const [array, setArray] = useState([0]);
  var arr = []
  setInterval(() => {
    num = array.pop()
    arr = array => [...array, num + 1]
    setArray(arr);
  }, 1000)

  function renderItem1({ item }) {
    return (
      <Text>{item}</Text>
    )
  }

  function renderItem2({ item }) {
    switch (item) {
      case 1:
        return (
          <Text>Chạy</Text>
        )
      case 2:
        return (
          <Text>Dừng</Text>
        )
      case 3:
        return (
          <Text>Vật cản</Text>
        )
      case 4:
        return (
          <Text>Nguy hiểm</Text>
        )
      default:
        return (
          <Text>{item}</Text>
        )
    }
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.4, margin: 20, flexDirection: 'row' }}>
          <View style={{ flex: 0.5, borderWidth: 1 }}>
            <FlatList
              data={array}
              renderItem={renderItem1}
            />
          </View>
          <View style={{ flex: 0.5, borderWidth: 1, borderLeftWidth: 0 }}>
            <FlatList
              data={array}
              renderItem={renderItem2}
            />
          </View>
        </View>
      </View>
    </>
  )
}