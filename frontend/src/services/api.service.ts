import axios from 'axios'
import { authService } from "./auth.service";

const apiService = axios.create({baseURL: '/api'});
apiService.interceptors.request.use(req => {
const accessToken = authService.getAccessToken();
if (accessToken){
    req.headers.Authorization = `Bearer ${accessToken}`;
}
return req
})
export { apiService };