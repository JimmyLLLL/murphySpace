import axios from "axios";
const realAxios = axios.create({
  baseURL: "http://www.jinmylam.xin:8003/blog"
});
export default {
  login(account, password) {
    return realAxios.post("login", {
      account,
      password
    });
  },
  getBrevityList(page) {
    return realAxios.post("getBlog", {
      page
    });
  }
};
