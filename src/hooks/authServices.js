import { useEffect, useState } from "react";
import { SaveStorage } from "../utils/AsyncStorage";
import { fetchContent } from "../utils/fetchContent";

export const Validation = ({ email, password }) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const body = {
    email,
    password,
  };

  useEffect(() => {
    if (email && password && !token) {
      fetchContent("http://challenge-react.alkemy.org/", {
        method: "post",
        body,
      })
        .then(({ token }) => {
          setToken(token);
          SaveStorage("token", token);
        })
        .catch((err) => {
          setError(err);
        });
    }
    setError(null);
  }, [email, password]);

  return {
    token,
    error,
  };
};
