import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { Link, useHistory } from 'react-router-dom'
import {auth, provider} from '../firebase'

export default function Login({ setIsAuth }) {
    const history = useHistory()


  //google authentification     
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          history.push('/');
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          alert("Failed to login")
        });
      }


    return (
      //login with google 
        <>
        <Card className='border-0 d-flex align-items-center'>
        <Card.Body>
          <Card.Img className='d-flex align-items-center back-image' src={require('./recycle-wooden-blank-white-school.png')}/>
            <Card.ImgOverlay style={{ paddingTop: '50%'}}>
            <h1 className='text-center mb-4' style={{ fontSize: '32px', fontFamily: 'Indie Flower'}}>My Diary App</h1>
            
                <div className='w-100 text-center mt-3 font-link'>
                <img src={'../diary-user.png'} className="profile-img" width="40px" height="auto" style={{ marginRight: "5px", marginBottom: '1em' }} />
                <h2 className='font-link card-title text-center mb-4' style={{ marginLeft: '15%', marginRight: '15%'}}>here you can keep track of your thoughts and daily events.</h2>
                  <Button className="bg-transparent button text-center mt-3" onClick={signInWithGoogle}>Log In</Button>
                
                </div>
                <div className='w-100 text-center p-5 mt-3 font-link'>
                <img src={'../book.png'}  width="100px" height="auto" style={{ marginRight: "5px", marginBottom: '1em' }} />
    
                </div>

            </Card.ImgOverlay>
        </Card.Body>
      </Card>
        </>
    )
}