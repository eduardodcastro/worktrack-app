import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../contexts/AuthContext";

import Toast from "react-native-toast-message";

import { colors } from "../../config/colors";
import { styles } from "./styles";

export function SignIn() {
  const { signIn, loadingAuth, errorLogin, statusLoginError } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      return;
    }

    await signIn({ email, password });
  }

  useEffect(() => {
    if (errorLogin) {
      showToastMessage(
        "error",
        "Olá, ocorreu um problema ao tentar acessar.",
        "Por favor, verifique seu email e senha."
      );
      statusLoginError();
    }
  }, [errorLogin]);

  const showToastMessage = (
    typeMessage: string,
    textMessage1: string,
    textMessage2: string
  ) => {
    Toast.show({
      type: typeMessage,
      text1: textMessage1,
      text2: textMessage2,
    });
  };

  async function handleNavigateRegister() {
    setEmail("");
    setPassword("");
    navigation.navigate("Register");
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={styles.imageLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 130}
        style={styles.containerForm}
      >
        <Text style={[styles.textTitle]}>Acessar aplicativo</Text>

        <Text style={[styles.textTitle, styles.labelInput]}>
          Digite seu e-mail
        </Text>
        <TextInput
          autoCapitalize="none"
          inputMode="email"
          placeholder="E-mail"
          placeholderTextColor={colors.blueGrotto}
          style={[styles.input, loadingAuth && styles.inputDisabled]}
          value={email}
          onChangeText={setEmail}
          editable={!loadingAuth}
        />

        <Text style={[styles.textTitle, styles.labelInput]}>
          Digite sua senha
        </Text>
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="Senha"
          placeholderTextColor={colors.blueGrotto}
          style={[styles.input, loadingAuth && styles.inputDisabled]}
          value={password}
          onChangeText={setPassword}
          editable={!loadingAuth}
        />

        <TouchableOpacity style={[styles.button]} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color={colors.navyBlue} />
          ) : (
            <Text style={styles.textButton}>Entrar no App</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonRegister]}
          onPress={handleNavigateRegister}
        >
          <Text style={styles.textButtonRegister}>
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Toast />
    </View>
  );
}
