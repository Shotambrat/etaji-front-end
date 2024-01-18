import React from 'react'

export default function Login() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-100">
            <div className='relative flex w-[800px] h-[400px]'>
                <div className='relative flex justify-center w-1/2 h-auto bg-slate-600'></div>
                <div className='flex justify-center w-1/2 h-auto'>
                    <div className='flex flex-col w-[100] h-auto bg-black'>
                        <img src='../assets/svg/bank-svgrepo-com.svg' alt='bank-svg'/>
                        <img src='../assets/svg/cash-svgrepo-com.svg' alt='cash-svg'/>
                        <img src='../assets/svg/gold-svgrepo-com.svg' alt='gold-svg'/>
                        <img src='../assets/svg/interest-rate-svgrepo-com.svg' alt='interest-svg'/>
                        <img src='../assets/svg/loss-svgrepo-com.svg' alt='loss-svg'/>
                        <img src='../assets/svg/my-category-svgrepo-com.svg' alt='category-svg'/>
                        <img src='../assets/svg/profit-svgrepo-com.svg' alt='profit-svg'/>
                        <img src='../assets/svg/stock-svgrepo-com.svg' alt='stock-svg'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
