import { useEffect, useRef } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { Bot, CloudCog, Palette, Rocket } from 'lucide-react';
type Skill = {
  name: string;
  percent: number;
};
type Category = {
  id: string;
  title: string;
  emoji: string;
  Icon: typeof Rocket;
  description: string;
  skills: Skill[];
};
type Particle = {
  id: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
};
type CodeLine = {
  id: string;
  indent: number;
  tokens: Array<{
    id: string;
    text: string;
    className: string;
  }>;
};
const categories: Category[] = [{
  id: 'frontend',
  title: 'Frontend Architecture',
  emoji: '🚀',
  Icon: Rocket,
  description: 'Next.js, React, TypeScript, Tailwind CSS, and Styled Components create accessible interfaces that stay fast as products grow.',
  skills: [{
    name: 'Next.js/React',
    percent: 98
  }, {
    name: 'TypeScript',
    percent: 95
  }, {
    name: 'Tailwind',
    percent: 96
  }]
}, {
  id: 'motion',
  title: '3D & Motion',
  emoji: '🎨',
  Icon: Palette,
  description: 'Three.js, WebGL, GSAP, Framer Motion, Canvas, and SVG animation turn complex ideas into memorable experiences.',
  skills: [{
    name: 'Three.js/WebGL',
    percent: 90
  }, {
    name: 'GSAP/Framer',
    percent: 94
  }, {
    name: 'Canvas/SVG',
    percent: 92
  }]
}, {
  id: 'backend',
  title: 'Backend & Cloud',
  emoji: '⚙️',
  Icon: CloudCog,
  description: 'Robust, scalable server infrastructure with Node.js, PostgreSQL, MongoDB, and cloud deployment on Vercel, AWS, and Docker.',
  skills: [{
    name: 'Node.js',
    percent: 88
  }, {
    name: 'PostgreSQL/MongoDB',
    percent: 85
  }, {
    name: 'Vercel/AWS/Docker',
    percent: 87
  }]
}, {
  id: 'ai',
  title: 'AI & Machine Learning',
  emoji: '🤖',
  Icon: Bot,
  description: 'Python, LangChain, RAG pipelines, and direct API integrations with OpenAI, Claude, and Gemini bring intelligent features to any product.',
  skills: [{
    name: 'Python/LLM',
    percent: 92
  }, {
    name: 'LangChain/RAG',
    percent: 89
  }, {
    name: 'OpenAI/Claude/Gemini',
    percent: 94
  }]
}];
const particles: Particle[] = [{
  id: 'particle-01',
  left: '7%',
  size: '3px',
  delay: '0s',
  duration: '8s',
  opacity: 0.22
}, {
  id: 'particle-02',
  left: '15%',
  size: '2px',
  delay: '1.8s',
  duration: '10s',
  opacity: 0.28
}, {
  id: 'particle-03',
  left: '23%',
  size: '4px',
  delay: '0.7s',
  duration: '12s',
  opacity: 0.18
}, {
  id: 'particle-04',
  left: '35%',
  size: '2px',
  delay: '2.4s',
  duration: '9s',
  opacity: 0.32
}, {
  id: 'particle-05',
  left: '48%',
  size: '3px',
  delay: '1.1s',
  duration: '11s',
  opacity: 0.25
}, {
  id: 'particle-06',
  left: '59%',
  size: '2px',
  delay: '3s',
  duration: '8.5s',
  opacity: 0.3
}, {
  id: 'particle-07',
  left: '69%',
  size: '4px',
  delay: '1.5s',
  duration: '13s',
  opacity: 0.2
}, {
  id: 'particle-08',
  left: '78%',
  size: '2px',
  delay: '2.1s',
  duration: '9.5s',
  opacity: 0.34
}, {
  id: 'particle-09',
  left: '88%',
  size: '3px',
  delay: '0.4s',
  duration: '12.5s',
  opacity: 0.24
}, {
  id: 'particle-10',
  left: '94%',
  size: '2px',
  delay: '2.9s',
  duration: '10.5s',
  opacity: 0.2
}];
const codeLines: CodeLine[] = [{
  id: 'line-01',
  indent: 0,
  tokens: [{
    id: 'line-01-a',
    text: 'const ',
    className: 'code-purple'
  }, {
    id: 'line-01-b',
    text: 'stack ',
    className: 'code-blue'
  }, {
    id: 'line-01-c',
    text: '= {',
    className: 'code-slate'
  }]
}, {
  id: 'line-02',
  indent: 2,
  tokens: [{
    id: 'line-02-a',
    text: 'frontend',
    className: 'code-teal'
  }, {
    id: 'line-02-b',
    text: ': ',
    className: 'code-slate'
  }, {
    id: 'line-02-c',
    text: '[\'React\', \'TypeScript\']',
    className: 'code-yellow'
  }, {
    id: 'line-02-d',
    text: ',',
    className: 'code-slate'
  }]
}, {
  id: 'line-03',
  indent: 2,
  tokens: [{
    id: 'line-03-a',
    text: 'motion',
    className: 'code-teal'
  }, {
    id: 'line-03-b',
    text: ': ',
    className: 'code-slate'
  }, {
    id: 'line-03-c',
    text: '[\'Three.js\', \'GSAP\']',
    className: 'code-yellow'
  }, {
    id: 'line-03-d',
    text: ',',
    className: 'code-slate'
  }]
}, {
  id: 'line-04',
  indent: 2,
  tokens: [{
    id: 'line-04-a',
    text: 'ai',
    className: 'code-teal'
  }, {
    id: 'line-04-b',
    text: ': ',
    className: 'code-slate'
  }, {
    id: 'line-04-c',
    text: 'buildAgent',
    className: 'code-blue'
  }, {
    id: 'line-04-d',
    text: '()',
    className: 'code-slate'
  }]
}, {
  id: 'line-05',
  indent: 0,
  tokens: [{
    id: 'line-05-a',
    text: '};',
    className: 'code-slate'
  }]
}, {
  id: 'line-06',
  indent: 0,
  tokens: [{
    id: 'line-06-a',
    text: 'export ',
    className: 'code-purple'
  }, {
    id: 'line-06-b',
    text: 'async function ',
    className: 'code-purple'
  }, {
    id: 'line-06-c',
    text: 'ship',
    className: 'code-blue'
  }, {
    id: 'line-06-d',
    text: '() {',
    className: 'code-slate'
  }]
}, {
  id: 'line-07',
  indent: 2,
  tokens: [{
    id: 'line-07-a',
    text: 'return ',
    className: 'code-purple'
  }, {
    id: 'line-07-b',
    text: 'await ',
    className: 'code-purple'
  }, {
    id: 'line-07-c',
    text: 'launch',
    className: 'code-blue'
  }, {
    id: 'line-07-d',
    text: '(stack);',
    className: 'code-slate'
  }]
}, {
  id: 'line-08',
  indent: 0,
  tokens: [{
    id: 'line-08-a',
    text: '}',
    className: 'code-slate'
  }]
}];
const stats = [{
  id: 'projects',
  value: '50+',
  label: 'Projects Shipped'
}, {
  id: 'experience',
  value: '8+',
  label: 'Years Experience'
}, {
  id: 'satisfaction',
  value: '100%',
  label: 'Client Satisfaction'
}];
export const TechnicalArsenal = () => {
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const cards = Object.values(cardRefs.current).filter((card): card is HTMLElement => Boolean(card));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18
    });
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  const handleCardMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 14;
    const rotateX = (0.5 - y / rect.height) * 12;
    card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
  };
  const handleCardLeave = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };
  return <main className="arsenal-page">
      <section className="arsenal-hero" aria-labelledby="arsenal-title">
        <div className="particle-field" aria-hidden="true">
          {particles.map(particle => <span key={particle.id} className="particle" style={{
          '--particle-left': particle.left,
          '--particle-size': particle.size,
          '--particle-delay': particle.delay,
          '--particle-duration': particle.duration,
          '--particle-opacity': particle.opacity
        } as CSSProperties} />)}
        </div>

        <div className="desk-scene" aria-hidden="true">
          <div className="monitor monitor-left">
            <div className="monitor-screen compact-screen">
              <span className="screen-tab" />
              <span className="mini-line mini-line-a" />
              <span className="mini-line mini-line-b" />
              <span className="mini-line mini-line-c" />
              <span className="mini-line mini-line-d" />
              <span className="mini-line mini-line-e" />
            </div>
            <span className="monitor-stand" />
          </div>

          <div className="monitor monitor-center">
            <div className="monitor-screen editor-screen">
              <div className="editor-sidebar">
                <span />
                <span />
                <span />
              </div>
              <div className="editor-window">
                <div className="editor-chrome">
                  <span className="chrome-dot chrome-red" />
                  <span className="chrome-dot chrome-yellow" />
                  <span className="chrome-dot chrome-green" />
                  <span className="file-name">arsenal.ts</span>
                </div>
                <pre className="code-editor" aria-hidden="true">
                  <code>
                    {codeLines.map(line => <span className="code-line" key={line.id} style={{
                    '--indent': line.indent
                  } as CSSProperties}>
                        {line.tokens.map(token => <span className={token.className} key={token.id}>{token.text}</span>)}
                      </span>)}
                  </code>
                </pre>
              </div>
            </div>
            <span className="monitor-stand" />
          </div>

          <div className="monitor monitor-right">
            <div className="monitor-screen compact-screen right-screen">
              <span className="screen-tab" />
              <span className="mini-card" />
              <span className="mini-line mini-line-f" />
              <span className="mini-line mini-line-g" />
              <span className="phone-reflection" />
            </div>
            <span className="monitor-stand" />
          </div>

          <div className="desk-surface">
            <span className="phone-mockup" />
            <span className="cable cable-one" />
            <span className="cable cable-two" />
          </div>
        </div>

        <div className="hero-content">
          <h1 id="arsenal-title">
            <span>Technical skills that</span>
            <span>move ideas forward</span>
          </h1>
          <p>A clear 2026 technology stack for confident client decisions</p>
          <a className="hero-button" href="#expertise-panel"><span>Explore Expertise</span></a>
        </div>
      </section>

      <section className="arsenal-panel" id="expertise-panel" aria-labelledby="panel-title">
        <div className="panel-shell">
          <header className="panel-header">
            <h2 id="panel-title">A modern technical arsenal</h2>
            <p>Explore the capabilities behind fast, immersive, and intelligent digital products.</p>
          </header>

          <div className="cards-grid" aria-label="Technical skill categories">
            {categories.map(category => {
            const Icon = category.Icon;
            return <article className="skill-card" key={category.id} ref={element => {
              cardRefs.current[category.id] = element;
            }} onMouseMove={handleCardMove} onMouseLeave={handleCardLeave}>
                  
                  <div className="card-heading">
                    <h3><span aria-hidden="true">{category.emoji}</span><span>{category.title}</span></h3>
                  </div>
                  <div className="card-intro">
                    <span className="icon-block" aria-hidden="true"><Icon size={31} strokeWidth={1.8} /></span>
                    <p>{category.description}</p>
                  </div>
                  <div className="skill-list">
                    {category.skills.map(skill => <div className="skill-row" key={skill.name}>
                        <div className="skill-meta">
                          <span>{skill.name}</span>
                          <strong>{skill.percent}%</strong>
                        </div>
                        <div className="skill-track" aria-hidden="true">
                          <span className="skill-fill" style={{
                      '--skill-width': `${skill.percent}%`
                    } as CSSProperties} />
                        </div>
                      </div>)}
                  </div>
                </article>;
          })}
          </div>

          <div className="stats-row" aria-label="Project statistics">
            {stats.map(stat => <div className="stat-item" key={stat.id}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>)}
          </div>
        </div>
      </section>
    </main>;
};