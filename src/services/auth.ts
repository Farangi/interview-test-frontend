import axios, { setUserIdToken } from '../config/axios'
type TCreds = {
  email: string,
  password: string
}

const register = ({ email, password }: TCreds) => {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/user/register`, {
      email, password
    }).then(response => {
      localStorage.setItem('idtk', response?.data?.token)
      resolve(response?.data)
    }).catch((err) => {
      reject(err)
    })
  });
}
const login = ({ email, password }: TCreds) => {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
      email, password
    }).then(response => {
      localStorage.setItem('idtk', response?.data?.token)
      setUserIdToken()
      resolve(response?.data)
    }).catch((err) => {
      reject(err)
    })
  });
}

const logout = () => localStorage.removeItem('idtk')

const isAuthenticated = () => !!localStorage.getItem('idtk')

export { register, login, isAuthenticated, logout }