import React from 'react'
import Login from '../components/Login/Login'
import Home from './Home'

export default function Main() {
    let data = {
        success: false
    }

    return (
        <div>
            {data.success ? 
                <Login />
                : 
                <Home />
            }
        </div>
    )
}
