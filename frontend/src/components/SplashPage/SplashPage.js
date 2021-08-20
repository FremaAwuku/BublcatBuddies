import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, useParams, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'


import {getEvents} from '../../store/event'
import{ getUsers} from '../../store/user'
 const  SplashPage = () =>{
    const dispatch = useDispatch()
    //OBJ OF USER
    const users = useSelector(state => state.users)
    const sessionUser = useSelector(state => state.session.user?.id)

    useEffect(()=>{
        const usersFromDB = dispatch(getUsers())
        if(usersFromDB){
            console.log(sessionUser)
        }

    },[dispatch])


    return(
        <>
            <h2>
                I heard yo girl she got that Watta 💦 SPLASH


            </h2>
            <section className="userProf">
            <h3></h3>


            </section>
        </>
    )

 }


 export default SplashPage
