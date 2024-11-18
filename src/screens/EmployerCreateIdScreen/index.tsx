import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { LogoEmployer } from "../../components/LogoEmployer";
import { SignOut } from "../../components/SignOut";

import { styles } from "./styles";
import { colors } from "../../config/colors";
import { dimensions } from "../../config/getDimensions";

import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

import Toast from "react-native-toast-message";

export function EmployerCreateIdScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerLogo}>
        <LogoEmployer />
        <SignOut />
      </View>

      <Toast />
    </SafeAreaView>
  );
}
