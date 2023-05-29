import react, {useEffect, useState}from "react";
import {View, Tex, ScrollView, Button} from 'react-native'
import firebase  from "../configuracion/firebase";
import { QuerySnapshot } from "firebase/firestore";
import { ScrollView } from "react-native-web";
import  {ListItems, Avatar} from 'react-native-elements'

const usuario = (props) =>{
    const [users, setState] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot((QuerySnapshot )=>{
             const users =[];

            
            QuerySnapshot.docs.array.forEach((doc) => {
               const {nombre, direccion, correoelectronico, telefono} =  doc.data()
                users.push({
                id: doc.id,
                nombre,
                direccion,
                correoelectronico,
                telefono
            })
                
            });
           setUsers(users)
         } );

        }, []);

    return (
     <ScrollView>
      <Button title="Crear Usuario" onPress={() => props.navigation.navigate('crearUsuario') } />


      {
        users.map(user => {
             return(
                <ListItems key={user.id} bottomDivider onPress={() => {
                     props.navigation.navigate('detalleusuario', {
                    userid: user.id
                })
            }}>
                 <ListItem.Chevron/>
                 <Avatar source={{uri: ''}} rounded/>
                
                 <ListItem.Content>
                    <ListItem.title>{user.nombre}</ListItem.title>
                    <ListItem.Subtitle>{user.correoelectronico}</ListItem.Subtitle>
                 </ListItem.Content>

                </ListItems>
             );

      })}
     </ScrollView>

    )
}

export default usuario