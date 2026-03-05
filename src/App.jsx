import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="app-wrapper">
      <div className="bg-glow"></div>
      <div className="bg-glow-right"></div>
      
      <header className="container" style={{ padding: '2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent), #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.02em' }}>Atendimentos<span style={{ color: 'var(--text-secondary)' }}>.iA</span></span>
        </div>
        
        <nav style={{ display: 'none', gap: '2rem' }} className="nav-desktop">
          <a href="#recursos" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Recursos</a>
          <a href="#solucoes" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Soluções</a>
          <a href="#precos" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Preços</a>
        </nav>
        
        <div>
          <button className="btn btn-outline" style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>Entrar</button>
          <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Começar</button>
        </div>
      </header>

      <main className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1.5rem' }}>
        <div className={`animate-fade-in`} style={{ opacity: mounted ? 1 : 0, maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-full)', border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: '2rem' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#60a5fa', boxShadow: '0 0 8px #60a5fa' }} className="pulse-dot"></span>
            <span style={{ fontSize: '0.875rem', color: '#93c5fd', fontWeight: '500' }}>O Futuro do Atendimento Chegou</span>
          </div>
          
          <h1 style={{ marginBottom: '1.5rem' }}>
            Revolucione sua operação com <br/>
            <span className="text-gradient">Inteligência Artificial</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Automatize conversas, resolva problemas rapidamente e escale seu suporte com agentes de IA que entendem o seu negócio.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Agendar Demonstração</button>
            <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.125rem', background: 'var(--bg-card)' }}>Explorar Recursos</button>
          </div>
        </div>

        {/* Dashboard Preview Mock */}
        <div className="glass-panel" style={{ marginTop: '5rem', width: '100%', height: '400px', borderRadius: '1rem', padding: '1rem', position: 'relative', overflow: 'hidden', animationDelay: '0.2s', opacity: mounted ? 1 : 0 }} >
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1rem', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Dashboard do Agente iA</div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', height: 'calc(100% - 3rem)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', padding: '1rem', flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Conversas Ativas</div>
                  <div style={{ fontSize: '2rem', fontWeight: 600 }}>1,284</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', padding: '1rem', flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Tempo Médio Resposta</div>
                  <div style={{ fontSize: '2rem', fontWeight: 600 }}>1.2s</div>
                </div>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: '1rem 1rem 1rem 0', maxWidth: '80%', fontSize: '0.875rem' }}>Olá, preciso de ajuda com meu pedido #49281.</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <div style={{ background: 'var(--accent)', padding: '0.75rem 1rem', borderRadius: '1rem 1rem 0 1rem', maxWidth: '80%', fontSize: '0.875rem' }}>Olá! Verifiquei que seu pedido já está em rota de entrega e deve chegar até as 18h de hoje. Posso ajudar com mais alguma coisa?</div>
                </div>
              </div>
            </div>
        </div>
      </main>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
        }
        .pulse-dot { animation: pulse 2s infinite; }
      `}</style>
    </div>
  );
}

export default App;
