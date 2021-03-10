import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

let charset = '0123456789';

export default function App() {

  const [password, setPassword] = useState('');  //2 paramestros, o state (password) e a função de alteração (setPassword'')
  const [size, setSize] = useState(10);

  function generatePass() {

    let pass = '';
    for (let i = 0, n = charset.length; i < size; i++) { // for vai percorrer ao tamanho do charset basesado na escolha do {size}
      pass += charset.charAt(Math.floor(Math.random() * n)) // e randomicamente vai escolher elementos dentro do charset
    }

    setPassword(pass);
    
  }

  function copyPass() {
    Clipboard.setString(password); //comando utilizado para copiar os dados
    alert('Senha copiada');

  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>{size}</Text>

      <View style={styles.area}>
        <Slider   // gerar slider
          style={{ height: 50 }}
          minimumValue={6}
          maximumValue={15}
          minimumTrackTintColor="#ffA200"  //cor do slider ao deslizar
          maximumTrackTintColor="000"
          value={size}
          onValueChange={(valor) => setSize(valor.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText} >Gerar senha</Text>
      </TouchableOpacity>


      {password !== '' && ( //apenas mostrar o campo da senha quando o botão for acionado
        <View style={styles.area}>
          <Text style={styles.password} onLongPress={copyPass} > {password} </Text>
        </View>
      )}


    </View>
  )
}


const styles = StyleSheet.create({   // constante para criar estilos
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3ff',
  },
  logo: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 7,
  },
  button: {
    backgroundColor: '#ffA200',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  }
});