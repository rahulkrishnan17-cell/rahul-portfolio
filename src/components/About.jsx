import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function useInView(ref) {
  const [v,setV]=useState(false)
  useEffect(()=>{ const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setV(true) },{threshold:0.1}); if(ref.current)o.observe(ref.current); return()=>o.disconnect() },[])
  return v
}

export default function About() {
  const ref=useRef(null); const inView=useInView(ref)
  return (
    <section id="about" ref={ref} style={{ padding:'100px 6vw', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:'-80px', top:'50%', transform:'translateY(-50%)', width:'350px', height:'350px', border:'1px solid var(--border)', borderRadius:'50%', pointerEvents:'none' }} />

      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap:'clamp(2rem,6vw,5rem)', alignItems:'center' }}>

          {/* Terminal */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ duration:0.7 }}>
            <div style={{ background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ padding:'10px 16px', background:'var(--bg-3)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:'8px' }}>
                {['#ff5f57','#ffbd2e','#28ca41'].map(c=><div key={c} style={{ width:11,height:11,borderRadius:'50%',background:c }} />)}
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--gray)', marginLeft:8 }}>rahul@devops:~</span>
              </div>
              <div style={{ padding:'1.25rem', fontFamily:'var(--font-mono)', fontSize:'clamp(0.7rem,1.5vw,0.8rem)', lineHeight:2 }}>
                {[
                  { p:'$', cmd:'whoami', c:'var(--cyan)' },
                  { out:'rahul.krishnan' },
                  { p:'$', cmd:'cat role.txt', c:'var(--cyan)' },
                  { out:'Associate DevOps Engineer @ BDB' },
                  { p:'$', cmd:'echo $LOCATION', c:'var(--cyan)' },
                  { out:'Bangalore, Karnataka, India' },
                  { p:'$', cmd:'cat stack.json', c:'var(--cyan)' },
                  { out:'["AWS","Kubernetes","Terraform",', j:true },
                  { out:' "FluxCD","GitLab CI","Helm"]', j:true },
                  { p:'$', cmd:'█', c:'var(--green)' },
                ].map((l,i)=>(
                  <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ delay:0.3+i*0.09 }} style={{ display:'flex', gap:'8px' }}>
                    {l.p&&<span style={{ color:'var(--green)' }}>{l.p}</span>}
                    {l.cmd&&<span style={{ color:l.c }}>{l.cmd}</span>}
                    {l.out&&<span style={{ color:l.j?'var(--orange)':'var(--white)', paddingLeft:l.p?0:16 }}>{l.out}</span>}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity:0, x:40 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ duration:0.7, delay:0.2 }}>
            <div className="section-label" style={{ marginBottom:'1.25rem' }}>About Me</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:800, marginBottom:'1.25rem', lineHeight:1.1, letterSpacing:'-0.02em' }}>
              Building resilient<br /><span style={{ color:'var(--cyan)' }}>cloud infrastructure</span>
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem', color:'var(--gray)', lineHeight:1.8, fontSize:'clamp(0.82rem,1.8vw,0.95rem)' }}>
              <p>Passionate DevOps Engineer based in Bangalore, specializing in cloud infrastructure, container orchestration, and automated deployment pipelines.</p>
              <p>With hands-on experience at BizViz Technologies (BDB), I've managed production Kubernetes clusters, implemented GitOps workflows with FluxCD, and supported global clients including MTN (South Africa), Yujaa, and Mascom.</p>
              <p>My approach: automate everything, monitor everything, and build systems that scale.</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'0.75rem', marginTop:'1.75rem' }}>
              {[
                { label:'Current Education', value:'BCA — IGNOU' },
                { label:'BCA Duration', value:'Jul 2026 — Jul 2029' },
                { label:'Education', value:'Diploma in ECE' },
                { label:'Institution', value:'Govt. Polytechnic, Palakkad' },
                { label:'Current Role', value:'Associate DevOps Eng.' },
                { label:'Company', value:'BizViz Technologies (BDB)' },
              ].map(({label,value})=>(
                <div key={label} style={{ padding:'0.7rem', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'4px' }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--cyan)', letterSpacing:'0.1em', marginBottom:3 }}>{label}</div>
                  <div style={{ fontSize:'clamp(0.75rem,1.5vw,0.85rem)', fontWeight:500 }}>{value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
