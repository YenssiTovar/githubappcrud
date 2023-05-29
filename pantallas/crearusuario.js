import react, { useState}  from "react";
import {View, Button,TextInput,ScrollView,StyleSheet} from 'react-native'
import firebase from '../configuracion/firebase'
import usuario from "./usuario";

const crearUsuario= (props) =>{

    const [state, setState] = useState({
        nombre: '',
        direccion: '',
        correoelectronico: '',
        telefono: '',
    })


    const handleChangeText = (name, value) =>{
        setState({...state, [name]: value});
    };

    const createNewUser = async () =>{
        if(state.nombre === ''){
              alert('Please provide a name')
        } else {
            try{
                await firebase.db.collection('users').add({
                    nombre: state.nombre,
                    direccion: state.direccion,
                    correoelectronico: state.correoelectronico,
                    telefono: state.telefono,
                  })
                  props.navigetion.navigate(usuario);
            }catch (error) {
                console.log(error)
            }
        }
    };




    return (
        <ScrollView style={styles.container}>
           <View styles = {styles.imputGroup}>
                <TextInput  placeholder="Nombre:" onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View>
                <TextInput  placeholder="Direccion:" onChangeText={(value) => handleChangeText('direccion', value)}/>
            </View>
            <View styles = {styles.imputGroup}>
                <TextInput  placeholder="Correo Electronico:" onChangeText={(value) => handleChangeText('correo electronico', value)}/>
            </View>
            <View styles = {styles.imputGroup}>
                <TextInput  placeholder="Telefono:" onChangeText={(value) => handleChangeText('telefono', value)}/>
            </View>
            <View>
                <Button title="Agregar Usuario" onPress={() => saveNewuser()}/>
            </View>
        </ScrollView>

    )
}

 const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
 },
    imputGroup:{
        flex: 1,
        padding:0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'


    }

})

export default crearUsuario