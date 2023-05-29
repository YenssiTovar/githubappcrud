import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator, Alert} from 'react-native'
import firebase from '../configuracion/firebase'
import { ActivityIndicator } from 'react-native/types';

const detalleusuario = (props) =>{
  
   const initalState = {
    id: '',
    name: '',
    direccion: '',
    correoelectronico: '',
    telefono: '',

   }

    
   const [user, setState] = useState();
   const [Loading, setLoading] = useState(true)


    const getUserByid =  async (id) => {
      const dbRef = firebase.db.collection('users').doc(id)
      const doc =  await dbRef.get();
      const user = doc.data();
      setUser({
        ...user,
        id: doc.id,
      });
      setLoading(false)
    };

     useEffect(() =>{
        getUserByid(props.route.params.userid);
     }, []);


     const handleChangeText = (name, value) =>{
        setUser({...user, [name]: value});
    };


     const eliminarusuario = async () => {
       const dbRef =  firebase.db.collection('users').doc(props.route.params.userid);
        await dbRef.delete();
        props.navigation.navigate('usuario')

     } 
     
     const editarusuario = async () => {
        const dbRef = firebase.db.collection(users).doc(user.id);
        await dbRef.set({
            nombre: user.name,
            direccion: user.direccion,
            correoelectronico: user.correoelectronico,
            telefono: user.telefono,

     })
     setUser(initalState)
     props.navigation.navigate('usuario')

     }

     const openConfirmationAlert = () => {
        Alert.aler('Eliminar Uusario','¿Estas seguro?',[
            {text: 'Si', onPress: ()=> eliminarusuario()},
            {text: 'No', onPress: ()=> console.log(false)},

        ])
    }



    if(Loading) {
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }


    return (
        <ScrollView style={styles.container}>
           <View styles = {styles.imputGroup}>
                <TextInput  placeholder="Nombre:"
                 value={user.name}
                 onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View>
                <TextInput  placeholder="Direccion:" 
                 value={user.direccion}
                onChangeText={(value) => handleChangeText('direccion', value)}/>
            </View>
            <View styles = {styles.imputGroup}>
                <TextInput  placeholder="Correo Electronico:" 
                 value={user.correoelectronico}
                onChangeText={(value) => handleChangeText('correo electronico', value)}/>
            </View>
            <View styles = {styles.imputGroup}>
                <TextInput  placeholder="Telefono:" 
                 value={user.telefono}
                onChangeText={(value) => handleChangeText('telefono', value)}/>
            </View>
            <View>
                <Button  color="#19AC52" title="ACTUALIZAR USUARIO" onPress={() => editarusuario()}/>
            </View>
            <View>
            <Button color="#E37399" title="ELIMINAR USUARIO" onPress={() => openConfirmationAlert()}/>
            </View>
        </ScrollView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    imputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },


    });



export default detalleusuario