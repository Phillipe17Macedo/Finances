import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { buscarDadosDoBanco, atualizarDadosNoBanco } from '../../conection/firebaseDB';

// Definição do tipo Usuario
interface Usuario {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  usuario: string;
}

export default function Home() {
  const [dadosDoBanco, setDadosDoBanco] = useState<Usuario[]>([]);
  const [tipoUsuario, setTipoUsuario] = useState<string>("");
  const [dadosUsuarioEditado, setDadosUsuarioEditado] = useState<Usuario | null>(null); // Alterado para permitir null
  const [dadosEditados, setDadosEditados] = useState<boolean>(false);

  const handleBuscarDados = async () => {
    try {
      const dados: Usuario[] = await buscarDadosDoBanco();
      setDadosDoBanco(dados);
    } catch (error) {
      console.error("Erro ao buscar dados no banco:", error);
      Alert.alert("Erro", "Ocorreu um erro ao buscar os dados no banco de dados.");
    }
  };

  const isAdministrador = () => {
    return tipoUsuario === "admin";
  };

  const handleSalvarEdicao = () => {
    try {
      if (!dadosUsuarioEditado) {
        throw new Error('Nenhum usuário em edição.');
      }
      const usuarioId = dadosUsuarioEditado.id;
      if (typeof usuarioId !== 'string' || usuarioId === '') {
        throw new Error('ID do usuário inválido.');
      }
      atualizarDadosNoBanco(usuarioId, dadosUsuarioEditado);
      setDadosUsuarioEditado(null); // Alterado para null após salvar
      setDadosEditados(false);
    } catch (error) {
      console.error("Erro ao salvar dados no banco:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar os dados no banco de dados.");
    }
  };

  const handleExcluirUsuario = (usuario: string) => {
    setDadosDoBanco(dadosDoBanco.filter(item => item.usuario !== usuario));
  };

  const handleChangeText = (key: keyof Usuario, value: string) => {
    if (!dadosUsuarioEditado) return;
    setDadosUsuarioEditado({ ...dadosUsuarioEditado, [key]: value });
    setDadosEditados(true);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TextInput
            style={[styles.input]}
            keyboardType="default"
            placeholder="Tipo Usuario"
            onChangeText={setTipoUsuario}
          />
          <TouchableOpacity style={styles.button} onPress={handleBuscarDados}>
            <Text style={styles.buttonText}>Buscar Dados</Text>
          </TouchableOpacity>
          {dadosDoBanco.map((item, index) => (
            <View key={index} style={styles.dadosContainer}>
              {isAdministrador() ? (
                <>
                  <TextInput
                    style={styles.inputField}
                    value={(dadosUsuarioEditado && dadosUsuarioEditado.nome) || item.nome}
                    onChangeText={(value) => handleChangeText('nome', value)}
                    placeholder="Nome"
                  />
                  <TextInput
                    style={styles.inputField}
                    value={(dadosUsuarioEditado && dadosUsuarioEditado.telefone) || item.telefone}
                    onChangeText={(value) => handleChangeText('telefone', value)}
                    placeholder="Telefone"
                  />
                  <TextInput
                    style={styles.inputField}
                    value={(dadosUsuarioEditado && dadosUsuarioEditado.email) || item.email}
                    onChangeText={(value) => handleChangeText('email', value)}
                    placeholder="Email"
                  />
                  <TextInput
                    style={styles.inputField}
                    value={(dadosUsuarioEditado && dadosUsuarioEditado.usuario) || item.usuario}
                    onChangeText={(value) => handleChangeText('usuario', value)}
                    placeholder="Usuário"
                  />
                </>
              ) : (
                <>
                  <Text style={styles.dadosText}>Nome: {item.nome}</Text>
                  <Text style={styles.dadosText}>Telefone: {item.telefone}</Text>
                  <Text style={styles.dadosText}>Email: {item.email}</Text>
                  <Text style={styles.dadosText}>Usuário: {item.usuario}</Text>
                </>
              )}
              {isAdministrador() && (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => {
                      setDadosUsuarioEditado({ ...item });
                      setDadosEditados(false);
                    }}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  {dadosEditados && (
                    <TouchableOpacity 
                      style={styles.saveButton}
                      onPress={handleSalvarEdicao}
                    >
                      <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleExcluirUsuario(item.usuario)}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
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
    width: '80%',
    height: 40,
    marginTop: 20,
    borderWidth: 4,
    borderColor: '#173540',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#161F30",
    fontWeight: "bold"
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#84B026',
    padding: 10,
    borderRadius: 20,
    width: 120,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: '#fff',
    fontWeight: 'bold',
  },
  dadosContainer: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  dadosText: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputField: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    width: '30%',
  },
  deleteButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 20,
    width: '30%',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 20,
    width: '30%',
  },
});
