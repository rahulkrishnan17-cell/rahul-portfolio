import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function useInView(ref) {
  const [v,setV] = useState(false)
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if(e.isIntersecting) setV(true) }, { threshold:0.05 }); if(ref.current) o.observe(ref.current); return () => o.disconnect() }, [])
  return v
}

const experiences = [
  {
    role:'DevOps Engineer',
    company:'BizViz Technologies (BDB)',
    period:'Jul 2024 – Present',
    type:'Full Time',
    color:'var(--cyan)',
    bullets:[
      'Managed and deployed cloud infrastructure using Terraform and AWS services, reducing manual provisioning time through reusable IaC modules',
      'Designed IAM roles and least-privilege policies for secure access to S3, ECR, and Secrets Manager across AWS accounts',
      'Deployed and maintained multiple Kubernetes (EKS) clusters',
      'Implemented GitOps with FluxCD for automated, auditable deployments — cutting deployment turnaround time through automated releases',
      'Built and maintained CI/CD pipelines using GitLab CI, improving release frequency and reducing manual deployment steps',
      'Monitored production systems with Prometheus, Grafana, and Alertmanager (incl. Microsoft Teams webhook + Power Automate integration)',
      'Automated database backup and upgrade processes for MongoDB, PostgreSQL, ClickHouse, and MySQL',
      'Performed Kubernetes capacity planning across worker nodes, identifying memory overcommitment risks',
      'Analyzed multi-subscription Azure cloud costs (UAT/PROD), flagging budget overruns and identifying Cosmos DB as a primary cost driver',
      'Automated ECR image updates for Dev and Staging using FluxCD; configured ECR image retention policies to reduce storage costs',
      'Collaborated with globally distributed teams for MTN (South Africa), Mascom (Botswana), and Yujaa',
    ],
    tags:['AWS','Kubernetes','Terraform','FluxCD','GitLab CI','Helm','Prometheus','Grafana','ArgoCD'],
    clients:[
      {
        name:'MTN',
        full:'Mobile Telecommunications Corp, South Africa',
        icon:'📡',
        color:'#fbbf24',
        points:[
          'Maintained Kubernetes deployments using FluxCD for continuous delivery, ensuring consistent auditable production releases',
          'Deployed BDB platform on Microsoft Azure using AKS and Azure Files for persistent storage, supporting high availability at scale',
          'Monitored application performance with Azure Application Insights, identifying and resolving HTTP 404/400/500 errors',
          'Configured Kubernetes HPA for CPU/memory-based autoscaling, improving resource efficiency',
          'Researched and implemented KEDA-based autoscaling using Prometheus metrics on incoming HTTP request volume as scaling trigger',
          'Performed daily health checks and validated dashboard data, providing 8/5 production support',
          'Monitored database backups to confirm completion and data integrity, ensuring zero data-loss incidents',
        ],
        tags:['Azure','AKS','Azure Files','App Insights','HPA','KEDA','FluxCD','Prometheus'],
      },
      {
        name:'Mascom',
        full:'Mascom — Botswana (On-Premises)',
        icon:'🌍',
        color:'var(--green)',
        points:[
          'Led a standalone on-premises deployment of the BDB platform for Mascom, separate from the cloud-based MTN environment',
          'Installed and configured the full platform on-premises using Helm charts, managing release versions and rollbacks in a self-hosted Kubernetes environment',
          'Deployed and maintained MongoDB on a dedicated bare-metal server, configuring for high availability and performing daily maintenance',
          'Coordinated directly with the customer\'s infrastructure team to plan server, storage, and networking changes',
          'Performed resource calculation and capacity sizing (CPU, memory, storage) to right-size the on-premises infrastructure',
          'Resolved on-site infrastructure dependencies and environment-specific configuration issues during rollout',
        ],
        tags:['Kubernetes','Helm','MongoDB','On-Premises','Bare-Metal','GitOps'],
      },
      {
        name:'Yujaa',
        full:'Yujaa Platform — Client Deployment',
        icon:'⚡',
        color:'var(--cyan)',
        points:[
          'Deployed and maintained the Yujaa platform on Kubernetes using FluxCD for GitOps-based continuous delivery',
          'Validated dashboard data and reported discrepancies to development and QA teams',
          'Performed daily health checks on all critical platform components',
          'Monitored database backups and confirmed data integrity after each run',
          'Provided continuous support and resolved staging issues promptly',
        ],
        tags:['Kubernetes','FluxCD','GitOps','Prometheus','Grafana'],
      },
    ],
  },
  {
    role:'Trainee – DevOps',
    company:'BizViz Technologies (BDB)',
    period:'Apr 2024 – Jul 2024',
    type:'Trainee',
    color:'var(--orange)',
    bullets:[
      'Gained hands-on experience with Docker, Kubernetes, Jenkins, Git, GitHub, GitLab, FluxCD, Helm, Prometheus, Grafana, AWS, and Linux',
      'Deployed the BDB platform on AWS using EKS and EFS for persistent storage, ensuring high availability and scalability',
    ],
    tags:['Docker','Kubernetes','Jenkins','AWS EKS','EFS','Prometheus','Grafana','Helm'],
    clients:[],
  },
  {
    role:'Python Development Intern',
    company:'Zoople Technologies',
    period:'Nov 2023 – Mar 2024',
    type:'Internship',
    color:'#a78bfa',
    bullets:[
      'Completed hands-on training in HTML, CSS, JavaScript, Python, Django, and MySQL',
      'Built a Watch Online streaming website using HTML, CSS, and JavaScript',
      'Built a Hospital Booking System using HTML, CSS, JavaScript, Python, Django, and MySQL',
    ],
    tags:['Python','Django','JavaScript','MySQL','HTML/CSS'],
    clients:[],
  },
]

