import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function useInView(ref) {
  const [v,setV] = useState(false)
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if(e.isIntersecting) setV(true) }, { threshold:0.05 }); if(ref.current) o.observe(ref.current); return () => o.disconnect() }, [])
  return v
}

const projects = [
  {
    num:'01', icon:'☁️', color:'var(--cyan)',
    title:'BDB Platform — AWS EKS',
    description:'Deployed the complete BDB analytics platform on AWS using EKS for container orchestration and EFS for persistent storage, with reusable Terraform IaC modules for fast provisioning.',
    tags:['AWS EKS','EFS','Helm','FluxCD','Terraform','IAM'],
    highlights:['Multi-AZ deployment','Reusable IaC modules','GitOps workflow','ECR image retention'],
  },
  {
    num:'02', icon:'📡', color:'#fbbf24',
    title:'MTN — Azure AKS Deployment',
    description:'Deployed and supported BDB platform for Mobile Telecommunications Corp (South Africa) on Azure Kubernetes Service. Implemented KEDA autoscaling using Prometheus HTTP request metrics as scaling trigger.',
    tags:['Azure','AKS','KEDA','HPA','FluxCD','App Insights'],
    highlights:['KEDA autoscaling','HTTP request metrics','Zero data-loss','8/5 SLA support'],
  },
  {
    num:'03', icon:'🌍', color:'var(--green)',
    title:'Mascom — On-Premises Kubernetes',
    description:'Led standalone on-premises deployment of BDB platform for Mascom (Botswana) using Helm charts in a self-hosted Kubernetes environment. Deployed MongoDB on bare-metal with HA configuration.',
    tags:['Kubernetes','Helm','MongoDB','On-Premises','Bare-Metal'],
    highlights:['Bare-metal MongoDB','Capacity sizing','Release rollbacks','On-site coordination'],
  },
  {
    num:'04', icon:'⚡', color:'var(--cyan)',
    title:'Yujaa — GitOps Platform',
    description:'Deployed and maintained the Yujaa platform on Kubernetes using FluxCD for GitOps-based continuous delivery with daily health checks and dashboard validation.',
    tags:['Kubernetes','FluxCD','GitOps','Prometheus','Grafana'],
    highlights:['FluxCD GitOps','Dashboard validation','Daily health checks','QA coordination'],
  },
  {
    num:'05', icon:'🔔', color:'#a78bfa',
    title:'Alertmanager + Teams Integration',
    description:'Configured Prometheus Alertmanager with Microsoft Teams webhook integration and Power Automate to route production alerts, improving incident detection time and uptime visibility across namespaces.',
    tags:['Prometheus','Alertmanager','MS Teams','Power Automate','Grafana'],
    highlights:['Teams webhook alerts','Power Automate flows','Namespace-level visibility','Faster incident detection'],
  },
  {
    num:'06', icon:'💰', color:'#fbbf24',
    title:'Azure Cloud Cost Analysis',
    description:'Analyzed multi-subscription Azure cloud costs across UAT and PROD environments, flagged budget overruns, and identified Cosmos DB as the primary cost driver — informing optimization decisions.',
    tags:['Azure Monitor','Cost Analysis','UAT/PROD','Cosmos DB'],
    highlights:['Multi-subscription analysis','Budget overrun alerts','Cost driver identified','Optimization decisions'],
  },
  {
    num:'07', icon:'🔄', color:'var(--orange)',
    title:'GitOps CI/CD Pipeline',
    description:'Built end-to-end CI/CD pipeline using GitLab CI with FluxCD. Automated ECR image updates for Dev and Staging using FluxCD image automation; configured ECR retention policies to cut storage costs.',
    tags:['GitLab CI','FluxCD','ECR','Docker','Harbor','Trivy'],
    highlights:['ECR image automation','Image retention policy','Security scanning','Auto-deploy on push'],
  },
  {
    num:'08', icon:'🗄️', color:'#f472b6',
    title:'Database Backup Automation',
    description:'Designed and implemented automated backup and upgrade pipelines for MongoDB, PostgreSQL, ClickHouse, and MySQL — reducing monthly manual DBA effort significantly.',
    tags:['MongoDB','PostgreSQL','ClickHouse','MySQL','Bash'],
    highlights:['Multi-DB support','Automated upgrades','Restore testing','Manual effort reduced'],
  },
  {
    num:'09', icon:'📊', color:'var(--green)',
    title:'Kubernetes Capacity Planning',
    description:'Performed Kubernetes capacity planning across worker nodes, identifying memory overcommitment risks and recommending resource limits and requests to prevent production outages.',
    tags:['Kubernetes','Prometheus','Grafana','Resource Limits','HPA'],
    highlights:['Memory overcommit detection','Resource recommendations','Node-level analysis','Outage prevention'],
  },
  {
    num:'10', icon:'🏥', color:'#a78bfa',
    title:'Hospital Booking System',
    description:'Full-stack web application built during Python internship — enabling patients to book hospital appointments online with Django backend and MySQL database.',
    tags:['Python','Django','MySQL','HTML/CSS','JavaScript'],
    highlights:['Django backend','MySQL database','Responsive UI','Booking workflow'],
  },
]

