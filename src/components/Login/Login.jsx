import React, {useState} from 'react';
import SliderSvg from './SliderSvg';
import LoginForm from './LoginForm';

export default function Login({ onLoginSuccess }) {

    

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-yellow-100">
            <div className='relative flex justify-center w-[800px] h-[400px] max-sm:flex-col-reverse'>
                <div className='relative flex justify-center w-1/2 h-auto max-sm:w-auto'>
                    <LoginForm onLoginSuccess={onLoginSuccess}/>
                </div>
                <div className='flex justify-center w-1/2 h-auto max-sm:w-auto max-sm:h-[100px]'>
                    <SliderSvg />
                </div>
            </div>
        </div>
    )
}