function ExpContent({ exp, activeClient, setActiveClient }) {
  return (
    <>
      <div style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem', flexWrap:'wrap', marginBottom:'0.4rem' }}>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1rem,2.5vw,1.25rem)', fontWeight:700 }}>{exp.role}</h3>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:exp.color, padding:'3px 10px', border:`1px solid ${exp.color}`, borderRadius:'2px', opacity:0.85, whiteSpace:'nowrap' }}>{exp.type}</span>
      </div>
      <div style={{ fontFamily:'var(--font-body)', fontSize:'0.88rem', color:exp.color, marginBottom:'0.2rem', fontWeight:500 }}>@ {exp.company}</div>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--gray)', marginBottom:'1.25rem' }}>{exp.period}</div>

      <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.6rem', marginBottom:'1.25rem' }}>
        {exp.bullets.map((b,i) => (
          <motion.li key={i} initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.04 }}
            style={{ display:'flex', gap:'10px', alignItems:'flex-start', color:'var(--gray)', fontSize:'clamp(0.76rem,1.5vw,0.85rem)', lineHeight:1.6 }}>
            <span style={{ color:exp.color, marginTop:5, flexShrink:0, fontSize:'0.52rem' }}>▶</span>{b}
          </motion.li>
        ))}
      </ul>

      {exp.clients.length > 0 && (
        <div style={{ marginBottom:'1.25rem' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--gray)', letterSpacing:'0.12em', marginBottom:'0.65rem' }}>// CLICK CLIENT TO EXPAND DETAILS</div>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {exp.clients.map((client,ci) => (
              <button key={client.name} onClick={() => setActiveClient(activeClient===ci?null:ci)}
                style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', padding:'7px 14px', border:`1px solid ${activeClient===ci?client.color:'var(--border)'}`, borderRadius:'4px', cursor:'pointer', background:activeClient===ci?`${client.color}18`:'var(--surface)', color:activeClient===ci?client.color:'var(--gray)', transition:'all 0.2s', display:'flex', alignItems:'center', gap:'6px' }}>
                <span>{client.icon}</span>{client.name}
                <motion.span animate={{ rotate:activeClient===ci?180:0 }} style={{ fontSize:'0.52rem', marginLeft:2 }}>▼</motion.span>
              </button>
            ))}
          </div>
          <AnimatePresence>
            {activeClient !== null && (
              <motion.div key={activeClient} initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} transition={{ duration:0.3 }} style={{ overflow:'hidden', marginTop:'0.75rem' }}>
                <div style={{ padding:'1.1rem', background:'var(--bg-3)', border:`1px solid ${exp.clients[activeClient].color}44`, borderRadius:'6px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'0.85rem' }}>
                    <span style={{ fontSize:'1.2rem' }}>{exp.clients[activeClient].icon}</span>
                    <div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.95rem', color:exp.clients[activeClient].color }}>{exp.clients[activeClient].name}</div>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--gray)' }}>{exp.clients[activeClient].full}</div>
                    </div>
                  </div>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.55rem', marginBottom:'0.85rem' }}>
                    {exp.clients[activeClient].points.map((p,pi) => (
                      <motion.li key={pi} initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} transition={{ delay:pi*0.04 }}
                        style={{ display:'flex', gap:'8px', alignItems:'flex-start', color:'var(--gray)', fontSize:'clamp(0.73rem,1.4vw,0.82rem)', lineHeight:1.6 }}>
                        <span style={{ color:exp.clients[activeClient].color, marginTop:5, flexShrink:0, fontSize:'0.45rem' }}>◆</span>{p}
                      </motion.li>
                    ))}
                  </ul>
                  <div style={{ display:'flex', gap:'5px', flexWrap:'wrap' }}>
                    {exp.clients[activeClient].tags.map(tag => (
                      <span key={tag} style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', padding:'3px 8px', background:`${exp.clients[activeClient].color}15`, color:exp.clients[activeClient].color, border:`1px solid ${exp.clients[activeClient].color}33`, borderRadius:'2px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
        {exp.tags.map(tag => (
          <span key={tag} style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', padding:'4px 10px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'2px', color:'var(--gray)' }}>{tag}</span>
        ))}
      </div>
    </>
  )
}

