import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position.coords);
      setError(null);
    }, (error) => {
      if(error.code === 1) {
        setError({ code: error.code, description: "The acquisition of the geolocation information failed because the page didn't have the permission to do it." });
      } else if(error.code === 2) {
        setError({ code: error.code, description: "The acquisition of the geolocation failed because at least one internal source of position returned an internal error." });
      } else if(error.code === 3) {
        setError({ code: error.code, description: "The time allowed to acquire the geolocation was reached before the information was obtained." });
      }
    })
  }, []);

  return [position, error];
}