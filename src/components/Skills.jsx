import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function useInView(ref) {
  const [v,setV]=useState(false)
  useEffect(()=>{ const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setV(true) },{threshold:0.05}); if(ref.current)o.observe(ref.current); return()=>o.disconnect() },[])
  return v
}

const cats = [
  { title:'Cloud & Infrastructure', icon:'☁️', color:'var(--cyan)',
    skills:[{name:'AWS (EC2,EKS,EFS,S3,RDS,ECR,IAM,VPC)',level:85},{name:'Microsoft Azure (AKS, Azure Files)',level:72},{name:'Terraform (IaC)',level:80}] },
  { title:'Containers & Orchestration', icon:'🐳', color:'var(--green)',
    skills:[{name:'Kubernetes (EKS, AKS)',level:88},{name:'Docker / Containerd',level:90},{name:'Helm Charts',level:82}] },
  { title:'CI/CD & GitOps', icon:'🔄', color:'var(--orange)',
    skills:[{name:'GitLab CI/CD',level:85},{name:'FluxCD (GitOps)',level:82},{name:'Jenkins',level:70}] },
  { title:'Monitoring & Observability', icon:'📊', color:'#a78bfa',
    skills:[{name:'Prometheus & Grafana',level:80},{name:'Azure App Insights',level:72},{name:'Kibana / Loki',level:68}] },
]

const badges = [
  'Ubuntu','Git','GitLab','GitHub','Docker','Kubernetes','Helm','FluxCD',
  'Terraform','AWS EKS','Azure AKS','EC2','S3','ECR','IAM','EFS','VPC','RDS',
  'GitLab CI','Jenkins','Prometheus','Grafana','Kibana','Loki','Trivy','Harbor',
  'MongoDB','PostgreSQL','MySQL','ClickHouse','Cassandra','Python','Django','Linux','Bash',
]

export default function Skills() {
  const ref=useRef(null); const inView=useInView(ref)
  return (
    <section id="skills" ref={ref} style={{ padding:'100px 6vw', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0, backgroundImage:'linear-gradient(rgba(0,200,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
      <div style={{ position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.5 }}>
          <div className="section-label" style={{ marginBottom:'1rem' }}>Skills</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:800, marginBottom:'2.5rem', letterSpacing:'-0.02em' }}>
            Tech <span style={{ color:'var(--cyan)' }}>stack</span>
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap:'1.5rem', marginBottom:'3.5rem' }}>
          {cats.map((cat,ci)=>(
            <motion.div key={cat.title} initial={{ opacity:0, y:30 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ delay:ci*0.12, duration:0.5 }}
              style={{ background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:'8px', padding:'1.5rem', boxShadow:'0 4px 30px rgba(0,0,0,0.3)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1.2rem' }}>
                <span style={{ fontSize:'1.1rem' }}>{cat.icon}</span>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(0.85rem,1.8vw,0.95rem)', color:cat.color }}>{cat.title}</span>
              </div>
              {cat.skills.map((skill,si)=>(
                <div key={skill.name} style={{ marginBottom:'0.9rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.65rem,1.3vw,0.72rem)', color:'var(--white)' }}>{skill.name}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:cat.color }}>{skill.level}%</span>
                  </div>
                  <div style={{ height:3, background:'var(--surface-2)', borderRadius:2, overflow:'hidden' }}>
                    <motion.div initial={{ width:0 }} animate={inView?{ width:`${skill.level}%` }:{}} transition={{ delay:ci*0.12+si*0.1+0.4, duration:0.8, ease:'easeOut' }}
                      style={{ height:'100%', background:`linear-gradient(90deg,${cat.color},${cat.color}aa)`, borderRadius:2, boxShadow:`0 0 8px ${cat.color}` }} />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ delay:0.6 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--gray)', letterSpacing:'0.15em', marginBottom:'0.85rem' }}>// ALL TECHNOLOGIES</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'7px' }}>
            {badges.map((tech,i)=>(
              <motion.span key={tech} initial={{ opacity:0, scale:0.85 }} animate={inView?{ opacity:1, scale:1 }:{}} transition={{ delay:0.65+i*0.015 }}
                whileHover={{ scale:1.06, borderColor:'var(--cyan)', color:'var(--cyan)' }}
                style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.6rem,1.2vw,0.7rem)', padding:'5px 11px', border:'1px solid var(--border)', borderRadius:'3px', color:'var(--gray)', background:'var(--surface)', cursor:'default', transition:'all 0.2s' }}>
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