export default function Experience() {
  const ref = useRef(null); const inView = useInView(ref)
  const [active, setActive] = useState(0)
  const [activeClient, setActiveClient] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(null)

  return (
    <section id="experience" ref={ref} style={{ padding:'100px 6vw', background:'var(--bg-2)', position:'relative' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.5 }}>
          <div className="section-label" style={{ marginBottom:'1rem' }}>Experience</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:800, marginBottom:'2.5rem', letterSpacing:'-0.02em' }}>
            Where I've <span style={{ color:'var(--cyan)' }}>worked</span>
          </h2>
        </motion.div>

        {/* Desktop */}
        <div className="exp-desktop">
          <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', minHeight:400 }}>
            <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ delay:0.2 }}
              style={{ borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column' }}>
              {experiences.map((exp,i) => (
                <button key={i} onClick={() => { setActive(i); setActiveClient(null) }}
                  style={{ background:active===i?'var(--surface)':'transparent', border:'none', borderLeft:`2px solid ${active===i?exp.color:'transparent'}`, padding:'14px 18px', textAlign:'left', cursor:'pointer', transition:'all 0.2s' }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:active===i?exp.color:'var(--gray)', letterSpacing:'0.05em' }}>{exp.company.split(' ')[0]}</div>
                  <div style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:active===i?'var(--white)':'var(--gray)', fontWeight:500, marginTop:2 }}>{exp.type}</div>
                </button>
              ))}
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.22 }}
                style={{ padding:'0 0 0 2rem' }}>
                <ExpContent exp={experiences[active]} activeClient={activeClient} setActiveClient={setActiveClient} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile */}
        <div className="exp-mobile" style={{ display:'none', flexDirection:'column', gap:'0.75rem' }}>
          {experiences.map((exp,i) => (
            <div key={i} style={{ border:`1px solid ${mobileOpen===i?exp.color:'var(--border)'}`, borderRadius:'8px', overflow:'hidden', transition:'border-color 0.3s' }}>
              <button onClick={() => { setMobileOpen(mobileOpen===i?null:i); setActiveClient(null) }}
                style={{ width:'100%', padding:'14px 16px', background:mobileOpen===i?'var(--surface)':'var(--bg-3)', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ textAlign:'left' }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:exp.color }}>{exp.company}</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'0.92rem', fontWeight:700, color:'var(--white)', marginTop:2 }}>{exp.role}</div>
                </div>
                <motion.span animate={{ rotate:mobileOpen===i?180:0 }} style={{ color:'var(--cyan)', fontSize:'0.8rem', flexShrink:0 }}>▼</motion.span>
              </button>
              <AnimatePresence>
                {mobileOpen===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }} style={{ overflow:'hidden' }}>
                    <div style={{ padding:'1rem 1rem 1.25rem' }}>
                      <ExpContent exp={exp} activeClient={activeClient} setActiveClient={setActiveClient} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){ .exp-desktop{display:none!important} .exp-mobile{display:flex!important} }`}</style>
    </section>
  )
}