import React from 'react'
export default function Footer() {
  return (
    <footer style={{ padding:'2rem 6vw', borderTop:'1px solid var(--border)', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'0.75rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1rem', color:'var(--cyan)' }}>RK</span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--gray)' }}>Rahul Krishnan — Associate DevOps Engineer</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
        <span style={{ width:6, height:6, background:'var(--green)', borderRadius:'50%', boxShadow:'0 0 8px var(--green)', animation:'pulse 2s infinite', display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--gray)' }}>Open to opportunities • Bangalore, India</span>
      </div>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--gray)' }}>Built with React + Framer Motion</span>
    </footer>
  )
}
