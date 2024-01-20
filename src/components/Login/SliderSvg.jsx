import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { svgInfo } from '../../assets/svginfo';

export default function SliderSvg() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 0, 
        // cssEase: "linear"
    };

    return (
        <div className='flex flex-col w-[100] h-auto overflow-hidden max-sm:flex-row'>
            <Slider {...settings}>
                {svgInfo.map((svg) => {
                    return (
                        <img src={svg.src} alt={svg.alt} key={svg.alt} className='h-[100px]'/> 
                    )
                })}
            </Slider>
        </div>
    )
}
