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

export function Register() {
  const {
    loadingAuth,
    errorLogin,
    statusLoginError,
    signUp,
    registerSuccess,
    statusRegisterSuccess,
  } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [typeEmployer, setTypeEmployer] = useState(false);
  const [typeEmployee, setTypeEmployee] = useState(false);
  const [role, setRole] = useState("");

  async function handleLogin() {
    if (name === "" || email === "" || password === "" || role === "") {
      return;
    }

    await signUp({ name, email, password, role });
  }

  useEffect(() => {
    if (errorLogin) {
      showToastError();
      statusLoginError();
    }
  }, [errorLogin]);

  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: "Encontramos um problema ao tentar cadastrar.",
      text2: "Por favor, verifique novamente os campos abaixo.",
    });
  };

  useEffect(() => {
    function getResponseRegister() {
      if (registerSuccess) {
        showToastSuccess();
        statusRegisterSuccess(false);
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        setTypeEmployee(false);
        setTypeEmployer(false);
      }
    }

    getResponseRegister();
  }, [registerSuccess]);

  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Seu cadastro foi concluído com êxito.",
      text2: "👉 Faça login agora mesmo, clicando aqui.",
      onPress: () => navigation.navigate("SignIn"),
      autoHide: false,
    });
  };

  function handleStatusTypeUserButton(typeSelected: string) {
    if (typeSelected === "EMPLOYEE") {
      setTypeEmployee(true);
      setTypeEmployer(false);
    } else {
      setTypeEmployer(true);
      setTypeEmployee(false);
    }

    setRole(typeSelected);
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 200}
        style={styles.containerForm}
      >
        <Text style={[styles.textTitle]}>
          Preencha os dados para se cadastrar
        </Text>

        <Text style={[styles.textTitle, styles.labelInput]}>
          Digite seu nome
        </Text>
        <TextInput
          autoCapitalize="none"
          inputMode="email"
          placeholder="Nome"
          placeholderTextColor={colors.blueGrotto}
          style={[styles.input, loadingAuth && styles.inputDisabled]}
          value={name}
          onChangeText={setName}
          editable={!loadingAuth}
        />

        <Text style={[styles.textTitle, styles.labelInput]}>
          Digite seu e-mail
        </Text>
        <TextInput
          autoCapitalize="none"
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

        <Text style={[styles.textTitle, styles.labelInput]}>
          Selecione o tipo de usuário
        </Text>
        <View style={[styles.containerRole]}>
          <TouchableOpacity
            style={[
              styles.buttonRole,
              typeEmployee && styles.buttonRoleDisabled,
            ]}
            disabled={typeEmployee || loadingAuth}
            onPress={() => {
              handleStatusTypeUserButton("EMPLOYEE");
            }}
          >
            <Text
              style={[styles.textRole, typeEmployee && styles.textRoleDisabled]}
            >
              Doméstica
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonRole,
              typeEmployer && styles.buttonRoleDisabled,
            ]}
            disabled={typeEmployer || loadingAuth}
            onPress={() => {
              handleStatusTypeUserButton("EMPLOYER");
            }}
          >
            <Text
              style={[styles.textRole, typeEmployer && styles.textRoleDisabled]}
            >
              Empregador
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.button]} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color={colors.navyBlue} />
          ) : (
            <Text style={styles.textButton}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Toast />
    </View>
  );
}
