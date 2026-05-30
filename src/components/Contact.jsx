import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

function useInView(ref) {
  const [v,setV]=useState(false)
  useEffect(()=>{ const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setV(true) },{threshold:0.1}); if(ref.current)o.observe(ref.current); return()=>o.disconnect() },[])
  return v
}

export default function Contact() {
  const ref=useRef(null); const inView=useInView(ref)
  const [copied,setCopied]=useState('')
  const copy=(text,label)=>{ navigator.clipboard.writeText(text); setCopied(label); setTimeout(()=>setCopied(''),2000) }

  const contacts=[
    { label:'Email', value:'rahulkrishnan.beechithil@gmail.com', icon:'✉', href:'mailto:rahulkrishnan.beechithil@gmail.com', copyable:true },
    { label:'Phone', value:'+91 9544364192', icon:'📞', href:'tel:+919544364192', copyable:true },
    { label:'LinkedIn', value:'linkedin.com/in/Rahulkrishnan', icon:'💼', href:'https://linkedin.com/in/Rahulkrishnan', copyable:false },
    { label:'Location', value:'Bangalore, India', icon:'📍', href:null, copyable:false },
  ]

  return (
    <section id="contact" ref={ref} style={{ padding:'100px 6vw', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', bottom:'-2rem', right:'-1rem', fontFamily:'var(--font-display)', fontSize:'clamp(4rem,12vw,12rem)', fontWeight:800, color:'rgba(0,200,255,0.03)', pointerEvents:'none', userSelect:'none', lineHeight:1 }}>CONTACT</div>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.5 }}>
          <div className="section-label" style={{ marginBottom:'1rem' }}>Contact</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,5vw,3.5rem)', fontWeight:800, marginBottom:'0.85rem', letterSpacing:'-0.03em' }}>
            Let's work <span style={{ color:'var(--cyan)' }}>together</span>
          </h2>
          <p style={{ color:'var(--gray)', maxWidth:480, lineHeight:1.7, marginBottom:'2.5rem', fontSize:'clamp(0.82rem,1.8vw,0.95rem)' }}>
            Open to DevOps engineering roles, cloud consulting, and infrastructure projects. Drop me a message — I respond within 24 hours.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap:'clamp(1.5rem,5vw,4rem)', alignItems:'start' }}>
          {/* Contact cards */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ delay:0.2, duration:0.6 }}
            style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
            {contacts.map((c,i)=>(
              <motion.div key={c.label} initial={{ opacity:0, x:-20 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ delay:0.3+i*0.1 }}
                style={{ display:'flex', alignItems:'center', gap:'0.85rem', padding:'0.85rem 1.1rem', background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:'6px', transition:'all 0.2s' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--cyan)'; e.currentTarget.style.background='var(--surface)' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-2)' }}>
                <span style={{ fontSize:'1rem', width:28, textAlign:'center', flexShrink:0 }}>{c.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:'var(--cyan)', letterSpacing:'0.12em', marginBottom:2 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http')?'_blank':undefined}
                      style={{ fontSize:'clamp(0.72rem,1.4vw,0.82rem)', color:'var(--white)', fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', display:'block' }}>
                      {c.value}
                    </a>
                  ) : (
                    <span style={{ fontSize:'clamp(0.72rem,1.4vw,0.82rem)', color:'var(--white)', fontWeight:500 }}>{c.value}</span>
                  )}
                </div>
                {c.copyable&&(
                  <button onClick={()=>copy(c.value,c.label)}
                    style={{ background:'none', border:'none', cursor:'pointer', padding:'3px 7px', fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:copied===c.label?'var(--green)':'var(--gray)', transition:'color 0.2s', flexShrink:0 }}>
                    {copied===c.label?'✓ COPIED':'COPY'}
                  </button>
                )}
              </motion.div>
            ))}
            <motion.div initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ delay:0.8 }}
              style={{ display:'flex', gap:'10px', marginTop:'0.5rem', flexWrap:'wrap' }}>
              {[{label:'GitHub',href:'https://github.com'},{label:'LinkedIn',href:'https://linkedin.com/in/Rahulkrishnan'}].map(s=>(
                <a key={s.label} href={s.href} target="_blank"
                  style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.08em', padding:'9px 18px', border:'1px solid var(--border)', borderRadius:'3px', color:'var(--gray)', transition:'all 0.2s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--cyan)'; e.currentTarget.style.color='var(--cyan)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--gray)' }}>
                  {s.label} ↗
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ delay:0.4, duration:0.6 }}
            style={{ background:'var(--bg-2)', border:'1px solid var(--border-bright)', borderRadius:'8px', padding:'clamp(1.5rem,4vw,2.5rem)', boxShadow:'0 0 60px rgba(0,200,255,0.05)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, right:0, width:'180px', height:'180px', background:'radial-gradient(circle at top right,rgba(0,200,255,0.08),transparent)', pointerEvents:'none' }} />
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--cyan)', letterSpacing:'0.18em', marginBottom:'0.85rem' }}>{'>'} AVAILABLE_FOR_HIRE</div>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.2rem,3vw,1.5rem)', fontWeight:800, marginBottom:'0.85rem', lineHeight:1.2 }}>
              Ready to build<br /><span style={{ color:'var(--cyan)' }}>something great?</span>
            </h3>
            <p style={{ color:'var(--gray)', fontSize:'clamp(0.78rem,1.5vw,0.85rem)', lineHeight:1.7, marginBottom:'1.5rem' }}>
              Passionate about cloud infrastructure, automation, and DevOps culture. Whether full-time or project-based, let's connect.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'1.5rem' }}>
              {['Cloud Infrastructure (AWS / Azure)','Kubernetes & Container Orchestration','CI/CD & GitOps Pipelines','Monitoring & Observability'].map(item=>(
                <div key={item} style={{ display:'flex', gap:'8px', alignItems:'center', fontSize:'clamp(0.75rem,1.4vw,0.8rem)', color:'var(--gray)' }}>
                  <span style={{ color:'var(--green)', fontSize:'0.55rem', flexShrink:0 }}>●</span>{item}
                </div>
              ))}
            </div>
            <a href="mailto:rahulkrishnan.beechithil@gmail.com"
              style={{ display:'block', textAlign:'center', padding:'13px', background:'var(--cyan)', color:'var(--bg)', fontFamily:'var(--font-mono)', fontSize:'clamp(0.72rem,1.5vw,0.8rem)', fontWeight:600, letterSpacing:'0.08em', borderRadius:'4px', transition:'all 0.2s', boxShadow:'0 0 20px rgba(0,200,255,0.3)' }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 40px rgba(0,200,255,0.6)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='0 0 20px rgba(0,200,255,0.3)'}>
              SEND ME AN EMAIL →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
