import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

import { LogoEmployer } from "../../components/LogoEmployer";
import { SignOut } from "../../components/SignOut";
import { colors } from "../../config/colors";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { FlashList } from "@shopify/flash-list";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

type DataListRegisterProps = {
  id: string;
  register: string;
  user: UserEmployer;
};

interface UserEmployer {
  name: string;
}

interface Printer {
  url: string;
  // Other properties
}

export function HomeEmployerScreen() {
  const { user } = useContext(AuthContext);

  const navigation = useNavigation();

  const [dataListRegister, setDataListRegister] = useState<
    DataListRegisterProps[] | []
  >([]);

  const userName = user.name;
  const employerNameEdit = userName.split(" ")[0];

  // console.log(user);
  // console.log(dataListRegister);

  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>();

  useEffect(() => {
    async function loadDataListRegister() {
      const response = await api.get("/register-list-employer", {
        params: {
          id_employer: user.idhash,
        },
      });

      setDataListRegister(response.data);
    }

    loadDataListRegister();
  }, [dataListRegister]);

  if (dataListRegister.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerLogo}>
          <LogoEmployer />
          <SignOut />
        </View>

        <View style={styles.containerMessage}>
          <Text style={styles.messageAreaTxt}>
            Para ver seus registros, peça ao seu empregador para registrar seu
            ponto.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleExportDataToPDF = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  // const printToFile = async () => {
  //   // On iOS/android prints the given html. On web prints the HTML from the current page.
  //   const { uri } = await Print.printToFileAsync({ html });
  //   console.log('File has been saved to:', uri);
  //   await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  // };

  // const selectPrinter = async () => {
  //   const printer = await Print.selectPrinterAsync(); // iOS only
  //   setSelectedPrinter(printer);
  // };

  const htmltable = () => {
    let t = "";
    for (let i in dataListRegister) {
      const item = dataListRegister[i];
      t += `<tr>
        <td>
          ${moment.utc(item.register).format("DD/MM/YYYY")}
          | 
          ${moment.utc(item.register).local().format("HH:mm")}
          </td>
        <td>${item.user.name}</td>
      </tr>`;
    }
    return t;
  };

  const html = `<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <title></title>
    <style>
      table, th, td {
        border:1px solid black;
      }
      
      .table_component {
        overflow: auto;
        width: 100%;
      }

      .table_component table {
        border: 1px solid #dededf;
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        border-spacing: 1px;
        text-align: left;
      }

      .table_component caption {
        caption-side: top;
        text-align: left;
      }

      .table_component th {
        border: 1px solid #dededf;
        color: #000;
        padding: 5px;
      }

      .table_component td {
        border: 1px solid #dededf;
        background-color: #fff;
        color: #000;
        padding: 5px;
      }
    </style>
    <body>
      <div class="table_component" role="region" tabindex="0">
       <table>
        <caption>Ponto Doméstico</caption>
        <thead>
          <tr>
            <th>Data - Horário</th>
            <th>Doméstica</th>
          </tr>
        </thead>
        <tbody>
          ${htmltable()}
        </tbody>
       </table>
      </div>
    </body>
  </html>`;

  // console.log("htmlContent", htmlContent);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerLogo}>
          <LogoEmployer />
          <SignOut />
        </View>

        <View style={styles.containerList}>
          <FlashList
            data={dataListRegister}
            renderItem={({ item, index }) => (
              <View
                style={[styles.cardDate, index % 2 !== 0 && styles.dateExit]}
              >
                <View style={styles.cardDateInternal}>
                  <View style={styles.cardDateInternalFlex}>
                    <MaterialCommunityIcons
                      name={index % 2 === 0 ? "clock-start" : "clock-end"}
                      size={24}
                      color={colors.gray}
                    />
                    <Text style={styles.dateEntrance}>
                      {moment.utc(item.register).format("DD/MM/YYYY")} |{" "}
                      {moment.utc(item.register).local().format("HH:mm")}
                    </Text>
                  </View>
                  <View style={styles.userIconEmployer}>
                    <FontAwesome5
                      name="house-user"
                      size={14}
                      color={colors.gray}
                    />
                    <Text style={styles.userNameEmployer}>
                      {item.user.name}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            estimatedItemSize={120}
          />
        </View>

        <View>
          <Text>1.Aqui tera um botao para filtrar por usuario.</Text>
          <Text>
            2.Também a pessoa podera escolher um periodo de data para exportar.
          </Text>
        </View>
      </SafeAreaView>
      <View>
        <TouchableOpacity
          style={styles.exportButton}
          onPress={handleExportDataToPDF}
        >
          <MaterialCommunityIcons
            name="file-export-outline"
            size={18}
            color={colors.babyBlue}
          />
          <Text style={styles.exportButtonText}>Exportar Lista</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
