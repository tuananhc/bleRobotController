import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableHighlight,
  View,
  PermissionsAndroid,
  Image,
  TouchableOpacity
} from 'react-native';
import Button from '../../components/ui/Buttons/Button';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import DialogInput from 'react-native-dialog-input';
import Voice from '@react-native-voice/voice';

import styles from './style';

const bleManager = new BleManager();

export default function App() {
  const [devices, setDevices] = useState([]);
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(true);
  const [buttonValue, setButtonValue] = useState('1')
  const [change, setChange] = useState(false)
  const [deviceID, setDeviceID] = useState("")
  const [serviceUUID, setServiceUUID] = useState("")
  const [characteristicUUID, setCharacteristicUUID] = useState("");
  const [loading, setLoading] = useState(false);
  const [deviceState, setDeviceState] = useState("");
  const [dataReceived, setDataReceived] = useState("");

  // Alert the user when bluetooth is turned off
  function handlePoweredOff() {
    Alert.alert(
      'Bluetooth is disabled',
      'Turn Bluetooth on to begin scanning devices',
      [{
        text: 'Ok',
        onPress: () => { bleManager.enable() }
      }],
      { cancelable: false }
    )
  }

  // turn on bluetooth if it is initially off
  bleManager.state().then((state) => {
    if (state === 'PoweredOff') {
      handlePoweredOff();
    }
  })

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
    setLoading(true);
    if (permission) {
      let numScans = 0;
      let len = 0;
      var distinctDevices = [];
      bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log(JSON.stringify(error));
          setIsBluetoothConnected(false);
        }
        if (len >= 15 || numScans > 50) {
          bleManager.stopDeviceScan();
          setLoading(false);
        }
        if (device) {
          if (!distinctDevices.some(elem => elem.id === device.id)) {
            var item = {}
            item['name'] = device.name;
            item['id'] = device.id;
            distinctDevices = [...distinctDevices, item]
            setDevices(distinctDevices);
            len += 1;
          }
          numScans += 1;
        }
      })
    }
  }

  // handle change of bluetooth state
  bleManager.onStateChange((state) => {
    if (state === 'PoweredOff') {
      handlePoweredOff();
    }
    if (state === 'PoweredOn') {
      navigator.navigate('ScanningPage');
    }
  })

  function connectToDevice(deviceId) {
    setLoading(false);
    bleManager.stopDeviceScan();
    bleManager.connectToDevice(deviceId).then((device) => {
      return device.discoverAllServicesAndCharacteristics()
    })
      .then((device) => {
        device.services().then((services) => {
          services.forEach(service => {
            service.characteristics().then((characteristics) => {
              characteristics.forEach((characteristic) => {
                setServiceUUID(characteristic.serviceUUID);
                setCharacteristicUUID(characteristic.uuid);
                device.monitorCharacteristicForService(service.uuid, characteristic.uuid, (error, characteristic) => {
                  if (error) {
                    console.log(JSON.stringify(error))
                  } else {
                    switch (parseInt(base64.decode(characteristic.value))) {
                      case 1:
                        setDeviceState("Chạy");
                        break;
                      case 2:
                        setDeviceState("Dừng");
                        break;
                      case 3:
                        setDeviceState("Vật cản");
                        break;
                      case 4:
                        setDeviceState("Nguy hiểm");
                        break;
                      default:
                        setDeviceState("")
                        break;
                    }
                    setDataReceived(base64.decode(characteristic.value));
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
      deviceID,
      serviceUUID,
      characteristicUUID,
      base64.encode(action))
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
                connectToDevice(item.id);
                setDeviceID(item.id)
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
            source={require('../../assets/noun.png')}

            style={{ margin: 5, width: 30, height: 20 }}
          />
          <View style={{}}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {(item.name) ? item.name : "<unnamed>"}
            </Text>
            <Text style={{ opacity: 0.6, marginLeft: 10, fontSize: 12 }}>{item.id}</Text>
          </View>
          {(deviceID === item.id) ? (
            <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'flex-end' }}>
              <Image
                source={require('../../assets/tick.png')}
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

  // function recording() {
  //   console.log('listening...')
  //   Voice.start('en-US');
  //   Voice.onSpeechResults = (e: SpeechResultsEvent) => {
  //     console.log('onSpeechResults: ', e);
  //   };
  // }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.scanningBox}>
          {(isBluetoothConnected) ? (
            <View>
              <FlatList
                data={devices}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Text>Error encountered with scanning process</Text>
            </View>
          )}
        </View>
        {(deviceID !== '') ? (
          <View style={styles.connectedDeviceBox}>
            <Text>Connected to device {deviceID}</Text>
          </View>
        ) : (
          <></>
        )}

        <Button
          style={{
            marginVertical: 10,
            width: 300,
            backgroundColor: '#208ECE',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}
          loading={loading}
          onPress={onScan}>
          <Text
            style={{ fontSize: 16, color: '#ffff', fontWeight: 'bold' }}>
            SCAN
            </Text>
        </Button>

        <View style={styles.buttonList}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableHighlight
              onPress={() => { (deviceID) ? sendAction(buttonValue) : Alert.alert('No connected device') }}
              onLongPress={() => {
                setChange(true)
              }}
              delayLongPress={2000}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <DialogInput
                  isDialogVisible={change}
                  title={'Change button input'}
                  submitInput={(input) => {
                    setButtonValue(input)
                    setChange(false)
                  }}
                  closeDialog={() => { setChange(false) }}
                />
                <Text style={styles.buttonText}>{buttonValue}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { (deviceID) ? sendAction('2') : Alert.alert('No connected device') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>2</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { (deviceID) ? sendAction('3') : Alert.alert('No connected device') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>3</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { (deviceID) ? sendAction('4') : Alert.alert('No connected device') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>4</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              onPress={() => { (deviceID) ? sendAction('5') : Alert.alert('No connected device') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>5</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { (deviceID) ? sendAction('6') : Alert.alert('No connected device') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>6</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { (deviceID) ? sendAction('7') : Alert.alert('No connected device') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>7</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => { (deviceID) ? sendAction('8') : Alert.alert('No connected device') }}
              style={styles.touchableHighlight}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>8</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.dataBox}>
          <View style={{ flex: 0.5, borderRightWidth: 1, justifyContent: 'center' }}>
            <View style={styles.dataComponentLabel}>
              <Text style={styles.headerText}>Dữ liệu gửi về</Text>
            </View>
            <View style={styles.dataComponent}>
              <Text style={styles.dataText}>{dataReceived}</Text>
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <View style={styles.dataComponentLabel}>
              <Text style={styles.headerText}>Trạng thái</Text>
            </View>
            <View style={styles.dataComponent}>
              <Text style={styles.dataText}>{deviceState}</Text>
            </View>
          </View>
          {/* <TouchableOpacity
            style={styles.microphoneTouchable}
            onPressIn={recording}
            onPressOut={() => { Voice.stop() }}
          >
            <View style={microphoneView}>
              <Image
                source={require('../../assets/microphone.png')}
                style={{ height: 30, width: 30 }}
              />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  )
}