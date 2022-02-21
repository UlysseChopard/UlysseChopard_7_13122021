import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.giphy.com/v1/gifs",
  withCredentials: false,
});

const searchParams = (keyword) => ({
  params: {
    api_key: "yFyMQEAHnCgHpFvcVhU3zKjqVALaj2Ox",
    q: keyword,
    limit: 6,
    offset: 0,
    rating: "g",
    lang: "fr",
  },
});

const searchGIF = (keyword) => instance.get("/search", searchParams(keyword));

const getTrendingGIFs = () => instance.get("/trending", searchParams());

export default {
  searchGIF,
  getTrendingGIFs,
};