export default function Projects() {
  const ref = useRef(null); const inView = useInView(ref)
  return (
    <section id="projects" ref={ref} style={{ padding:'100px 6vw', background:'var(--bg-2)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,var(--cyan-dim),transparent)' }} />
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.5 }}>
          <div className="section-label" style={{ marginBottom:'1rem' }}>Projects</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:800, marginBottom:'0.5rem', letterSpacing:'-0.02em' }}>
            Things I've <span style={{ color:'var(--cyan)' }}>built</span>
          </h2>
          <p style={{ color:'var(--gray)', marginBottom:'2.5rem', maxWidth:500, lineHeight:1.7, fontSize:'clamp(0.8rem,1.7vw,0.9rem)' }}>
            Production deployments, cloud infrastructure, and automation across global clients.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap:'1.2rem' }}>
          {projects.map((p,i) => (
            <motion.div key={p.num} initial={{ opacity:0, y:40 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ delay:i*0.06, duration:0.5 }}
              whileHover={{ y:-5 }}
              style={{ background:'var(--bg-3)', border:'1px solid var(--border)', borderRadius:'8px', padding:'1.4rem', cursor:'default', transition:'border-color 0.3s,box-shadow 0.3s', position:'relative', overflow:'hidden' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.color; e.currentTarget.style.boxShadow=`0 8px 40px rgba(0,0,0,0.4)` }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='none' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.8rem' }}>
                <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                  <span style={{ fontSize:'1.2rem' }}>{p.icon}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:p.color, opacity:0.7 }}>{p.num}</span>
                </div>
                <div style={{ width:7, height:7, borderRadius:'50%', background:p.color, boxShadow:`0 0 10px ${p.color}` }} />
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(0.88rem,1.8vw,1rem)', fontWeight:700, marginBottom:'0.6rem', color:'var(--white)', lineHeight:1.3 }}>{p.title}</h3>
              <p style={{ color:'var(--gray)', fontSize:'clamp(0.73rem,1.4vw,0.8rem)', lineHeight:1.7, marginBottom:'0.9rem' }}>{p.description}</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px', marginBottom:'0.9rem' }}>
                {p.highlights.map(h => (
                  <div key={h} style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'clamp(0.6rem,1.1vw,0.68rem)', color:'var(--gray)', fontFamily:'var(--font-mono)' }}>
                    <span style={{ color:p.color, fontSize:'0.42rem' }}>◆</span>{h}
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ fontFamily:'var(--font-mono)', fontSize:'0.57rem', padding:'3px 7px', background:`${p.color}15`, color:p.color, border:`1px solid ${p.color}33`, borderRadius:'2px' }}>{tag}</span>
                ))}
              </div>
              <div style={{ position:'absolute', top:0, right:0, width:60, height:60, background:`radial-gradient(circle at top right,${p.color}10,transparent)`, pointerEvents:'none' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}