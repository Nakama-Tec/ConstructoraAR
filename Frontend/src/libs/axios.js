// import axios from 'axios';
// import { useAuthStore } from '../Context/auth';

// const authApi = axios.create({
//     baseURL: "http://localhost:8000",
//     withCredentials: true
// })

// authApi.interceptors.request.use(config => {
//     const token = useAuthStore.getState().token
//     config.headers = {
//         Authorization: `Bearer ${token}`
//     }

//     return config
// })

// export default authApi