import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
const { useMutation } = require('@apollo/react-hooks');
const gql = require('graphql-tag');
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator'
import * as MediaLibrary from 'expo-media-library';





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
  const [image, setImage] = useState(null);
  useEffect(() =>
  {

    (async () =>
    {
      const { status } = await Camera.requestPermissionsAsync();
      const { s } = await ImagePicker.requestCameraRollPermissionsAsync();
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
      const data = await camRef.current.takePictureAsync({ quality: 0.1 });
      const manipResult = await ImageManipulator.manipulateAsync(
        data.uri,
        [{ resize: { width: 220, height:360  } }],
        { format: 'jpeg' }
      );
      MediaLibrary.saveToLibraryAsync(manipResult.uri);
      setCapturedPhoto(manipResult.uri);

      setWait(false)
      setOpen(true);

    }

  }
  const pickImage = async () =>
  {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      quality: 0.5,
    });



    if (!result.cancelled)
    {
      console.log(result)

      console.log(result.uri)

      let x = result.uri
      try
      {


        let uri = x

        let apiUrl = 'https://backend.smartclinic.tk/upload';




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
        let result = await fetch(apiUrl, options);
        console.log(result.status)
        setWait(false)
        setOpen(false)
        alert('تم')
      } catch (error)
      {

        console.log(error)
        alert('حاول مرة اخري')
      }
    }
  }

  const uploadPhoto = async () =>
  {



 





    
    let uri = capturedPhoto

     let apiUrl = 'https://api.talkingsigns.cf/photo';

    //let apiUrl = 'http://192.168.1.2:3000/photo';


    let name = item.navigation.state.params.name
    let id = item.navigation.state.params._id
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();

    formData.append('photo', {
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
    let result = await fetch(apiUrl, options);
    console.log(result.status)
    setWait(false)
    setOpen(false)

  }



  return (


    <View style={{ flex: 1 }}>




      <Camera style={{ flex: 1 }} type={type}
        ref={camRef}
      >

      </Camera>

      <View style={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'center' }}>

        <TouchableOpacity disabled={wait} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#121212", margin: 10, borderRadius: 10, height: 50, width: '40%' }} onPress={takePicture} >


          <FontAwesome name={wait ? 'spinner' : 'camera'} size={23} color="#FFF" />

        </TouchableOpacity>

        <TouchableOpacity disabled={wait} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#121212", margin: 10, borderRadius: 10, height: 50, width: '40%' }} onPress={pickImage} >


          <FontAwesome name={wait ? 'spinner' : 'folder'} size={23} color="#FFF" />

        </TouchableOpacity>

      </View>





      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
      >



        <View >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity disabled={wait} style={{ margin: 10 }} onPress={() => setOpen(false)}>
              <FontAwesome name="close" size={50} color={wait ? "#FF0000" : "#000000"} />
            </TouchableOpacity>

            <TouchableOpacity disabled={wait} style={{ margin: 10 }} onPress={uploadPhoto}>
              <FontAwesome name="upload" size={50} color={wait ? "#FF0000" : "#000000"} />
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

