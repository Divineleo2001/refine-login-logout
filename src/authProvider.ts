import { AuthBindings } from "@refinedev/core";
// import axios from "axios";

const mockUsers = [
  {
    email: "admin@localhost.com",
    username: "admin",
    password: "admin",
    rememberMe: true,
  },
  {
    email: "user@localhost.com",
    username: "user",
    password: "user",
    rememberMe: true,
  },
];

export const TOKEN_KEY = "";
export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    let username = email.split("@")[0];

    const data = {
      username,
      password,
    };
    // username = email.split('@')[0]
    const response = await fetch(
      "http://backend-server:8080/api/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    console.log(responseData);
    // console.log(JSON.stringify(response))
    // const id_token = response.id_token;
    // const user = mockUsers.find((item) => item.email === email);

    if (responseData.id_token) {
      localStorage.setItem("auth", responseData.id_token);
      return {
        redirectTo: "/",
        success: true,
      };
    }
    return {
      success: false,
      error: {
        name: "Login Error",
        message: "Invalid username or password",
      }
    }
   
  },
  // if (((username || mockUsers.username) && password) || mockUsers.password) {
  //   localStorage.setItem(TOKEN_KEY, username);
  //   return {
  //     success: true,
  //     redirectTo: "/",
  //   };
  // }

  // return {
  //   success: false,
  //   error: {
  //     name: "LoginError",
  //     message: "Invalid username or password",
  //   },
  // };
  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem("auth");
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem("auth");
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
