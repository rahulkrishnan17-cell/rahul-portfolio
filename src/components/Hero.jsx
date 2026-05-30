import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function GridCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, t = 0
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cols = Math.ceil(canvas.width / 60)
      const rows = Math.ceil(canvas.height / 60)
      for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
          const dist = Math.sin(x*0.3+t) * Math.cos(y*0.3+t*0.7)
          ctx.beginPath(); ctx.arc(x*60, y*60, 1.5, 0, Math.PI*2)
          ctx.fillStyle = `rgba(0,200,255,${(dist+1)*0.025})`; ctx.fill()
        }
      }
      ctx.strokeStyle='rgba(0,200,255,0.025)'; ctx.lineWidth=1
      for (let i=-rows; i<cols+rows; i++) {
        ctx.beginPath(); ctx.moveTo(i*60,0); ctx.lineTo(i*60+canvas.height,canvas.height); ctx.stroke()
      }
      t+=0.005; animId=requestAnimationFrame(draw)
    }
    draw()
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  },[])
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:0 }} />
}

const words = ['Infrastructure','Automation','Kubernetes','CI/CD Pipelines','Cloud Systems','GitOps']
const nameLetters = ['R','a','h','u','l',' ','K','r','i','s','h','n','a','n']

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  useEffect(()=>{ const t=setInterval(()=>setWordIdx(i=>(i+1)%words.length),2500); return()=>clearInterval(t) },[])

  return (
    <section id="hero" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
      <GridCanvas />
      <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)', width:'min(600px,80vw)', height:'min(600px,80vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,200,255,0.07) 0%,transparent 70%)', pointerEvents:'none', zIndex:1 }} />
      <div style={{ position:'absolute', bottom:'20%', right:'5%', width:'min(300px,40vw)', height:'min(300px,40vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,157,0.05) 0%,transparent 70%)', pointerEvents:'none', zIndex:1 }} />

      <div style={{ position:'relative', zIndex:2, padding:'80px 6vw 60px', maxWidth:1100, width:'100%' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}
          style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.65rem,1.5vw,0.8rem)', color:'var(--green)', letterSpacing:'0.2em', marginBottom:'1.2rem' }}>
          {'>'} HELLO WORLD — I'M
        </motion.div>

        {/* Animated name letters */}
        <div style={{ marginBottom:'0.75rem', lineHeight:1.1 }}>
          {nameLetters.map((letter,i)=>(
            <motion.span key={i}
              initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.75+i*0.07, duration:0.4, ease:'easeOut' }}
              style={{
                display:'inline-block',
                fontFamily:'var(--font-display)', fontWeight:800,
                fontSize:'clamp(2.2rem,5vw,4rem)',
                letterSpacing:'-0.02em',
                color: i<5 ? 'var(--white)' : 'var(--cyan)',
                textShadow: i>=6 ? '0 0 40px rgba(0,200,255,0.4)' : 'none',
                whiteSpace:'pre',
              }}>
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.9 }}
          style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1.5rem', flexWrap:'wrap' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.8rem,2vw,1rem)', color:'var(--gray)' }}>
            Associate DevOps Engineer
          </span>
          <span style={{ width:6, height:6, background:'var(--green)', borderRadius:'50%', boxShadow:'0 0 10px var(--green)', display:'inline-block', animation:'pulse 2s infinite', flexShrink:0 }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.65rem,1.5vw,0.78rem)', color:'var(--green)' }}>Available for opportunities</span>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}
          style={{ marginBottom:'2.5rem', overflow:'hidden', height:'2rem', display:'flex', alignItems:'center' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'clamp(0.85rem,2vw,1rem)', color:'var(--gray)', marginRight:8 }}>Architecting</span>
          <motion.span key={wordIdx} initial={{ y:30,opacity:0 }} animate={{ y:0,opacity:1 }} exit={{ y:-30,opacity:0 }} transition={{ duration:0.35 }}
            style={{ fontFamily:'var(--font-display)', fontSize:'clamp(0.85rem,2vw,1rem)', fontWeight:700, color:'var(--cyan)' }}>
            {words[wordIdx]}
          </motion.span>
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2 }}
          style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', marginBottom:'3rem' }}>
          <a href="#experience" style={{ padding:'12px 28px', background:'var(--cyan)', color:'var(--bg)', fontFamily:'var(--font-mono)', fontSize:'clamp(0.7rem,1.5vw,0.8rem)', fontWeight:600, letterSpacing:'0.08em', borderRadius:'3px', transition:'all 0.2s', boxShadow:'0 0 30px rgba(0,200,255,0.3)', whiteSpace:'nowrap' }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 50px rgba(0,200,255,0.6)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='0 0 30px rgba(0,200,255,0.3)'}>
            VIEW MY WORK →
          </a>
          <a href="#contact" style={{ padding:'12px 28px', border:'1px solid var(--border-bright)', color:'var(--white)', fontFamily:'var(--font-mono)', fontSize:'clamp(0.7rem,1.5vw,0.8rem)', letterSpacing:'0.08em', borderRadius:'3px', transition:'all 0.2s', whiteSpace:'nowrap' }}
            onMouseEnter={e=>{ e.currentTarget.style.background='var(--surface)'; e.currentTarget.style.borderColor='var(--cyan)' }}
            onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='var(--border-bright)' }}>
            GET IN TOUCH
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
          style={{ display:'flex', gap:'clamp(1rem,4vw,3rem)', flexWrap:'wrap' }}>
          {[{val:'2+',label:'Years Experience'},{val:'4+',label:'Projects Delivered'},{val:'10+',label:'Technologies'},{val:'AWS',label:'Cloud Platform'}].map(({val,label})=>(
            <div key={label} style={{ borderLeft:'2px solid var(--border-bright)', paddingLeft:'1rem' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.2rem,3vw,1.6rem)', fontWeight:800, color:'var(--cyan)' }}>{val}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.58rem,1.2vw,0.65rem)', color:'var(--gray)', letterSpacing:'0.08em' }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
        style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', zIndex:2 }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:'var(--gray)', letterSpacing:'0.2em' }}>SCROLL</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.5, repeat:Infinity }}
          style={{ width:1, height:36, background:'linear-gradient(to bottom,var(--cyan),transparent)' }} />
      </motion.div>
    </section>
  )
}
