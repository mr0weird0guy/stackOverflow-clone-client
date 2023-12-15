import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users'

const EditProfileForm = ({currentUser, setSwitch}) => {

  const [name, setName] = useState(currentUser?.result?.name)
  const [about, setAbout] = useState(currentUser?.result?.about)
  const [tags, setTags] = useState([])
  const dispatch = useDispatch()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (tags[0] === '' || tags.length === 0) {
      alert("update Tags field")
      return
    } else {
      dispatch(updateProfile( currentUser?.result?._id, { name, about, tags }))
    }
    setSwitch(false)
  }

  return (
    <div>
      <h1 className="edit-profile-title">
        Edit Your Profile
      </h1>
      <h2 className="edit-profile-title-2">
        Public information
      </h2>
      <form className='edit-profile-form' onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea name="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched Tags</h3>
          <p>Add tags separated by 1 space</p>
          <input type="text" id="tags" onChange={(e) => setTags(e.target.value.split(' '))} />
        </label><br />
        <input type="submit" value="Save profile" className='user-submit-btn'/>
        <button type="button" onClick={() => setSwitch(false)} className='user-cancel-btn'>Cancel</button>
      </form>
    </div>
  )
}

export default EditProfileForm