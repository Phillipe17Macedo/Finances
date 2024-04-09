import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Image, Text, Platform, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Profile() {
  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          style={[styles.input, { marginTop: 25 }]}
          keyboardType="twitter"
          placeholder="Nome"
        />
        <TextInput
          style={[styles.input]}
          keyboardType="phone-pad"
          placeholder="Telefone"
        />
        <TextInput
          style={[styles.input]}
          keyboardType="email-address"
          placeholder="Email"
        />
        <TextInput
          style={[styles.input]}
          keyboardType="visible-password"
          placeholder="Senha"
        />
        <TextInput
          style={[styles.input]}
          keyboardType="default"
          placeholder="Usuário"
        />
        <TouchableOpacity style={styles.button}>
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
