import React, {useState, useEffect} from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreatePost from './CreatePost'


import { getDocs, collection, deleteDoc, doc, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";



export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [diaryLists, setDiaryList] = useState([]);

  //get posts by current user
  useEffect(() => {
  const diaryCollectionRef = collection(db, "diary");
  const q = query(diaryCollectionRef, where('author.id', "==", auth.currentUser.uid), orderBy('createdAt', 'desc'));
    const getDiary = async () => {
      const data = await getDocs(q);
      
      setDiaryList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getDiary();
  }, []);

 
  //delete post and refresh page 
  const deleteDiary = async (id) => {
    const diaryDoc = doc(db, "diary", id);
    await deleteDoc(diaryDoc);
    window.location.reload(false);
  };


  //log out user and redirect to login page
  async function handleLogout() {
    setError('')

    try{
      await logout()
      history.push('/login')
    }catch {
      setError('Failed to log out')
    }
  }


  return (
    //return posts of current user ordered by post date
    <>
    <div className="container">
    <div className="row">
  
    <Card className='border-0 align-items-center'>
        <Card.Body>
        <Card.Img className='d-flex mx-auto align-items-center back-image' src={require('./recycle-wooden-blank-white-school.png')}/>
            <Card.ImgOverlay style={{ paddingTop: '25%'}}>
        
          <h1 className='text-center mb-2 header' style={{ fontSize: '32px', fontFamily: 'Indie Flower'}}>My Diary</h1>
          {error && <Alert variant="danger">{error}</Alert> }
          <p className='font-link text-center'> <strong>Email:</strong>  {currentUser.email}</p>

          <div className="diaryPage text-center w-75 font-link hiddenbar" style={{ height: '50%', overflowY: 'auto', paddingLeft: '25%'}}>
            {diaryLists.map((post) => {
              return (
                <div className="post">
                  <div className="postHeader">
                    <div className="title">
                      <h2> {post.title}</h2>
                    
                      <img src={post.category} className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                    </div>
                  </div>
                  <div className="postDate"> On:  {post.postDate} </div>
                  <div className="postTextContainer"> {post.postText} </div>
                  <div className="deletePost">
                      {post.author.id === auth.currentUser.uid && (
                        <button className='text-center font-link bg-transparent dashed thin' style={{ fontSize: '12px', marginTop: '5%', marginBottom: '15%', width: 'inline'}}  onClick={() => {deleteDiary(post.id)} }>Delete</button>
                      )}
                  </div>
                  
                </div>
              );
            })}
          </div>
          
    
        <Link to = "/create-post" className="bg-transparent button btn text-center w-50 font-link" style={{ marginLeft: '27%', marginTop:'5%'}}>Create Post</Link>
          <div className='w-100 text-center font-link'>
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
        </div>
          </Card.ImgOverlay>
        </Card.Body>
      </Card>
    
      </div>
      </div>
    </>
  )
}
