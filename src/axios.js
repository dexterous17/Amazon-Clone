import axios from "axios"

const instance = axios.create({
    baseURL:'https://us-central1-clone-7ef08.cloudfunctions.net/api'
});

export default instance;