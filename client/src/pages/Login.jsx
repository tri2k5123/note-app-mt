import { Button, Typography } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import { graphQLRequest } from '../utils/request';

export default function Login() {
    const auth = getAuth();
    const { user } = useContext(AuthContext);
    // const navigation = useNavigate();

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const { user: { uid, displayName } } = await signInWithPopup(auth, provider);
        const data = await graphQLRequest({ 
            query: `mutation Register($uid: String!, $name: String!) {
                register(uid: $uid, name: $name) {
                    uid
                    name
                }
            }`, 
            variables: {
                uid,
                name: displayName
            }
        })
        console.log('register data', { data });
        console.log('register user', { user });
    }
    if(localStorage.accessToken) {
        // navigation('/')
        return <Navigate to='/'/>
    }
    return (
        <>
            <Typography variant='h5' sx={{ marginBottom: '12px' }}>Welcome to Note App</Typography>
            <Button variant='outlined' onClick={handleLoginWithGoogle}>
                Login with Google
            </Button>
        </>
    )
}