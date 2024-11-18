import React, { useState, createContext, ReactNode, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  errorLogin: boolean;
  signOut: () => Promise<void>;
  statusLoginError: () => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  registerSuccess: boolean;
  statusRegisterSuccess: (status: boolean) => Promise<void>;

  userEmployer: UserEmployerProps;
  userEmployerUpdateScann: (name: string, idhash: string) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  idhash: string;
  role: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
  role: string;
};

type UserEmployerProps = {
  name: string;
  idhash: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    idhash: "",
    role: "",
    token: "",
  });

  const [userEmployer, setUserEmployer] = useState<UserEmployerProps>({
    name: "",
    idhash: "",
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorLogin, setErrorLogin] = useState(false);

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const isAuthenticated = !!user.idhash;

  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem("@credentialsUser");
      let hasUser: UserProps = JSON.parse(userInfo || "{}");

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          idhash: hasUser.idhash,
          role: hasUser.role,
          token: hasUser.token,
        });
      }

      setLoading(false);
    }

    getUser();
  }, []);

  // Verifica se existe um User Employer, adquirido via Qr-code
  useEffect(() => {
    async function getUserEmployer() {
      const userEmployerInfo = await AsyncStorage.getItem("@credentialsUserEmployer");
      let hasUserEmployer: UserEmployerProps = JSON.parse(userEmployerInfo || "{}");

      if (Object.keys(hasUserEmployer).length > 0) {
        setUserEmployer({
          name: hasUserEmployer.name,
          idhash: hasUserEmployer.idhash,
        });
      }

      setLoading(false);
    }

    getUserEmployer();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);
    setErrorLogin(false);

    console.log(email, password);

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, idhash, role, token } = response.data;

      const credentialsUser = {
        ...response.data,
        email: email,
      };

      await AsyncStorage.setItem(
        "@credentialsUser",
        JSON.stringify(credentialsUser)
      );

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
        idhash,
        role,
        token,
      });

      setErrorLogin(false);
      setLoadingAuth(false);
    } catch (error) {
      console.log("ERRO LOGIN ACESSO", error);
      setErrorLogin(true);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: "",
        name: "",
        email: "",
        idhash: "",
        role: "",
        token: "",
      });

      setUserEmployer({
        name: "",
        idhash: "",
      })
    });
  }

  async function statusLoginError() {
    setErrorLogin(false);
  }

  async function signUp({ name, email, password, role }: SignUpProps) {
    setLoadingAuth(true);
    setErrorLogin(false);

    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
        role,
      });

      setErrorLogin(false);
      setLoadingAuth(false);
      setRegisterSuccess(true);
    } catch (error) {
      console.log("ERRO REGISTRAR USUARIO", error);
      setErrorLogin(true);
      setLoadingAuth(false);
    }
  }

  async function statusRegisterSuccess(status: boolean) {
    setRegisterSuccess(status);
  }

  async function userEmployerUpdateScann(name: string, idhash: string) {
    setUserEmployer({
      name: name,
      idhash: idhash,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        loading,
        loadingAuth,
        errorLogin,
        signOut,
        statusLoginError,
        signUp,
        registerSuccess,
        statusRegisterSuccess,
        userEmployer,
        userEmployerUpdateScann
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
