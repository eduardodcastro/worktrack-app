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

import { LogoEmployee } from "../../components/LogoEmployee";
import { SignOut } from "../../components/SignOut";

import { CameraView, useCameraPermissions } from "expo-camera";

import { styles } from "./styles";
import { colors } from "../../config/colors";
import { dimensions } from "../../config/getDimensions";

import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

import Toast from "react-native-toast-message";

export function EmployeeReadIdScreen() {
  const { userEmployer, userEmployerUpdateScann } = useContext(AuthContext);

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [opennedCamera, setOpennedCamera] = useState(false);

  const [linkedUser, setLinkedUser] = useState(false);
  const [errorScannEmployer, setErrorScannEmployer] = useState(false);

  const userEmployerName = userEmployer.name;
  const employerNameEdit = userEmployerName.split(" ")[0];

  useEffect(() => {
    if (userEmployer.name) {
      setLinkedUser(true);
    }
  }, []);

  async function handleBarCodeScanned({ type, data }: any) {
    setScanned(true);
    setLinkedUser(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    if (data === "") {
      return;
    }

    try {
      const response = await api.get("/user-employer", {
        params: {
          user_idhash: data,
        },
      });

      await AsyncStorage.setItem(
        "@credentialsUserEmployer",
        JSON.stringify(response.data)
      );

      const { name, idhash } = response.data;
      userEmployerUpdateScann(name, idhash);
    } catch (error) {
      setErrorScannEmployer(true);
      setLinkedUser(false);
      console.log("ERRO IDHASH SCAN", error);
    }

    setOpennedCamera(false);
  }

  const handleOpennedCamera = () => {
    setScanned(false);
    setOpennedCamera(true);
  };

  useEffect(() => {
    if (errorScannEmployer) {
      showToastError();
      setErrorScannEmployer(false);
    }
  }, [errorScannEmployer]);

  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: "Infelizmente, não encontramos este empregador.",
      text2: "Por favor, tente novamente.",
    });
  };

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionCameraArea}>
          <ActivityIndicator size={25} color={colors.navyBlue} />
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionCameraArea}>
          <Text style={styles.permissionCameraAreaTxt}>
            Precisamos da sua permissão para usar a câmera.
          </Text>
          <TouchableOpacity
            onPress={requestPermission}
            style={styles.permissionCameraButton}
          >
            <Text style={styles.permissionCameraButtonTxt}>
              Conceder permissão
            </Text>
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

      {opennedCamera && (
        <>
          <CameraView
            style={styles.camera}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
          <Ionicons
            name="scan"
            size={dimensions(78)}
            color={colors.coral}
            style={styles.iconCamera}
          />
          <Text style={styles.txtCameraOpen}>
            Posicione o código QR do seu empregador dentro da moldura da câmera.
          </Text>
          <View style={styles.containerToScanAgain}>
            <TouchableOpacity
              onPress={() => setOpennedCamera(false)}
              style={styles.openCameraButton}
            >
              <MaterialCommunityIcons
                name="camera-off"
                size={48}
                color={colors.mistyBlue}
              />
              <Text
                style={[
                  styles.openCameraButtonTxt,
                  styles.openCameraButtonTxtSmall,
                ]}
              >
                Fechar câmera
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {opennedCamera && scanned && (
        <View style={styles.containerToScanAgain}>
          <TouchableOpacity
            onPress={() => setScanned(false)}
            style={styles.openCameraButton}
          >
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={48}
              color={colors.mistyBlue}
            />
            <Text
              style={[
                styles.openCameraButtonTxt,
                styles.openCameraButtonTxtSmall,
              ]}
            >
              Toque para digitalizar novamente
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!opennedCamera && (
        <View style={styles.containerOpenCamera}>
          {!linkedUser ? (
            <View style={styles.containerInstructions}>
              <Text style={styles.instructionsText}>
                Conecte-se com seu empregador em um piscar de olhos!
              </Text>
              <Text style={styles.instructionsText}>
                Com o nosso aplicativo, vincular-se ao seu empregador é mais
                fácil do que nunca!
              </Text>
              <Text
                style={[styles.instructionsText, styles.instructionsTextMT]}
              >
                Siga estes passos simples:
              </Text>
              <Text style={styles.instructionsText}>
                1. Toque no botão "Abrir Câmera".
              </Text>
              <Text style={styles.instructionsText}>
                2. Posicione o código QR do seu empregador dentro da moldura da
                câmera.
              </Text>
              <Text style={styles.instructionsText}>
                3. O aplicativo reconhecerá automaticamente o código QR e
                vinculará você ao seu empregador.
              </Text>
            </View>
          ) : (
            <View style={styles.containerLinkedUser}>
              <FontAwesome5
                name="house-user"
                size={60}
                color={colors.tealGreen}
              />
              <Text style={styles.linkedUserTxt}>{employerNameEdit}</Text>
            </View>
          )}

          <View style={styles.containerOpenCameraButton}>
            <TouchableOpacity
              onPress={handleOpennedCamera}
              style={styles.openCameraButton}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={48}
                color={colors.mistyBlue}
              />
              <Text style={styles.openCameraButtonTxt}>
                {!linkedUser ? "Abrir Câmera" : "Trocar Empregador"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Toast />
    </SafeAreaView>
  );
}
