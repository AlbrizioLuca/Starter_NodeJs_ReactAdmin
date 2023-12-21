import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    const request = new Request("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((json) => {
        console.log("hello");
        if (json.status === 401) {
          throw new Error(json.message);
        }
        localStorage.setItem("username", username);
        localStorage.setItem("token", json.token);
      });
  },
  logout: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
  getIdentity: () => {
    const username = localStorage.getItem("username");
    if (username) {
      return Promise.resolve({ id: username, fullName: username });
    } else {
      throw new Error("No user is currently logged in.");
    }
  },
};

// import { AuthProvider, HttpError } from "react-admin";
// import data from "./users.json";

// /**
//  * This authProvider is only for test purposes. Don't use it in production.
//  */
// export const authProvider: AuthProvider = {
//   login: ({ username, password }) => {
//     const user = data.users.find(
//       (u) => u.username === username && u.password === password
//     );

//     if (user) {
//       // eslint-disable-next-line no-unused-vars
//       let { password, ...userToPersist } = user;
//       localStorage.setItem("user", JSON.stringify(userToPersist));
//       return Promise.resolve();
//     }

//     return Promise.reject(
//       new HttpError("Unauthorized", 401, {
//         message: "Invalid username or password",
//       })
//     );
//   },
//   logout: () => {
//     localStorage.removeItem("user");
//     return Promise.resolve();
//   },
//   checkError: () => Promise.resolve(),
//   checkAuth: () =>
//     localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
//   getPermissions: () => {
//     return Promise.resolve(undefined);
//   },
//   getIdentity: () => {
//     const persistedUser = localStorage.getItem("user");
//     const user = persistedUser ? JSON.parse(persistedUser) : null;

//     return Promise.resolve(user);
//   },
// };

// export default authProvider;
