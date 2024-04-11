import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { salvarUsuario } from '../conection/firebaseDB';

interface Usuario {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  usuario: string;
}

export default function Profile() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');

  const gerarID = () => {
    // Gere um ID único combinando um timestamp e um número aleatório
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  };

  const salvarDadosUsuario = () => {
    const novoUsuario = {
      id: gerarID(),
      nome: nome,
      telefone: telefone,
      email: email,
      senha: senha,
      usuario: usuario
    };

    salvarUsuario(novoUsuario);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          style={[styles.input, { marginTop: 25 }]}
          keyboardType="twitter"
          placeholder="Nome"
          value={nome}
          onChangeText={text => setNome(text)}
        />
        <TextInput
          style={[styles.input]}
          keyboardType="phone-pad"
          placeholder="Telefone"
          value={telefone}
          onChangeText={text => setTelefone(text)}
        />
        <TextInput
          style={[styles.input]}
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={[styles.input]}
          keyboardType="visible-password"
          placeholder="Senha"
          value={senha}
          onChangeText={text => setSenha(text)}
        />
        <TextInput
          style={[styles.input]}
          keyboardType="default"
          placeholder="Usuário"
          value={usuario}
          onChangeText={text => setUsuario(text)}
        />
        <TouchableOpacity style={styles.button} onPress={salvarDadosUsuario}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  input: {
    alignSelf: 'center',
    width: '85%',
    height: 35,
    borderWidth: 2,
    borderColor: '#173540',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 13,
    backgroundColor: "#fff",
    color: "#161F30",
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#84B026',
    padding: 10,
    borderRadius: 20,
    width: 90,
  },
  buttonText: {
    textAlign: "center",
    color: '#fff',
    fontWeight: 'bold',
  },
});
