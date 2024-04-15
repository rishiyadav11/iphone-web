import { useGSAP } from '@gsap/react'
import gsap from 'gsap/gsap-core'
import React from 'react'
import { rightImg, watchImg } from '../utils' 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Videocarosal from './Videocarosal';


gsap.registerPlugin(ScrollTrigger);
const Highlights = () => {
  useGSAP(()=>{
    gsap.to("#title",{
      opacity:1,
      y:0,
      scrollTrigger:{
        trigger:"#highlights",
        // markers:true,
        start:"top 77%",
        end:"top 75%",
        scrub:2,
      }
    })
    gsap.to(".link",{
      opacity:1,
      y:0,
      duration:1,
      stagger:0.25,
      scrollTrigger:{
        trigger:"#highlights",
        // markers:true,
        start:"top 75%",
        end:"top 73%",
        scrub:2,
      }
    })
  },[])
  return (
    <section id='highlights' className=' w-screen overflow-hidden h-full common-padding bg-zinc'>
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between md:flex">
          <h1 id='title' className='section-heading'>Get the highlights</h1>
          <div className="flex flex-col sm:flex-row flex-wrap sm:justify-end items-start gap-5">
            <p className='link'>Watch the film <img className='pl-2' src={watchImg} alt="watch" /></p>
            <p className='link'>Watch the event
            <img className='pl-2' src={rightImg} alt="right" /></p>
          </div>
        </div>
      </div>
      <Videocarosal/>
    </section>
  )
}

export default Highlights