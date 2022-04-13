import { useState, useEffect } from "react";
import axios from "axios";

const useGoogleAddress = address => {
  const [map, setMap] = useState({lat: 0, lng: 0});
  const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDxahjeRbp43dNb0PaSHzGkrJ-HLbeU2X0`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(API);
      setMap(response.data.results[0].geometry.location);
    }
    fetchData();
  }, []);
  return map;
}

export default useGoogleAddress;