import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useLocalStorage("token", null);
  const [ userId, setUserId ] = useState(-1);
  const navigate = useNavigate();

  // throwing verify function in here
  const verify = async () => {
    const res = await fetch(
        "/api/verify", {
            method: "GET",
            headers: {
                "authorization": window.localStorage.getItem("token"),
            },
        }
    )
    const parseRes = await res.json();
    console.log(parseRes.success)
    console.log(parseRes.id)

    if (parseRes.success) {
      setUserId(parseRes.id)
    }
    else {
      setUser(null);
      setUserId(-1)
    }
  };

  const register = async (data) => {
    try {
      const { first_name, last_name, username, password } = data;
      const res = await fetch(
          "/api/register", {
              method: "POST",
              headers: {
                  "Content-type": "application/json"
              },
              body: JSON.stringify({ first_name, last_name, username, password })
          }
      );

      const parseRes = await res.json();

      if (parseRes.jwtToken) {
          setUser(parseRes.jwtToken);
          navigate("/dashboard");
      }
      console.log(user)
    } catch (err) {
        console.error(err.message);
    }
  };

  // call this function when you want to authenticate the user
  const login = async (data) => {
    try {
        const { username, password } = data;
        const res = await fetch(
            "/api/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ username, password })
            }
        );

        const parseRes = await res.json();

        if (parseRes.jwtToken) {
            setUser(parseRes.jwtToken);
            navigate("/dashboard");
        }
        console.log(user)
    } catch (err) {
        console.error(err.message);
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      userId,
      verify,
      register,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};