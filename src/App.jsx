import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 700) }, [])
  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div key="loader" initial={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
            style={{ position:'fixed', inset:0, background:'#050a0f', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9000, flexDirection:'column', gap:16 }}>
            <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}
              style={{ width:44, height:44, border:'2px solid transparent', borderTop:'2px solid #00c8ff', borderRight:'2px solid #00ff9d', borderRadius:'50%' }} />
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'0.72rem', color:'#00c8ff', letterSpacing:'0.2em' }}>INITIALIZING...</span>
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}