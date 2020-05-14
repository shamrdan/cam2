// import React from 'react';

// import CameraPage from './src/camera.page';

// export default class App extends React.Component {
//     render() {
//         return (
//             <CameraPage />
//         );
//     };
// };








// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';



// export default function App() {
  
  
    
//   return (
//     <View style={styles.container}>
//     <Text >Shehab Khalid</Text>
//     </View>
//   );

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#33A6FF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontWeight: 'bold'
//   },
// });




// import React, { useState, useEffect } from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View style={{ flex: 1 }}>
//       <Camera style={{ flex: 1 }} type={type}>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: 'transparent',
//             flexDirection: 'row',
//           }}>
//           <TouchableOpacity
//             style={{
//               flex: 0.1,
//               alignSelf: 'flex-end',
//               alignItems: 'center',
//             }}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}>
//             <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }
