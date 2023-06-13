import BASEURL from "./config";
import axios from "axios";

const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: BASEURL,
  headers: {
    Authorization: token ? token : "",
    Accept: 'application/json',
  },
});

export default instance;
