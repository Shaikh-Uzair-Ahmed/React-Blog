import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'



function Protected({children,authenticated=true}) {
    const navigate=useNavigate();
    const {name}=useParams();
    const [loader,setLoader]=useState(true);
    const authStatus = useSelector(state=>state.auth.status)
    useEffect(() => {
        if(authenticated && authStatus!==authenticated){
            navigate('/login')
        }else if(!authenticated && authStatus!==authenticated){
            navigate('/')
        }
        setLoader(false)
    }, [authStatus,authenticated,navigate])

  return loader ? <div>Loading...</div> : <>{children}</>
}

export default Protected;