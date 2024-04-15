import { useGSAP } from '@gsap/react'
import gsap from 'gsap/gsap-core';
import React, { useEffect, useState } from 'react'
import { heroVideo, smallHeroVideo } from '../utils';

const Hero = () => {
  const [videosrc, setvideosrc] = useState(window.innerWidth<760 ? smallHeroVideo : heroVideo)
  const handleVideoSrcset =() => {
    if(window.innerWidth<760){
      setvideosrc(smallHeroVideo)
    }else{
      setvideosrc(heroVideo)
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', handleVideoSrcset);
    return()=>{ window.removeEventListener('resize', handleVideoSrcset)}
  },[])
  useGSAP(() => {
    gsap.to("#hero",{
      opacity:1,
      delay:1.5,
    })
    gsap.to("#cta",{
      opacity:1,
      y:-100,
      delay:1.8,
      // ease:"expo.in",
      duration:0.5,
      stagger:0.1,
    })
  },[]);
  return (
    <section className='w-full nav-height bg-black relative'>
      <div className="h-5/6 w-full flex-center flex-col ">
        <p id='hero' className='hero-title'>iphone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video autoPlay playsInline={true}  muted src={videosrc}></video>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <a id='cta'  href="#highlights" className='btn opacity-0  translate-y-20'>Buy</a>
        <p id='cta'  className='font-normal text-2xl opacity-0  translate-y-20'>From 134900.00*</p>
      </div>
    </section>
  )
}

export default Hero