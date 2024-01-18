import React from 'react';
import SliderSvg from './SliderSvg';
import LoginForm from './LoginForm';

export default function Login() {

    

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-yellow-100">
            <div className='relative flex w-[800px] h-[400px]'>
                <div className='relative flex justify-center w-1/2 h-auto'>
                    <LoginForm />
                </div>
                <div className='flex justify-center w-1/2 h-auto'>
                    <SliderSvg />
                </div>
            </div>
        </div>
    )
}
