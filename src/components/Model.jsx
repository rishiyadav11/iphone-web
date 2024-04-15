import { useGSAP } from '@gsap/react'
import gsap from 'gsap/gsap-core'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelView from './ModelView';
import { yellowImg } from '../utils';
import * as THREE from 'three'
import { CameraControls, View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { models, sizes } from '../constants';
import { animateWithGsapTimeline } from "../utils/animation";
gsap.registerPlugin(ScrollTrigger);
const Model = () => {
    const [size, setsize] = useState('small');
    const [model, setmodel] = useState(
        {
            title: 'iPhone 15 Pro in Natural Titanium',
            color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
            img: yellowImg,
        }
    )

// camera settings

const camerControlSmall = useRef()
const camerControlLarge = useRef()

//model settings
 const small = useRef(new THREE.Group())
 const large = useRef(new THREE.Group())

//Rotation settings
const [smallRotation, setsmallRotation] = useState(0) ;
const [largeRotation, setlargeRotation] = useState(0) ;


const tl = gsap.timeline();

useEffect(() => {
  if(size === 'large') {
    animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
      transform: 'translateX(-100%)',
      duration: 2
    })
  }

  if(size ==='small') {
    animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
      transform: 'translateX(0)',
      duration: 2
    })
  }
}, [size])

    useGSAP(()=>{
        gsap.to("#heading",{
        y:0,
        opacity:1,
        scrollTrigger:{
            trigger:"#msec",
            // markers:true,
            start:"top 77%",
            end:"top 75%",
            scrub:2,
        }
        })
    },[])
  return (
    <section id='msec' className='common-padding'>
        <div className="screen-max-width">
            <h1 id='heading' className='section-heading '>
                Take a closer look
            </h1>
            <div className=" flex-col items-center mt-5 hidden md:flex">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                  <ModelView 
                    index={1}
                    groupRef={small}
                    gsapType ="view1"
                    controlRef={camerControlSmall}  
                    setRotationState={setsmallRotation}
                    item={model}
                    size={size}    />
                  <ModelView 
                    index={2}
                    groupRef={large}
                    gsapType ="view2"
                    controlRef={camerControlLarge}  
                    setRotationState={setlargeRotation}
                    item={model}
                    size={size}    />
                    <Canvas className='w-full h-full ' style={{
                        position:'fixed',
                        top:0,
                        bottom:0,
                        overflow: 'hidden',
                        left:0,
                        right:0,
                    }} eventSource={document.getElementById('root')}>
                        <View.Port/>
                    </Canvas>
                </div>
                <div className="mx-auto w-full">
                    <p className='text-sm font-light text-center mb-5'>{model.title}</p>
                    <div className="flex-center">
                        <ul className='color-container'>
                            {models.map((item,i)=>(
                                <li key={i} className='w-6 h-6 rounded-full mx-2 cursor-pointer' style={{
                                    backgroundColor:item.color[0]
                                }}
                                onClick={()=>setmodel(item)}>

                                </li>
                            ))}
                        </ul>
                        <button className='size-btn-container '>
                            {sizes.map(({label,value})=>(
                         <span className='size-btn' style={{
                            backgroundColor: size === value ? 'white' : 'transparent',
                            color: size === value ? 'black' : 'white'
                         }} onClick={()=>setsize(value)} key={label}>{label}</span>
                        ))}</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Model