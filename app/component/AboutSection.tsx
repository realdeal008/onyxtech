
import React, { useEffect, useRef, useCallback } from 'react';

interface StatItem {
  target: number;
  label: string;
}

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: '⚡',
    title: 'Performance First',
    description: 'Optimized for speed, SEO, and conversion with Core Web Vitals excellence.',
  },
  {
    icon: '🎨',
    title: 'Pixel Perfect',
    description: 'Every detail matters. From micro-interactions to macro layouts.',
  },
  {
    icon: '🌍',
    title: 'Global Scale',
    description: 'Built for international audiences with i18n and edge deployment.',
  },
];

const stats: StatItem[] = [
  { target: 60, label: 'Projects Delivered' },
  { target: 15, label: 'AI Systems Built' },
  { target: 35, label: 'Global Clients' },
];

const AboutSection: React.FC = () => {
  const visualRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Click-to-focus logic
  const handleCardClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const clicked = e.currentTarget;
    const visual = visualRef.current;
    if (!visual) return;

    visual.querySelectorAll('.about-card').forEach((card) => {
      card.classList.remove('active');
    });

    clicked.classList.add('active');
  }, []);

  // Click outside to reset
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (!visualRef.current?.contains(e.target as Node)) {
        visualRef.current?.querySelectorAll('.about-card').forEach((card) => {
          card.classList.remove('active');
        });
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Counter animation with IntersectionObserver
  useEffect(() => {
    const animateCounter = (el: HTMLHeadingElement, target: number) => {
      const duration = 2000;
      const start = performance.now();

      const update = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        el.textContent = String(Math.floor(ease * target));

        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLHeadingElement;
            const target = parseInt(el.dataset.target || '0', 10);

            animateCounter(el, target);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" id="about">
      <div className="section-header">
        <div className="section-tag">About Me</div>

      </div>

      <div className="about-grid">
        <div className="about-visual" ref={visualRef}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="about-card"
              data-card={index + 1}
              onClick={handleCardClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(
                    e as unknown as React.MouseEvent<HTMLDivElement>
                  );
                }
              }}
            >
              <div className="about-card-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="about-text">
          <h2>
            Remote-First
            <br />
            <span className="gradient-text">
              World-Class Developer
            </span>
          </h2>

          <div className="description-glass">
            I don't just write code — I architect digital experiences and intelligent systems
            that captivate, convert, and scale. As a dual-threat AI Engineer and Full-Stack
            Developer, I build everything from LLM-powered applications and agentic workflows
            to immersive 3D web experiences. My stack spans Next.js, React, Three.js, Python,
            and modern AI frameworks — delivering portfolio-grade solutions that compete on the
            global stage.
          </div>

          <div className="description-glass">
            My approach fuses machine intelligence with design excellence. Whether it's a
            RAG-powered chatbot, an AI agent automating business workflows, a 3D interactive
            experience, or an e-commerce platform handling millions — I build systems that
            think, scale, and impress.
          </div>

          <div className="stats">
            {stats.map((stat, index) => (
              <div className="stat-item" key={index}>
                <h4
                  className="counter"
                  data-target={stat.target}
                  ref={(el) => {
                    counterRefs.current[index] = el;
                  }}
                >
                  0
                </h4>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
