//import { response } from 'express';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import {useNavigate} from 'react-router-dom'

export default function (SpecificComponent, option, adminRoute = null) { // option : null아무나, true로그인, false로그인시 출입불가

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        let navigate = useNavigate()

        useEffect(() => {

            dispatch(auth()). then(response => { 
                if (!response.payload.isAuth) { // 로그인 하지 않은 상태
                    if (option) {
                        navigate('/')
                    }
                } else { // 로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) { // 어드민이 아닌 유저가 어드민 페이지에 접속
                        navigate('/')
                    }
                    if (!option) {
                        navigate('/')
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}