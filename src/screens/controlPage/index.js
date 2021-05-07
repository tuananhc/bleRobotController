import React, { useState } from 'react';
import { Alert, FlatList, Text, TouchableHighlight, View, Button, PermissionsAndroid, DatePickerAndroid, Image } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import styles from './styles';

export default function App() {

  const [button1, setButton1] = useState({
    value: '1',
    change: false
  })

  const [button2, setButton2] = useState({
    value: '2',
    change: false
  })

  const [button3, setButton3] = useState({
    value: '3',
    change: false
  })

  const [button4, setButton4] = useState({
    value: '4',
    change: false
  })

  const [button5, setButton5] = useState({
    value: '5',
    change: false
  })

  const [button6, setButton6] = useState({
    value: '6',
    change: false
  })

  const [button7, setButton7] = useState({
    value: '7',
    change: false
  })

  const [button8, setButton8] = useState({
    value: '8',
    change: false
  })

  function createDialogInput(button) {
    return (
      <DialogInput
        isDialogVisible={button.change}
        title={'Change button input', button.value}
        submitInput={(input) => {
          button.value = input
          button.change = false
        }}
        closeDialog={() => { button.change = false }}
      />
    )
  }

  return (
    <>
      <View style={styles.container}>

        <View style={styles.buttonList}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View>{createDialogInput(button1)}</View>
            <TouchableHighlight
              onPress={() => { }}
              onLongPress={() => { setButton1({ ...button1, ['change']: true }) }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>{button1.value}</Text>
              </View>
            </TouchableHighlight>

            <View>{createDialogInput(button2)}</View>
            <TouchableHighlight
              onPress={() => { Alert.alert('2') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>2</Text>
              </View>
            </TouchableHighlight>

            <View>{createDialogInput(button3)}</View>
            <TouchableHighlight
              onPress={() => { Alert.alert('3') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>3</Text>
              </View>
            </TouchableHighlight>

            <View>{createDialogInput(button4)}</View>
            <TouchableHighlight
              onPress={() => { Alert.alert('4') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>4</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View>{createDialogInput(button5)}</View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              onPress={() => { Alert.alert('5') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>5</Text>
              </View>
            </TouchableHighlight>

            <View>{createDialogInput(button6)}</View>
            <TouchableHighlight
              onPress={() => { Alert.alert('6') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>6</Text>
              </View>
            </TouchableHighlight>

            <View>{createDialogInput(button7)}</View>
            <TouchableHighlight
              onPress={() => { Alert.alert('7') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>7</Text>
              </View>
            </TouchableHighlight>

            <View>{createDialogInput(button8)}</View>
            <TouchableHighlight
              onPress={() => { Alert.alert('8') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>8</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </>
  )
}




