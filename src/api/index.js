import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
  }
  return req
})

export const logIn = (authData) => API.post('/users/login', authData)
export const signUp = (authData) => API.post('/users/signup', authData)

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, {value, userId})
export const getAllQuestions = () => API.get('/questions/get')
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answers/post/${id}`, {noOfAnswers, answerBody, userAnswered, userId})
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answers/delete/${id}`, { id, answerId, noOfAnswers })

export const fetchAllUsers = () => API.get('/users/getAllUsers')
export const updateProfile = (id, updateData) => API.patch(`/users/update/${id}`, updateData)