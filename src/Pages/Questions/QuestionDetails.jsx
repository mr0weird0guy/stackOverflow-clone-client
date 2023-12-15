import React, {useState} from 'react'
import { useParams,Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import copy from 'react-copy-to-clipboard'

import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'
import './Questions.css'

import upvote from '../../Assets/upvote.png'
import downvote from '../../Assets/downvote.png'
import DisplayAnswer from './DisplayAnswer'
import Avatar from '../../components/Avatar/Avatar'


const QuestionDetails = () => {

  const {id} = useParams()
  const [answer, setAnswer] = useState('')
  
  const questionList = useSelector(state => state.questionsReducer)
  const User = useSelector((state) => state.currentUserReducer)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const url = 'http://localhost:3000'

  const handleUpVote = () => {
    dispatch(voteQuestion(id, 'upVote', User.result._id))
  }
  
  const handleDownVote = () => {
    dispatch(voteQuestion(id, 'downVote', User.result._id))
  }

  const handleShare = () => {
    copy(url+location.pathname)
    alert('Copied URL :' + url+ location.pathname)
  }
  
  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate))
  }

  const handlePostAns = (e, answerLenght) =>{
    e.preventDefault()
    if(User === null){
      alert('Login or Signup to answer a question')
      navigate('/Auth')
    } else {
      if(answer === ''){
        alert('Enter an answer before submitting')
      } else {
        dispatch(postAnswer({ id, noOfAnswers: answerLenght + 1, answerBody: answer, userAnswered: User.result.name, userId: User.result._id }))
      }
    }
  }
  
  return (
    <div className='question-details-page'>
      {
        questionList.data === null ?
        <h1>Loading...</h1> :
        <>
          {
            questionList.data.filter(question => question._id === id).map(question => (
              <div key={question._id}>
                <section className='question-details-container'>
                  <div>
                    <h1>{question.questionTitle}</h1>
                    <div className="question-details-container-2">
                      <div className="question-votes">
                        <img onClick={handleUpVote} src={upvote} alt="Upvote" width='18' className='votes-icon'/>
                        <p>{question.upVote.length - question.downVote.length}</p>
                        <img onClick={handleDownVote} src={downvote} alt="Downvote" width='18' className='votes-icon'/>
                      </div>
                      <div style={{width: "100%"}}>
                        <p className='question-body'>{question.questionBody}</p>
                        <div className="question-details-tags">
                          {
                            question.questionTags.map(tag =>(
                              <p key={tag}>{tag}</p>
                            ))
                          }
                        </div>
                        <div className="question-actions-user">
                          <div>
                            <button type='button' onClick={handleShare}>Share</button>
                            {
                              User?.result?._id === question?.userId &&
                              <button type='button' onClick={handleDelete}>Delete</button>
                            }
                          </div>
                          <div>
                            <p>asked {moment(question.askedOn).fromNow()}</p>
                            <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                              <Avatar backgroundColor="orange" px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                              <div>
                                {question.userPosted}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {
                  question.noOfAnswers !== 0 && (
                    <section>
                      <h3>{question.noOfAnswers} Answers</h3>
                      <DisplayAnswer handleShare={handleShare} key={question.id} question={question}/>
                    </section>
                  )
                }
                <section className='post-ans-container'>
                  <h3>Your Answer</h3>
                  <form onSubmit={(e) => handlePostAns(e, question.answer.length)}>
                    <textarea name="" id="newAnswer" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea> <br />
                    <input type="submit" value="Post Your Answer" className='post-ans-btn' />
                  </form>
                  <p>
                    Browse other Question tagged
                    {
                      question.questionTags.map(tag => (
                        <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                      ))
                    } or {
                      <Link to='/Questions' style={{textDecoration:"none", color:"#009dff"}} >ask your own question</Link>
                    }
                  </p>
                </section>
              </div>
            ))
          }
        </>
      }
    </div>
  )
}

export default QuestionDetails