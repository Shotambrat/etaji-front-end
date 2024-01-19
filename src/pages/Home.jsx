import React from 'react';
import archive from './../assets/svg/archive-svgrepo-com.svg'
import RejectTasks from '../components/RejectTasks';
import Tasks from '../components/Tasks';
import Filter from '../components/Filter';


export default function Home() {
    return (
        <div className='absolute top-0 left-0 w-screen h-screen flex justify-center bg-yellow-100'>
            <div className='fixed top-6 right-12 h-[20px] w-[30px] '>
                <Filter />
            </div>
            <div className='h-[auto] w-[800px]  mt-12'>
                <div className='w-[auto] h-[100px] flex flex-col justify-between'>
                    <div className='ml-2'>
                        <h1 className='font-bold text-[2em]'>Cегодня</h1>
                    </div>
                    <div className='flex items-center ml-5 mb-5'>
                        <img className='h-[20px]' src={archive} alt='svg' />
                        <p className='text-lg text-center ml-2'>2 задачи</p>
                    </div>
                </div>
                <RejectTasks />
                <Tasks />
            </div>
        </div>
    )
}
