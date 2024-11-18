import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

import { LogoEmployee } from "../../components/LogoEmployee";
import { SignOut } from "../../components/SignOut";

import { styles } from "./styles";
import { colors } from "../../config/colors";

import moment from "moment";
import Toast from "react-native-toast-message";

import { useNavigation } from "@react-navigation/native";

export function HomeEmployeeScreen() {
  const { user, userEmployer } = useContext(AuthContext);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userEmployerId, setUserEmployerId] = useState(false);

  const [todayRegistrationAlready, setTodayRegistrationAlready] =
    useState(false);
  const [registrationArrivalSucess, setRegistrationArrivalSuccess] =
    useState(false);
  const [registrationExitError, setRegistrationExitError] = useState(false);
  const [registrationExitDoneError, setRegistrationExitDoneError] =
    useState(false);

  const navigation = useNavigation();

  async function handleRegisterArrival() {
    try {
      setButtonDisabled(true);

      if (userEmployer.idhash === "") {
        setUserEmployerId(true);
        setButtonDisabled(false);
        return;
      }

      const dateToday = new Date();
      const dateTodayFormat = moment.utc(dateToday).format("YYYY-MM-DD");

      const response = await api.get("/register-last-two-record-employee", {
        params: {
          date_employee: dateTodayFormat,
          id_employee: user.id,
          id_employer: userEmployer.idhash,
        },
      });

      if (Array.isArray(response.data) && response.data.length === 0) {
        try {
          const response_register = await api.post("/register", {
            id_user: user.id,
            id_employer: userEmployer.idhash,
          });
          setRegistrationArrivalSuccess(true);
        } catch (error) {
          console.log("ERRO REGISTER REQUEST", error);
        }
      }

      if (Array.isArray(response.data) && response.data.length > 0) {
        setTodayRegistrationAlready(true);
        setButtonDisabled(false);
        return;
      }

      setButtonDisabled(false);
    } catch (error) {
      console.log("ERRO REQUEST", error);
      setButtonDisabled(false);
    }
  }

  useEffect(() => {
    if (userEmployerId) {
      showToastError();
      setUserEmployerId(false);
    }
  }, [userEmployerId]);

  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: "Vincule sua conta a um empregador.",
      text2: "👉 Conecte-se ao seu empregador, clique aqui.",
      onPress: () => navigation.navigate("EmployeeReadIdScreen"),
      visibilityTime: 5000,
    });
  };

  useEffect(() => {
    if (todayRegistrationAlready) {
      showToastErrorRegistration();
      setTodayRegistrationAlready(false);
    }
  }, [todayRegistrationAlready]);

  const showToastErrorRegistration = () => {
    Toast.show({
      type: "error",
      text1: "Seu registro de entrada já foi realizado hoje.",
    });
  };

  useEffect(() => {
    if (registrationArrivalSucess) {
      showToastRegistrationArrivalSuccess();
      setRegistrationArrivalSuccess(false);
    }
  }, [registrationArrivalSucess]);

  const showToastRegistrationArrivalSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Seu ponto foi registrado com sucesso! Obrigado.",
    });
  };

  async function handleRegisterExit() {
    try {
      setButtonDisabled(true);

      if (userEmployer.idhash === "") {
        setUserEmployerId(true);
        setButtonDisabled(false);
        return;
      }

      const dateToday = new Date();
      const dateTodayFormat = moment(dateToday).format("YYYY-MM-DD");

      const response = await api.get("/register-last-two-record-employee", {
        params: {
          date_employee: dateTodayFormat,
          id_employee: user.id,
          id_employer: userEmployer.idhash,
        },
      });

      if (Array.isArray(response.data) && response.data.length == 1) {
        try {
          const response_register = await api.post("/register", {
            id_user: user.id,
            id_employer: userEmployer.idhash,
          });
          setRegistrationArrivalSuccess(true);
        } catch (error) {
          console.log("ERRO REGISTER REQUEST", error);
        }
      }

      if (Array.isArray(response.data) && response.data.length > 1) {
        setRegistrationExitDoneError(true);
        setButtonDisabled(false);
        return;
      }

      if (Array.isArray(response.data) && response.data.length === 0) {
        setRegistrationExitError(true);
        setButtonDisabled(false);
        return;
      }

      setButtonDisabled(false);
    } catch (error) {
      console.log("ERRO REQUEST", error);
      setButtonDisabled(false);
    }
  }

  useEffect(() => {
    if (registrationExitError) {
      showToastRegistrationExitError();
      setRegistrationExitError(false);
    }
  }, [registrationExitError]);

  const showToastRegistrationExitError = () => {
    Toast.show({
      type: "error",
      text1:
        "Para dar início ao seu expediente, registre seu ponto de entrada.",
    });
  };

  useEffect(() => {
    if (registrationExitDoneError) {
      showToastRegistrationExitDoneError();
      setRegistrationExitDoneError(false);
    }
  }, [registrationExitDoneError]);

  const showToastRegistrationExitDoneError = () => {
    Toast.show({
      type: "success",
      text1: "Ótimo trabalho! Seus registros estão todos em dia.",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerLogo}>
        <LogoEmployee />
        <SignOut />
      </View>

      <View style={styles.containerButtonAction}>
        <TouchableOpacity
          style={[
            styles.registerButton,
            styles.registerStart,
            buttonDisabled && styles.registerButtonDisabled,
          ]}
          onPress={handleRegisterArrival}
          disabled={buttonDisabled}
        >
          <MaterialCommunityIcons
            name="timeline-plus-outline"
            size={58}
            color={colors.pewter}
          />
          <Text style={[styles.registerText, styles.registerTextTitle]}>
            Registre sua chegada:
          </Text>
          <Text style={styles.registerText}>
            Ao clicar neste botão, você está registrando o momento em que você
            começa seu dia de trabalho na casa do seu empregador. Isso nos ajuda
            a manter um registro preciso das suas horas trabalhadas.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.registerButton,
            styles.registerStop,
            buttonDisabled && styles.registerButtonDisabled,
            Platform.OS === "ios" && styles.buttonMarginBottom0,
          ]}
          onPress={handleRegisterExit}
          disabled={buttonDisabled}
        >
          <Entypo name="stopwatch" size={58} color={colors.pewter} />
          <Text style={[styles.registerText, styles.registerTextTitle]}>
            Registre sua saída:
          </Text>
          <Text style={styles.registerText}>
            Ao clicar neste botão, você está registrando o momento em que
            encerra seu dia de trabalho na casa do seu empregador. Isso nos
            ajuda a acompanhar suas horas trabalhadas e garantir que você seja
            devidamente compensada pelo seu tempo.
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
