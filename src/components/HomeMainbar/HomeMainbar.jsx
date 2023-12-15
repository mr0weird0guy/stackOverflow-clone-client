import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import './HomeMainbar.css'
import {useSelector} from 'react-redux'
import QuestionsList from './QuestionsList'

const HomeMainbar = () => {

  const location = useLocation()
  
  const user = 1
  const navigate = useNavigate()

  const questionList = useSelector((state) => state.questionsReducer)

  const checkAuth = () => {
    if (!user) {
      alert("Login or Signup to ask a question")
      navigate('/Auth')
    } else {
      navigate('/AskQuestion')
    }
  }
  
  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname === '/' ? <h1>Top Question</h1> : <h1>All Questions</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionList.data === null ?
          <h1>Loading...</h1> :
          <>
            <p>{questionList.data.length} Questions</p>
            <QuestionsList questionList={questionList.data}/>
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar