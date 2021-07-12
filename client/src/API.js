import axios from "axios";

const url = "/api";

async function getPublicMemes() {
  return await axios
    .get(url + "/publicMemes")
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getAllMemes() {
  return await axios
    .get(url + "/memes/all")
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getMeme(id) {
  return await axios
    .get(url + `/memes/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getAllImages() {
  return await axios
    .get(url + "/images")
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function addNewMeme(meme) {
  return await axios
    .post(url + "/memes", meme)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function logIn(credentials) {
  let response = await fetch(url + "/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    console.log("client: login returned ok from server");
    const user = await response.json();
    return user;
  } else {
    try {
      const errDetail = await response.json();

      throw errDetail.message;
    } catch (err) {
      throw err;
    }
  }
}

async function logOut() {
  await fetch(url + "/sessions/current", { method: "DELETE" });
}

async function getUserInfo() {
  const response = await fetch(url + "/sessions/current");
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo; // an object with the error coming from the server
  }
}

const API = {
  logIn,
  logOut,
  getUserInfo,
  getPublicMemes,
  getAllMemes,
  getMeme,
  getAllImages,
  addNewMeme,
};
export default API;
