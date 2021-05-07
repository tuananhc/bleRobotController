import React, { useState } from 'react';
import { Alert, FlatList, Text, TouchableHighlight, View, Button, PermissionsAndroid, DatePickerAndroid, Image } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

import styles from './style';

export default function App() {
  const [devices, setDevices] = useState([]);
  const bleManager = new BleManager();
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(true);
  const [connectedDevice, setConnectedDevice] = useState('');
  const [data, setData] = useState([]);
  var serviceUUID, characteristicUUID;

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Location permission for bluetooth scanning',
        message: 'whatever',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  const permission = requestLocationPermission();

  function onScan() {
    if (permission) {
      bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log(error);
          setIsBluetoothConnected(false);
        }
        if (device) {

          if (!devices.some(device => device.id === deviceId)) {
            var item = {}
            item['name'] = device.name;
            item['id'] = device.id;
            newDevices = [...device, id]
            setDevices(newDevices);
          }
        }
      })
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableHighlight onPress={() => {
        Alert.alert(
          '',
          'Connect to device?',
          [
            {
              text: 'No',
              onPress: () => { }
            },
            {
              text: 'Yes',
              onPress: () => {
                setConnectedDevice(item.id)
                connectToDevice(connectedDevice)
              }
            }
          ]
        )
      }}
        style={{ marginTop: 5, padding: 3, justifyContent: 'flex-start' }}
        underlayColor='#e6e6e6'
      >
        <View style={{ flexDirection: 'row', }}>
          <Image
            source={require('./src/assets/noun.png')}

            style={{ margin: 5, width: 30, height: 20 }}
          />
          <View style={{}}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {(item.name) ? item.name : "<unnamed>"}
            </Text>
            <Text style={{ opacity: 0.6, marginLeft: 10, fontSize: 12 }}>{item.id}</Text>
          </View>
          {(connectedDevice === item.id) ? (
            <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'flex-end' }}>
              <Image
                source={require('./src/assets/noun_tick_1359695.png')}
                style={{ width: 30, height: 20 }}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      </TouchableHighlight>
    )
  }

  function connectToDevice(deviceId) {
    bleManager.stopDeviceScan();
    bleManager.connectToDevice(deviceId).then((device) => {
      return device.discoverAllServicesAndCharacteristics()
    })
      .then((device) => {
        device.services().then((services) => {
          services.forEach(service => {
            service.characteristics().then((characteristics) => {
              characteristics.forEach((characteristic) => {
                if (characteristic.isWritableWithResponse && characteristic.isWritableWithoutResponse) {
                  characteristicUUID = characteristic.uuid
                  serviceUUID = service.uuid
                }
                device.monitorCharacteristicForService(service.uuid, characteristic.uuid, (error, characteristic) => {
                  if (error) {
                    console.log(JSON.stringify(error))
                  } else {
                    setData([...data, base64.decode(characteristic.value)])
                  }
                })
              })
            })
          })
        });
      }), (error) => {
        console.log(error.message);
      }
  }

  function sendAction(action) {
    bleManager.writeCharacteristicWithResponseForDevice(
      connectedDevice,
      serviceUUID,
      characteristicUUID,
      base64.encode(action))
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.scanningBox}>
          {(isBluetoothConnected) ? (
            <View>
              <FlatList
                data={devices}
                renderItem={renderItem}
              />
            </View>
          ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Text>Error encountered with scanning process</Text>
            </View>
          )}
        </View>
        {(connectedDevice !== '') ? (
          <View style={styles.connectedDeviceBox}>
            <Text>Connected to device {connectedDevice}</Text>
          </View>
        ) : (
          <></>
        )}

        <Button title='start' onPress={() => { onScan() }} />

        <View style={styles.buttonList}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableHighlight
              onPress={() => { sendAction('1') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>1</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { Alert.alert('2') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>2</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { Alert.alert('3') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>3</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { Alert.alert('4') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>4</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              onPress={() => { Alert.alert('5') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>5</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { Alert.alert('6') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>6</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { Alert.alert('7') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>7</Text>
              </View>
            </TouchableHighlight>
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
        <View style={styles.dataBox}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={{}}
          />
        </View>
      </View>
    </>
  )
}