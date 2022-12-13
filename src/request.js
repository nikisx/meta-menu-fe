
import axios from "axios";
const baseUrl = "https://localhost:44349/api";
const externalUrl = "https://192.168.1.5/api";

export function post(url, object){
    return axios.post(baseUrl+url, object,  {headers: {
        "Authorization": `Bearer ${localStorage.getItem("user")}`,
        // "Content-Type": "application/json; charset=utf8; multipart/form-data",
      }});
}

export function get(url){
    return axios(baseUrl+url, { headers: {
          "Authorization": `Bearer ${localStorage.getItem("user")}`,
          // "Content-Type": "application/json; charset=utf8",
        }});
}