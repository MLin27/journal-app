import React, {useState, useEffect} from 'react'
import { Card, Button, Alert, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import {addDoc, collection} from 'firebase/firestore'
import {db, auth, storage, timestamp} from '../firebase'
import moment from 'moment';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app'


export default function CreatePost() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const url = "http://localhost:3000" 
  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')
  const [category, setCategory] = useState('')
  const diaryCollectionRef = collection(db, 'diary')
  
  //write post to firebase and redirect back to dashboard
  const createPost = async () => {
    await addDoc(diaryCollectionRef, {
      title, 
      postText, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
      postDate: moment().format("DD-MM-YYYY"),
      category,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    history.push('/')

  };
  const handleChange = (event) => {
    setCategory(event.target.value)
}
 



  return (
    //return post forms to fill out
    <>
    
      <Card className='border-0 d-flex align-items-center'>
        <Card.Body>
          <Card.Img className='d-flex align-items-center back-image' src={require('./recycle-wooden-blank-white-school.png')}/>
            <Card.ImgOverlay style={{ paddingTop: '25%'}}>
              <h1 className='text-center mb-4 header' style={{ fontSize: '32px', fontFamily: 'Indie Flower'}}>New Entry</h1>
              {error && <Alert variant="danger">{error}</Alert> }
              <Form>
                <Form.Group className="mb-1 border-0 p-3 text-center font-link" controlId="entryTitle" >
                  <Form.Label>Entry Title</Form.Label>
                  <Form.Control className='bg-transparent border-0 text-center w-75'  style={{ marginLeft: '15%'}} type="text" placeholder="What is it about?..." onChange={(event) => {
                    setTitle(event.target.value)
                    }} />
                </Form.Group>
                <Form.Group className="mb-1 p-3 text-center font-link " controlId="entryText">
                  <Form.Label>Entry Text</Form.Label>
                  <Form.Control className='bg-transparent border-0 text-center w-75 font-link entry-box hiddenbar' style={{ marginLeft: '15%'}} as="textarea" rows={3} placeholder="Share your thoughts..." onChange={(event) => {
                    setPostText(event.target.value)
                    }}/>
                </Form.Group>
                <Form.Group className="mb-1 text-center font-link category-box" controlId="category" style={{ marginLeft: '5%'}}>
                  <Form.Label>Select the mood</Form.Label><br></br>
                      <Form.Check 
                            label={
                              <>
                                  <img src={'../smiley.png'} className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                              
                              </>
                            }
                            value={'../smiley.png'}
                            onChange={handleChange}
                            inline
                          />
                      <Form.Check 
                        label={
                          <>
                              <img src={'../lol.png'} className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                           
                          </>
                        }
                        value={'../lol.png'}
                        onChange={handleChange}
                          inline
                      />
                      <Form.Check 
                        label={
                          <>
                              <img src={'../love.png'} className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                           
                          </>
                        }
                        value={'../love.png'}
                        onChange={handleChange}
                        inline
                      />
                      <Form.Check 
                        label={
                          <>
                              <img src={'../dream.png'} className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                           
                          </>
                        }
                        value={'../dream.png'}
                        onChange={handleChange}
                        inline
                      /><br></br>
                       <Form.Check 
                        label={
                          <>
                              <img src={'../sad.png'} className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                           
                          </>
                        }
                        value={'../sad.png'}
                        onChange={handleChange}
                        inline
                      />
                       <Form.Check 
                        label={
                          <>
                              <img src={'../swearing.png'} className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                           
                          </>
                        }
                        value={'../swearing.png'}
                        onChange={handleChange}
                        inline
                      />
                       
                      
                       
                      <Form.Check 
                        label={
                          <>
                              <img src={'../communications.png'} className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                           
                          </>
                        }
                        value={'../communications.png'}
                        onChange={handleChange}
                        inline
                      />

                </Form.Group>
               
               
                <div className='w-100 text-center mt-1 font-link'>
                  <Button className="bg-transparent button text-center mt-1" onClick={createPost}>Submit Post</Button>
                
                </div>
                <div className='w-100 text-center mt-1 font-link'>
                  <Button className="bg-transparent button text-center mt-1" onClick={() => history.push('/')}>Return</Button>
                
                </div>
              </Form>
              
            </Card.ImgOverlay>
        </Card.Body>
      </Card>
      
    </>
  )
}