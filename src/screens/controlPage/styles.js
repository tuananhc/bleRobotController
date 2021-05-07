import { StyleSheet } from 'react-native';

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
    backgroundColor: 'blue',
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
    margin: 15,
    marginBottom: 0,
    paddingHorizontal: 10
  }
});

export default styles;