import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function useInView(ref) {
  const [v,setV]=useState(false)
  useEffect(()=>{ const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setV(true) },{threshold:0.05}); if(ref.current)o.observe(ref.current); return()=>o.disconnect() },[])
  return v
}

const projects = [
  {
    num:'01', icon:'☁️', color:'var(--cyan)',
    title:'BDB Platform — AWS EKS',
    description:'Deployed the complete BDB analytics platform on AWS using EKS for container orchestration and EFS for persistent storage, achieving high availability across production environments.',
    tags:['AWS EKS','EFS','Helm','FluxCD','Terraform'],
    highlights:['Multi-AZ deployment','Auto-scaling','GitOps workflow','IaC with Terraform'],
  },
  {
    num:'02', icon:'📡', color:'#fbbf24',
    title:'MTN — Azure AKS Deployment',
    description:'Deployed and supported BDB platform for Mobile Telecommunications Corp (South Africa) on Azure Kubernetes Service with persistent storage, autoscaling, and real-time monitoring.',
    tags:['Azure','AKS','Azure Files','App Insights','HPA','FluxCD'],
    highlights:['HPA autoscaling','HTTP error tracking','8/5 SLA support','Daily health checks'],
  },
  {
    num:'03', icon:'⚡', color:'var(--cyan)',
    title:'Yujaa — Platform Deployment',
    description:'Deployed and maintained the Yujaa platform on Kubernetes using FluxCD for GitOps-based continuous delivery. Validated dashboards, performed health checks, and coordinated with dev and QA teams.',
    tags:['Kubernetes','FluxCD','GitOps','Prometheus','Grafana'],
    highlights:['FluxCD GitOps','Dashboard validation','Daily health checks','QA coordination'],
  },
  {
    num:'04', icon:'🌍', color:'var(--green)',
    title:'Mascom — Helm Deployment',
    description:'Deployed BDB platform for Mascom (South Africa) using Helm charts for structured Kubernetes deployments. Managed releases, monitored rollouts, and ensured platform stability across environments.',
    tags:['Kubernetes','Helm','Helm Charts','FluxCD','GitOps'],
    highlights:['Helm chart deploy','Release management','Rollout monitoring','Multi-env support'],
  },
  {
    num:'05', icon:'🔄', color:'var(--orange)',
    title:'GitOps CI/CD Pipeline',
    description:'Built end-to-end CI/CD pipeline using GitLab CI with FluxCD for continuous delivery. Implemented container security scanning with Trivy and artifact management via Harbor registry.',
    tags:['GitLab CI','FluxCD','Trivy','Harbor','Docker'],
    highlights:['Image scanning','GitOps delivery','Harbor registry','Auto-deploy on merge'],
  },
  {
    num:'06', icon:'🗄️', color:'#a78bfa',
    title:'Database Backup Automation',
    description:'Designed and implemented automated backup pipelines for MongoDB, PostgreSQL, ClickHouse, Cassandra, and MySQL with cross-server migration support and integrity validation.',
    tags:['MongoDB','PostgreSQL','Cassandra','MySQL','ClickHouse','Bash'],
    highlights:['Multi-DB support','Automated restores','Migration tooling','Integrity checks'],
  },
  {
    num:'07', icon:'📊', color:'#fbbf24',
    title:'Monitoring Stack — Prometheus & Grafana',
    description:'Deployed and configured a comprehensive observability stack using Prometheus for metrics collection and Grafana for dashboards across Kubernetes clusters with alerting rules.',
    tags:['Prometheus','Grafana','Kubernetes','Loki','Kibana'],
    highlights:['Custom dashboards','Alerting rules','Log aggregation','Uptime monitoring'],
  },
  {
    num:'08', icon:'🏥', color:'#f472b6',
    title:'Hospital Booking System',
    description:'Full-stack web application developed during Python internship at Zoople Technologies, enabling patients to book appointments with hospital departments online.',
    tags:['Python','Django','MySQL','HTML/CSS','JavaScript'],
    highlights:['Django backend','MySQL database','Responsive UI','Booking workflow'],
  },
]

export default function Projects() {
  const ref=useRef(null); const inView=useInView(ref)
  return (
    <section id="projects" ref={ref} style={{ padding:'100px 6vw', background:'var(--bg-2)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,var(--cyan-dim),transparent)' }} />
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.5 }}>
          <div className="section-label" style={{ marginBottom:'1rem' }}>Projects</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:800, marginBottom:'0.5rem', letterSpacing:'-0.02em' }}>
            Things I've <span style={{ color:'var(--cyan)' }}>built</span>
          </h2>
          <p style={{ color:'var(--gray)', marginBottom:'2.5rem', maxWidth:500, lineHeight:1.7, fontSize:'clamp(0.82rem,1.8vw,0.9rem)' }}>
            Production deployments, platform support, and personal builds.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap:'1.25rem' }}>
          {projects.map((p,i)=>(
            <motion.div key={p.num} initial={{ opacity:0, y:40 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ delay:i*0.07, duration:0.5 }}
              whileHover={{ y:-5 }}
              style={{ background:'var(--bg-3)', border:'1px solid var(--border)', borderRadius:'8px', padding:'1.5rem', cursor:'default', transition:'border-color 0.3s,box-shadow 0.3s', position:'relative', overflow:'hidden' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.color; e.currentTarget.style.boxShadow=`0 8px 40px rgba(0,0,0,0.4),0 0 0 1px ${p.color}22` }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='none' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.85rem' }}>
                <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                  <span style={{ fontSize:'1.25rem' }}>{p.icon}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:p.color, opacity:0.7 }}>{p.num}</span>
                </div>
                <div style={{ width:7, height:7, borderRadius:'50%', background:p.color, boxShadow:`0 0 10px ${p.color}` }} />
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(0.9rem,2vw,1.05rem)', fontWeight:700, marginBottom:'0.65rem', color:'var(--white)', lineHeight:1.3 }}>{p.title}</h3>
              <p style={{ color:'var(--gray)', fontSize:'clamp(0.75rem,1.5vw,0.82rem)', lineHeight:1.7, marginBottom:'1rem' }}>{p.description}</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px', marginBottom:'1rem' }}>
                {p.highlights.map(h=>(
                  <div key={h} style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'clamp(0.62rem,1.2vw,0.7rem)', color:'var(--gray)', fontFamily:'var(--font-mono)' }}>
                    <span style={{ color:p.color, fontSize:'0.45rem' }}>◆</span>{h}
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
                {p.tags.map(tag=>(
                  <span key={tag} style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', padding:'3px 7px', background:`${p.color}15`, color:p.color, border:`1px solid ${p.color}33`, borderRadius:'2px' }}>{tag}</span>
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
