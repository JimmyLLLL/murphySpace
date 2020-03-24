import axios from "axios";
import router from "../router";
const realAxios = axios.create({
  baseURL: "http://www.jinmylam.xin:8003/blog"
});
realAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

realAxios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      localStorage.getItem("token") && localStorage.removeItem("token");
      const routeArr = window.location.href.split("/");
      routeArr.pop();
      routeArr.push("loginDialog");
      window.location.href = routeArr.join("/");
    }
    return Promise.reject(error);
  }
);

export default {
  login(account, password) {
    return realAxios.post("login", {
      account,
      password
    });
  },
  memoryLogin() {
    return realAxios.post("memoryLogin", {});
  },
  getBrevityList(page) {
    return realAxios.post("getBlog", {
      page
    });
  },
  enterBlog(id) {
    return realAxios.post("enterBlog", {
      id
    });
  },
  sendBlog(title, nickname, content) {
    return realAxios.post("sendEdit", {
      title,
      nickname,
      content
    });
  },
  personalGetBlog(page, account) {
    return realAxios.post("personalGetBlog", {
      page,
      account
    });
  }
};
