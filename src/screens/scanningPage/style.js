import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchableHighlight: {
    margin: 12
  },
  buttonList: {
    flex: 0.25,
  },
  button: {
    backgroundColor: '#208ECE',
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 25
  },
  scanningBox: {
    borderWidth: 1,
    width: 300,
    flex: 0.30,
    margin: 15,
    marginTop: 0
  },
  connectedDeviceBox: {
    flex: 0.05
  },
  dataBox: {
    borderWidth: 1,
    width: 330,
    flex: 0.35,
    marginVertical: 0,
    flexDirection: 'row'
  },
  dataComponentLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2
  },
  dataComponent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.8
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  dataText: {
    fontSize: 25,
    fontWeight: 'bold'
  }
  // microphoneTouchable: {
  //   width: 50,
  //   alignItems: 'flex-end',
  //   margin: 10,
  //   marginRight: 0,
  //   justifyContent: 'center',
  //   position: 'absolute',
  //   top: 0.2 * windowHeight,
  //   right: 0.01 * windowHeight
  // }, 
  // microphoneView: { 
  //   borderWidth: 1.5, 
  //   height: 45, 
  //   borderRadius: 45, 
  //   width: 45, 
  //   justifyContent: 'center', 
  //   alignItems: 'center' 
  // }

});

export default styles;