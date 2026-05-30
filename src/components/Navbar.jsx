import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = ['About','Experience','Skills','Projects','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav initial={{ y:-80, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.7, delay:0.3 }}
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:1000,
          padding:'0 5vw', height: scrolled ? '60px' : '76px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background: scrolled ? 'rgba(5,10,15,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,200,255,0.08)' : 'none',
          transition:'all 0.4s ease'
        }}>
        <a href="#hero" style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.2rem', letterSpacing:'-0.02em', display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ color:'var(--cyan)' }}>RK</span>
          <span style={{ color:'var(--white)', opacity:0.4, fontSize:'0.6rem', fontFamily:'var(--font-mono)', letterSpacing:'0.15em' }}>DEV_OPS</span>
        </a>

        {/* Desktop */}
        <div style={{ display:'flex', gap:'2rem', alignItems:'center' }} className="desk-nav">
          {navLinks.map((link,i) => (
            <motion.a key={link} href={`#${link.toLowerCase()}`}
              initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4+i*0.07 }}
              style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--gray)', letterSpacing:'0.08em', textTransform:'uppercase', transition:'color 0.2s' }}
              onMouseEnter={e=>e.target.style.color='var(--cyan)'} onMouseLeave={e=>e.target.style.color='var(--gray)'}>
              <span style={{ color:'var(--cyan)', marginRight:4 }}>0{i+1}.</span>{link}
            </motion.a>
          ))}
          <motion.a href="mailto:rahulkrishnan.beechithil@gmail.com"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
            style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.08em', border:'1px solid var(--cyan)', color:'var(--cyan)', padding:'8px 16px', borderRadius:'3px', transition:'all 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(0,200,255,0.1)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            HIRE ME
          </motion.a>
        </div>

        {/* Hamburger */}
        <button onClick={()=>setMenuOpen(!menuOpen)} className="hamburger"
          style={{ display:'none', background:'none', border:'none', cursor:'pointer', flexDirection:'column', gap:'5px', padding:'4px', zIndex:1100 }}>
          {[0,1,2].map(i=>(
            <motion.span key={i}
              animate={{ rotate: menuOpen&&i===0?45:menuOpen&&i===2?-45:0, y: menuOpen&&i===0?7:menuOpen&&i===2?-7:0, opacity: menuOpen&&i===1?0:1 }}
              style={{ display:'block', width:24, height:2, background:'var(--cyan)', borderRadius:2, transformOrigin:'center' }} />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0, x:'100%' }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:'100%' }}
            transition={{ type:'spring', stiffness:300, damping:30 }}
            style={{ position:'fixed', top:0, right:0, bottom:0, width:'75vw', maxWidth:320, background:'var(--bg-2)', padding:'90px 32px 40px', display:'flex', flexDirection:'column', gap:'1.5rem', borderLeft:'1px solid var(--border-bright)', zIndex:999 }}>
            {navLinks.map((link,i)=>(
              <motion.a key={link} href={`#${link.toLowerCase()}`} onClick={()=>setMenuOpen(false)}
                initial={{ x:30, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ delay:i*0.07 }}
                style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', fontWeight:700, color:'var(--white)', display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ color:'var(--cyan)', fontSize:'0.7rem', fontFamily:'var(--font-mono)' }}>0{i+1}.</span>{link}
              </motion.a>
            ))}
            <motion.a href="mailto:rahulkrishnan.beechithil@gmail.com" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
              style={{ marginTop:'auto', display:'block', textAlign:'center', padding:'14px', background:'var(--cyan)', color:'var(--bg)', fontFamily:'var(--font-mono)', fontSize:'0.8rem', borderRadius:'4px', fontWeight:600 }}>
              HIRE ME
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
      {menuOpen && <div onClick={()=>setMenuOpen(false)} style={{ position:'fixed', inset:0, zIndex:998, background:'rgba(0,0,0,0.5)' }} />}

      <style>{`
        @media(max-width:768px){ .desk-nav{display:none!important} .hamburger{display:flex!important} }
      `}</style>
    </>
  )
}
