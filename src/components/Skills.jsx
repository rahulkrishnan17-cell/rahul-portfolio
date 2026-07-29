import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function useInView(ref) {
  const [v,setV] = useState(false)
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if(e.isIntersecting) setV(true) }, { threshold:0.05 }); if(ref.current) o.observe(ref.current); return () => o.disconnect() }, [])
  return v
}

const cats = [
  { title:'Cloud Platforms', icon:'☁️', color:'var(--cyan)',
    skills:[{ name:'AWS (EC2,EKS,ECR,IAM,EFS,VPC,S3,RDS)', level:88 },{ name:'Microsoft Azure (AKS, Azure Files, App Insights)', level:78 },{ name:'Google Cloud Platform (GCP)', level:60 }] },
  { title:'Containers & Orchestration', icon:'🐳', color:'var(--green)',
    skills:[{ name:'Kubernetes (EKS, AKS)', level:90 },{ name:'Docker / Containerd', level:90 },{ name:'Helm Charts', level:85 }] },
  { title:'GitOps & CI/CD', icon:'🔄', color:'var(--orange)',
    skills:[{ name:'FluxCD', level:88 },{ name:'ArgoCD', level:72 },{ name:'GitLab CI/CD', level:85 }] },
  { title:'Monitoring & Observability', icon:'📊', color:'#a78bfa',
    skills:[{ name:'Prometheus, Grafana, Alertmanager', level:83 },{ name:'AWS CloudWatch / Azure Monitor', level:75 },{ name:'Kibana, Loki, Fluentd, Filebeat', level:70 }] },
  { title:'Infrastructure as Code', icon:'🏗️', color:'#fbbf24',
    skills:[{ name:'Terraform', level:82 },{ name:'CloudFormation Templates (CFT)', level:65 },{ name:'KEDA (Event-driven autoscaling)', level:70 }] },
  { title:'Databases & Messaging', icon:'🗄️', color:'#f472b6',
    skills:[{ name:'MongoDB, PostgreSQL, ClickHouse, MySQL', level:80 },{ name:'Apache Kafka (v3.7.0, v4.0)', level:65 },{ name:'IAM Policy Design & Trivy Security', level:78 }] },
]

const badges = [
  'Ubuntu / Linux','Git','GitLab','GitHub',
  'Docker','Containerd','Kubernetes','Helm','FluxCD','ArgoCD',
  'Terraform','CloudFormation','AWS EKS','Azure AKS','GCP',
  'EC2','S3','ECR','IAM','EFS','VPC','RDS','AWS CloudWatch',
  'Azure Files','Azure Monitor','GCP Cloud Monitoring',
  'GitLab CI','Jenkins','Prometheus','Grafana','Alertmanager',
  'Kibana','Loki','Fluentd','Filebeat','KEDA',
  'Trivy','Harbor','Docker Hub',
  'MongoDB','PostgreSQL','MySQL','ClickHouse',
  'Apache Kafka','Python','Django','Bash',
]

export default function Skills() {
  const ref = useRef(null); const inView = useInView(ref)
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

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap:'1.25rem', marginBottom:'3.5rem' }}>
          {cats.map((cat,ci) => (
            <motion.div key={cat.title} initial={{ opacity:0, y:30 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ delay:ci*0.1, duration:0.5 }}
              style={{ background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:'8px', padding:'1.35rem', boxShadow:'0 4px 30px rgba(0,0,0,0.3)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1.1rem' }}>
                <span style={{ fontSize:'1.1rem' }}>{cat.icon}</span>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(0.82rem,1.7vw,0.92rem)', color:cat.color }}>{cat.title}</span>
              </div>
              {cat.skills.map((skill,si) => (
                <div key={skill.name} style={{ marginBottom:'0.85rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.62rem,1.2vw,0.7rem)', color:'var(--white)' }}>{skill.name}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:cat.color }}>{skill.level}%</span>
                  </div>
                  <div style={{ height:3, background:'var(--surface-2)', borderRadius:2, overflow:'hidden' }}>
                    <motion.div initial={{ width:0 }} animate={inView?{ width:`${skill.level}%` }:{}} transition={{ delay:ci*0.1+si*0.1+0.4, duration:0.8, ease:'easeOut' }}
                      style={{ height:'100%', background:`linear-gradient(90deg,${cat.color},${cat.color}aa)`, borderRadius:2, boxShadow:`0 0 8px ${cat.color}` }} />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ delay:0.6 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.63rem', color:'var(--gray)', letterSpacing:'0.15em', marginBottom:'0.85rem' }}>// ALL TECHNOLOGIES</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'7px' }}>
            {badges.map((tech,i) => (
              <motion.span key={tech} initial={{ opacity:0, scale:0.85 }} animate={inView?{ opacity:1, scale:1 }:{}} transition={{ delay:0.65+i*0.012 }}
                whileHover={{ scale:1.06, borderColor:'var(--cyan)', color:'var(--cyan)' }}
                style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.58rem,1.1vw,0.68rem)', padding:'5px 10px', border:'1px solid var(--border)', borderRadius:'3px', color:'var(--gray)', background:'var(--surface)', cursor:'default', transition:'all 0.2s' }}>
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}