import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Image, Text, Platform, TextInput, TouchableOpacity, Alert } from 'react-native';
import { buscarDadosDoBanco, atualizarDadosNoBanco } from '../../conection/firebaseDB'; // Importe a função que realiza a busca no banco de dados

export default function Home() {
  const [dadosDoBanco, setDadosDoBanco] = useState([]);
  const [tipoUsuario, setTipoUsuario] = useState(""); // Estado para armazenar o tipo de usuário
  const [dadosUsuarioEditado, setDadosUsuarioEditado] = useState({}); // Estado para armazenar os dados do usuário em edição
  const [dadosEditados, setDadosEditados] = useState(false); // Estado para verificar se houve alterações nos dados editados

  const handleBuscarDados = async () => {
    try {
      const dados = await buscarDadosDoBanco(); // Função que realiza a busca no banco de dados
      setDadosDoBanco(dados); // Atualiza o estado com os dados retornados do banco
    } catch (error) {
      console.error("Erro ao buscar dados no banco:", error);
      Alert.alert("Erro", "Ocorreu um erro ao buscar os dados no banco de dados.");
    }
  };

  // Função para verificar se o usuário é administrador
  const isAdministrador = () => {
    return tipoUsuario === "admin";
  };

  const handleSalvarEdicao = () => {
    try {
      // Extrair o ID do usuário dos dados editados
      const usuarioId = dadosUsuarioEditado.id; // Supondo que o ID do usuário seja armazenado como 'id' nos dados do usuário editado
  
      // Verificar se o ID do usuário é uma string válida
      if (typeof usuarioId !== 'string' || usuarioId === '') {
        throw new Error('ID do usuário inválido.');
      }
  
      // Chamar a função para atualizar os dados no banco de dados
      atualizarDadosNoBanco(usuarioId, dadosUsuarioEditado);
  
      // Limpar os estados de dados editados e usuário editado
      setDadosUsuarioEditado({});
      setDadosEditados(false);
    } catch (error) {
      console.error("Erro ao salvar dados no banco:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar os dados no banco de dados.");
    }
  };
  

  // Função para excluir o usuário
  const handleExcluirUsuario = (usuario) => {
    // Adicione a lógica para excluir o usuário
    // Por exemplo, você pode enviar uma solicitação para excluir o usuário do banco de dados
    // e depois atualizar a lista de dados do banco de dados removendo o usuário excluído
    setDadosDoBanco(dadosDoBanco.filter(item => item.usuario !== usuario));
  };

  // Função para atualizar o estado de dados editados ao digitar nos campos de entrada
  const handleChangeText = (key, value) => {
    setDadosUsuarioEditado({ ...dadosUsuarioEditado, [key]: value });
    setDadosEditados(true); // Define que houve alterações nos dados editados
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
            onChangeText={setTipoUsuario} // Atualiza o estado do tipo de usuário
          />
          <TouchableOpacity style={styles.button} onPress={handleBuscarDados}>
            <Text style={styles.buttonText}>Buscar Dados</Text>
          </TouchableOpacity>
          {/* Exibe os dados do banco */}
          {dadosDoBanco.map((item, index) => (
            <View key={index} style={styles.dadosContainer}>
              {/* Renderiza os TextInput para edição apenas se o usuário for administrador */}
              {isAdministrador() ? (
                <>
                  <TextInput
                    style={styles.inputField}
                    value={dadosUsuarioEditado.nome || item.nome}
                    onChangeText={(value) => handleChangeText('nome', value)}
                    placeholder="Nome"
                  />
                  <TextInput
                    style={styles.inputField}
                    value={dadosUsuarioEditado.telefone || item.telefone}
                    onChangeText={(value) => handleChangeText('telefone', value)}
                    placeholder="Telefone"
                  />
                  <TextInput
                    style={styles.inputField}
                    value={dadosUsuarioEditado.email || item.email}
                    onChangeText={(value) => handleChangeText('email', value)}
                    placeholder="Email"
                  />
                  <TextInput
                    style={styles.inputField}
                    value={dadosUsuarioEditado.usuario || item.usuario}
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
              {/* Renderiza os botões de ação apenas se o usuário for administrador */}
              {isAdministrador() && (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => {
                      setDadosUsuarioEditado(item);
                      setDadosEditados(false); // Ao clicar em editar, os dados ainda não foram editados
                    }}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  {/* Renderiza o botão de salvar apenas se houver dados editados */}
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
                    onPress={() => handleExcluirUsuario(item.usuario)} // Passando o usuário como parâmetro para a função
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
