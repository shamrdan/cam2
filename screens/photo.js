import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
const { useMutation } = require('@apollo/react-hooks');
const gql = require('graphql-tag');
import { FontAwesome } from '@expo/vector-icons';


const ImageUpload = gql`
  mutation($file: Upload) {
    uploadImage(image: $file) 
  }
`;
const photo = (item) =>
{
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [wait, setWait] = useState(false)
  const [upload] = useMutation(ImageUpload);
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

    if (camRef)
    {
      setWait(true)
      const data = await camRef.current.takePictureAsync({ quality:0.2 });
      setCapturedPhoto(data.uri);

      setWait(false)
      setOpen(true);

    }

  }


  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}
        ref={camRef}
      >

      </Camera>


      <TouchableOpacity disabled={wait} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#121212", margin: 20, borderRadius: 10, height: 50 }} onPress={takePicture} >


        <FontAwesome name={wait ? 'spinner' : 'camera'} size={23} color="#FFF" />

      </TouchableOpacity>




      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
      >



        <View >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity disabled={wait} style={{ margin: 10 }} onPress={() => setOpen(false)}>
              <FontAwesome name="close" size={50} color= {wait?"#FF0000":"#000000"}  />
            </TouchableOpacity>

            <TouchableOpacity disabled={wait} style={{ margin: 10 }} onPress={async () =>
            {

              let uri = capturedPhoto

              let apiUrl = 'https://drnasefbackend.smartclinic.cf/upload';

             

            
              let name = item.navigation.state.params.name
              let id = item.navigation.state.params._id
              let uriParts = uri.split('.');
              let fileType = uriParts[uriParts.length - 1];

              let formData = new FormData();
             
              formData.append('upload', {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
              });

              let options = {
                method: 'POST',
                body: formData,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                  name,
                  id

                },
              };

              setWait(true)
             let result =  await fetch(apiUrl, options);
             console.log(result.status)
             setWait(false)
             setOpen(false)
            
              

            }}>
              <FontAwesome name="upload" size={50} color= {wait?"#FF0000":"#000000"}  />
            </TouchableOpacity>
          </View>

          <Image
            style={{ marginLeft: 'auto', marginRight: 'auto', width: '95%', height: '90%', borderRadius: 20 }}
            source={{ uri: capturedPhoto }}
          />

        </View>

      </Modal>




    </View>

  );
}

export default photo

