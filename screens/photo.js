import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
const photo = () =>
{
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [wait,setWait] =  useState(false)
  useEffect(() =>
  {
    (async () =>
    {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null)
  {
    return <View />;
  }
  if (hasPermission === false)
  {
    return <Text>No access to camera</Text>;
  }
  async function takePicture()
  {
    console.log('pressed')
    if (camRef)
    {
      setWait(true)
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setWait(false)
      setOpen(true);
      console.log(data);
    }

  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}
        ref={camRef}
      >

      </Camera>

      
      <TouchableOpacity disabled={wait} style={{ justifyContent: 'center', alignItems: 'center',  backgroundColor: "#121212"  , margin: 20, borderRadius: 10, height: 50 }} onPress={takePicture} >


        <FontAwesome name={wait?'spinner':'camera'} size={23} color= "#FFF"   />

      </TouchableOpacity>




      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
      >



        <View >
          <View style={{ flexDirection:'row'}}>
              <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                <FontAwesome name="close" size={50} color="#FF0000" />
              </TouchableOpacity>
              <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                <FontAwesome name="upload" size={50} color="#FF0000" />
              </TouchableOpacity>
            </View>

          <Image
            style={{  marginLeft:'auto', marginRight:'auto',  width: '95%', height: '90%', borderRadius: 20 }}
            source={{ uri: capturedPhoto }}
          />

        </View>

      </Modal>




    </View>

  );
}

export default photo

