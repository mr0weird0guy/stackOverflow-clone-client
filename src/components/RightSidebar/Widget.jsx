import React from 'react'
import './RightSidebar.css'
import message from '../../Assets/message-solid.svg'
import pen from '../../Assets/pen-solid.svg'
import blacklogo from '../../Assets/stack-overflow.svg'


const Widget = () => {
  return (
    <div className='widget'>
      <h4>The Overflow Blog</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width='18' />
          <p>Improving the developer experience in the energy sector</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width='18' />
          <p>How Bloomberg’s engineers built a culture of knowledge sharing</p>
        </div>
      </div>
      <h4>Featured on Meta</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={message} alt="pen" width='18' />
          <p>Starting the Prompt Design Site: A New Home in our Stack Exchange Neighborhood</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={message} alt="pen" width='18' />
          <p>Colors update: A more detailed look</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={blacklogo} alt="pen" width='18' />
          <p>Does the policy change for AI-generated content affect users who (want to)...</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={blacklogo} alt="pen" width='18' />
          <p>Temporary policy: Generative AI (e.g., ChatGPT) is banned</p>
        </div>
      </div><h4>Hot Meta Posts</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>13</p>
          <p>Why was the [google-domains] tag removed?</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>15</p>
          <p>Should [sender] be burninated?</p>
        </div>
      </div>

    </div>
  )
}

export default Widget