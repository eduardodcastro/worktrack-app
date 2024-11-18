import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

export function Welcome() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require("../../assets/img/logo.png")}
          style={styles.imageLogo}
          resizeMode="contain"
        />
      </View>

      <Animatable.View
        animation="fadeInUp"
        delay={600}
        style={styles.containerForm}
      >
        <Text style={[styles.textTitle, styles.textTitleTop]}>
          Olá! Seja bem-vindo ao nosso aplicativo.
        </Text>
        <Text style={[styles.textTitle, styles.textDescription]}>
          Aqui, você pode registrar seus horários de entrada e saída do trabalho
          de maneira simples e organizada, mantendo o controle de seus registros
          com facilidade.
        </Text>
        <Text style={styles.textLogin}>Faça o login para começar.</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
