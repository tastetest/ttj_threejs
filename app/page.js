'use client';
import React, { Suspense, useEffect, useRef, useReducer } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


function Load() {
  const [flag, toggle] = useReducer((state) => !state, true)
  useEffect(() => {
    const interval = setInterval(toggle, 1000)
    return () => clearInterval(interval)
  }, [])

  const ref = useRef()
    useFrame((state, delta) => (ref.current.rotation.y += delta))
  const { scene } = useLoader(GLTFLoader, flag ? './character.glb' : './character.glb') 
  return <primitive ref={ref} object={scene}>
    </primitive>
}

export default function Home() {

  return (
    <main>
      <Canvas style={{height: '100vh'}}>
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Load />
        </Suspense>
        <ambientLight />
      </Canvas>
    </main>
  )
}