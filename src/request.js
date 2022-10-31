
import axios from "axios";
const baseUrl = "https://localhost:44349/api";

export function post(url, object){
    return axios.post(baseUrl+url, object,  {headers: {
        "Authorization": `Bearer ${localStorage.getItem("user")}`
      }});
}

export function get(url){
    return axios(baseUrl+url, { headers: {
          "Authorization": `Bearer ${localStorage.getItem("user")}`
        }});
}