import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";

import { styles } from "./styles";

import { LogoEmployee } from "../../components/LogoEmployee";
import { SignOut } from "../../components/SignOut";
import { colors } from "../../config/colors";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { FlashList } from "@shopify/flash-list";

type DataListRegisterProps = {
  id: string;
  register: string;
}

export function EmployeeRegisterListScreen() {
  const { user, userEmployer } = useContext(AuthContext);

  const navigation = useNavigation();

  const [dataListRegister, setDataListRegister] = useState<DataListRegisterProps[] | []>([]);

  const userEmployerName = userEmployer.name;
  const employerNameEdit = userEmployerName.split(" ")[0];

  useEffect(() => {
    async function loadDataListRegister() {
      const response = await api.get("/register-list-employee", {
        params: {
          id_user: user.id, 
          id_employer: userEmployer.idhash 
        },
      });

      setDataListRegister(response.data)
    }

    loadDataListRegister();
  }, [dataListRegister])
  
  async function handleGoReadID() {
    navigation.navigate("EmployeeReadIdScreen");
  }

  if (!userEmployer.idhash) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerLogo}>
          <LogoEmployee />
          <SignOut />
        </View>

        <View style={styles.containerMessage}>
          <Text style={styles.messageAreaTxt}>Para ver a lista de registros, conecte sua conta a um empregador.</Text>
          <TouchableOpacity style={styles.messageButton} onPress={handleGoReadID}>
            <Text style={styles.messageButtonTxt}>Clique aqui para 'Vincular a um empregador'.</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerLogo}>
        <LogoEmployee />
        <SignOut />
      </View>

      <View style={styles.containerList}>
        <FlashList
          data={dataListRegister}
          renderItem={({ item, index }) => 
            <View style={[styles.cardDate, index%2 !== 0 && styles.dateExit]}>
              <View style={styles.cardDateInternal}>
                <View style={styles.cardDateInternalFlex}>
                  <MaterialCommunityIcons
                    name={index%2 === 0 ? "clock-start" : "clock-end"}
                    size={24}
                    color={colors.gray}
                  />
                  <Text style={styles.dateEntrance}>{moment.utc(item.register).format("DD/MM/YYYY")} | {moment.utc(item.register).local().format("HH:mm")}</Text>
                </View>
                <View style={styles.userIconEmployer}>
                  <FontAwesome5 name="house-user" size={14} color={colors.gray} />
                  <Text style={styles.userNameEmployer}>{employerNameEdit}</Text>
                </View>
              </View>
            </View>
          }
          estimatedItemSize={120}
        />
      </View>
    </SafeAreaView>
  );
}
