import React, {useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './AskQuestion.css'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {

  const dispatch = useDispatch()
  const User = useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate()

  const [ questionTitle, setQuestionTitle ] = useState()
  const [ questionBody, setQuestionBody ] = useState()
  const [ questionTags, setQuestionTags ] = useState()

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setQuestionBody(questionBody + "\n")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id }, navigate))
  }

  return (
    <div className='ask-question'>
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>Be specific and imagine you're asking a question to another person.</p>
              <input type="text" onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder='e.g. Is there a R function for finding the index of an element in a vector?' name="questionTitle" id="ask-ques-title" />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>Include all the information someone would need to answer your question.</p>
              <textarea name="questionBody" onChange={(e) => {setQuestionBody(e.target.value)}} id="ask-ques-body" cols="30" rows="10" onKeyDown={handleEnter}></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Title</h4>
              <p>Add up to 5 tags to describe what your question is about.</p>
              <input type="text" onChange={(e) => {setQuestionTags(e.target.value.split(" "))}} placeholder='e.g. (xml typescript wordpress)' name="questionTag" id="ask-ques-tags" />
            </label>
          </div>
          <input type="submit" value='Review your quesion' className='review-btn' />
        </form>
      </div>
    </div>
  )
}

export default AskQuestion