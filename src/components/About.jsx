import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function useInView(ref) {
  const [v,setV] = useState(false)
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if(e.isIntersecting) setV(true) }, { threshold:0.1 }); if(ref.current) o.observe(ref.current); return () => o.disconnect() }, [])
  return v
}

export default function About() {
  const ref = useRef(null); const inView = useInView(ref)
  return (
    <section id="about" ref={ref} style={{ padding:'100px 6vw', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:'-80px', top:'50%', transform:'translateY(-50%)', width:'350px', height:'350px', border:'1px solid var(--border)', borderRadius:'50%', pointerEvents:'none' }} />

      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap:'clamp(2rem,6vw,5rem)', alignItems:'start' }}>

          {/* Terminal */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ duration:0.7 }}>
            <div style={{ background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ padding:'10px 16px', background:'var(--bg-3)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:'8px' }}>
                {['#ff5f57','#ffbd2e','#28ca41'].map(c => <div key={c} style={{ width:11, height:11, borderRadius:'50%', background:c }} />)}
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--gray)', marginLeft:8 }}>rahul@devops:~</span>
              </div>
              <div style={{ padding:'1.25rem', fontFamily:'var(--font-mono)', fontSize:'clamp(0.68rem,1.4vw,0.78rem)', lineHeight:2 }}>
                {[
                  { p:'$', cmd:'whoami' },
                  { out:'rahul.krishnan' },
                  { p:'$', cmd:'cat role.txt' },
                  { out:'DevOps Engineer @ BizViz (BDB)' },
                  { p:'$', cmd:'cat experience.txt' },
                  { out:'2+ years | AWS · Azure · GCP' },
                  { p:'$', cmd:'cat education.txt' },
                  { out:'BCA — IGNOU (2026–2029)' },
                  { out:'Diploma ECE — Govt. Poly, Palakkad' },
                  { p:'$', cmd:'echo $STATUS' },
                  { out:'open_to_opportunities ✓', green:true },
                  { p:'$', cmd:'█', blink:true },
                ].map((l,i) => (
                  <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ delay:0.3+i*0.08 }} style={{ display:'flex', gap:'8px' }}>
                    {l.p && <span style={{ color:'var(--green)' }}>{l.p}</span>}
                    {l.cmd && <span style={{ color:'var(--cyan)' }}>{l.cmd}</span>}
                    {l.out && <span style={{ color: l.green ? 'var(--green)' : 'var(--white)', paddingLeft: l.p ? 0 : 16 }}>{l.out}</span>}
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
            <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem', color:'var(--gray)', lineHeight:1.8, fontSize:'clamp(0.82rem,1.8vw,0.92rem)' }}>
              <p>DevOps Engineer with 2+ years of experience building and operating CI/CD pipelines, GitOps workflows, and Kubernetes-based deployments across AWS, Azure, and GCP — including cloud and on-premises environments.</p>
              <p>Skilled in Infrastructure as Code (Terraform), container orchestration (EKS, AKS), and GitOps delivery with FluxCD, ArgoCD, and Helm. Experienced supporting production platforms for global telecom and enterprise clients.</p>
              <p>Track record of improving system reliability through proactive monitoring and autoscaling (Prometheus, Grafana, KEDA), and reducing manual overhead through automation.</p>
            </div>

            {/* Education cards */}
            <div style={{ marginTop:'1.75rem' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--cyan)', letterSpacing:'0.15em', marginBottom:'0.75rem' }}>// EDUCATION</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
                {[
                  { degree:'BCA — Bachelor of Computer Applications', inst:'IGNOU, Study Centre 1300, Bangalore', period:'Jul 2026 – 2029 (In Progress)', color:'var(--cyan)' },
                  { degree:'Diploma in ECE', inst:'Govt. Polytechnic College, Palakkad, Kerala', period:'2020 – 2022', color:'var(--green)' },
                ].map(e => (
                  <div key={e.degree} style={{ padding:'0.85rem 1rem', background:'var(--surface)', border:`1px solid ${e.color}33`, borderLeft:`3px solid ${e.color}`, borderRadius:'4px' }}>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(0.78rem,1.6vw,0.88rem)', color:'var(--white)', marginBottom:3 }}>{e.degree}</div>
                    <div style={{ fontFamily:'var(--font-body)', fontSize:'clamp(0.72rem,1.4vw,0.8rem)', color:'var(--gray)', marginBottom:2 }}>{e.inst}</div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:e.color }}>{e.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}