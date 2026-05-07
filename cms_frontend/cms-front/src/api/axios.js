import axios from "axios";

const API = axios.create({
  baseURL: "https://diplomatic-upliftment-production.up.railway.app"
});

export default API;