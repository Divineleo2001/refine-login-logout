import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import React, { useEffect } from "react";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import {
  PatientCreate,
  PatientEdit,
  PatientList,
  PatientShow,
} from "./pages/patients";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import axios from "axios";



const axiosInstance = axios.create() 

const tokenO = localStorage.getItem("auth");


console.log(tokenO)
// console.log(axiosInstance)

axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("auth"));
  // console.log(token)
  if (config.headers) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

function App() {
  const data = {
    username: "admin",
    password: "admin",
    rememberMe: true,
  };



  // const response = async() => await fetch(
  //   "http://backend-server:8080/api/authenticate",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json", // Adjust the content type based on your API requirements
  //     },
  //     body: JSON.stringify({
  //       data
  //     }),
  //   }
  // );

  // console.log(response)

  // fetch("http://backend-server:8080/api/authenticate", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json", // Adjust the content type based on your API requirements
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => response.json()) // Parse the JSON response
  //   .then((responseData) => {
  //     // Handle the response data
  //     console.log(responseData);
  //   })
  //   .catch((error) => {
  //     // Handle errors
  //     console.error("Error:", error);
  //   });



  // hey how are you doing 
  // Where are you from?



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://backend-server:8080/api/authenticate",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json", //Adjust the content type based on your API requirements
  //           },
  //           body: JSON.stringify(data),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Something went wrong!");
  //       }
  //       const responseData = await response.json();
  //       // console.log(responseData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  //   // const id_token = await fetchData();
  // }, []);



  // const request = new Request("http://backend-server:8080/api/authenticate", {
  //   method: "POST",
  //   body: JSON.stringify({ username, password,rememberMe }),
  //   headers: new Headers({ "Content-Type": "application/json" }),
  // });
  // console.log(request.body);

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={{
                  default: dataProvider("https://api.fake-rest.refine.dev"),
                  patients: dataProvider("http://backend-server:8080/api")
                }}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "patients",
                    list: "/patients",
                    create: "/patients/create",
                    edit: "/patients/edit/:id",
                    show: "/patients/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "blog_posts",
                    list: "/blog-posts",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "beLHph-SwFAzu-ewVCDh",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                    <Route path="/patients">
                      <Route index element={<PatientList />} />
                      <Route path="create" element={<PatientCreate />} />
                      <Route path="edit/:id" element={<PatientEdit />} />
                      <Route path="show/:id" element={<PatientShow />} />
                    </Route>
                    <Route path="/blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
