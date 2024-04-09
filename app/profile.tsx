import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Image, Text, Platform, TextInput, TouchableOpacity, Alert } from 'react-native';


export default function Profile() {
  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Calcular Quantidade Gasta"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Calcular</Text>
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
    width: 90,
  },
  buttonText: {
    textAlign: "center",
    color: '#fff',
    fontWeight: 'bold',
  },
});
