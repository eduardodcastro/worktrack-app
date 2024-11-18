import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";

import { styles } from "./styles";

import { LogoEmployer } from "../../components/LogoEmployer";
import { SignOut } from "../../components/SignOut";
import { colors } from "../../config/colors";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { FlashList } from "@shopify/flash-list";

type DataListRegisterProps = {
  id: string;
  register: string;
}

export function EmployerExportDataScreen() {
  const { user, userEmployer } = useContext(AuthContext);

  const navigation = useNavigation();

  const [dataListRegister, setDataListRegister] = useState<DataListRegisterProps[] | []>([]);

  const userEmployerName = userEmployer.name;
  const employerNameEdit = userEmployerName.split(" ")[0];


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerLogo}>
        <LogoEmployer />
        <SignOut />
      </View>

      <View style={styles.containerList}>
        
      </View>
    </SafeAreaView>
  );
}
