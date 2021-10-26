import { StatusBar } from 'expo-status-bar';
import {Camera} from 'expo-camera'
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



export default function App() {

  const [startCamera,setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)

  const __startCamera = async ()=>{
    const {status} = await Camera.requestPermissionsAsync()
      if(status === 'granted'){
        setStartCamera(true)

      }else{
        Alert.alert("Acesso negado!")
  }
}

const __takePicture = async () => {
  if (!camera) return
  const photo = await camera.takePictureAsync()
  console.log(photo)
  setPreviewVisible(true)
  setCapturedImage(photo)
 
}


const CameraPreview = ({photo}: any) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      />
    </View>
  )
}


  let camera: Camera

  return (

    
    <View style={styles.container}>     
      {startCamera ? (
      <Camera
        style={{flex: 1,width:"100%"}}
        ref={(r) => {
        camera = r
        }}
        >

      </Camera>
      ) : (
        <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
        <TouchableOpacity
          onPress={__startCamera}
          style={{
            width: 130,
            borderRadius: 4,
            backgroundColor: '#14274e',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Tirar foto
          </Text>
        </TouchableOpacity>
      </View>

      
      )}

      {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} />
          ) : (
            <Camera
              style={{flex: 1}}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}

          

      <View
        style={{
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
        }}
      >
        <View
        style={{
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center'
        }}
        >
            <TouchableOpacity
            onPress={__takePicture}
            style={{
            width: 70,
            height: 70,
            bottom: 0,
            borderRadius: 50,
            backgroundColor: '#fff'
            }}
            />
        </View>
    </View>

      

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});