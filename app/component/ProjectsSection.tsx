"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ProjectLink {
  label: string;
  url: string;
  icon: string;
}

interface TechBadge {
  name: string;
  color: string;
}

interface ProjectCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  techStack: TechBadge[];
  links: ProjectLink[];
  stats: { value: string; label: string };
}

const projects: ProjectCard[] = [
  {
    id: 'ecommerce',
    title: 'Luxora Commerce',
    subtitle: 'Next.js 15 E-Commerce Platform',
    description:
      'A high-performance, SEO-optimized e-commerce ecosystem built with Next.js 15 App Router, featuring real-time inventory, AI-powered product recommendations, and sub-100ms global edge delivery.',
    backgroundImage: 'https://kimi-web-img.kimi.ai/img/cdn.sanity.io/a8fb5edd98c567e24e70f939d25a512832a3a73d.png',
    techStack: [
      { name: 'Next.js', color: '#f1f5f9' },
      { name: 'Node.js', color: '#22c55e' },
      { name: 'PostgreSQL', color: '#3b82f6' },
      { name: 'Redis', color: '#ef4444' },
    ],
    links: [
      { label: 'Live Demo', url: '#', icon: '↗' },
      { label: 'Case Study', url: '#', icon: '📄' },
      { label: 'GitHub Repo', url: '#', icon:'⚡' },
      { label: 'Figma Design', url: '#', icon: '🎨' },
    ],
    stats: { value: '$2.4M', label: 'GMV Processed' },
  },
  {
    id: 'ai-engine',
    title: 'Cortex AI Engine',
    subtitle: 'Machine Learning Intelligence Platform',
    description:
      'An enterprise-grade AI orchestration layer featuring RAG-powered chatbots, autonomous agentic workflows, real-time model fine-tuning, and multi-modal inference pipelines deployed at the edge.',
    backgroundImage: 'https://kimi-web-img.kimi.ai/img/images.ui8.net/0c7e0c9ea36d7353a82dd5b0f44a6e2f9ed285f4.png',
    techStack: [
      { name: 'Python', color: '#fbbf24' },
      { name: 'Rust', color: '#f97316' },
      { name: 'TensorFlow', color: '#f97316' },
      { name: 'OpenAI', color: '#10b981' },
    ],
    links: [
      { label: 'Live Demo', url: '#', icon: '↗' },
      { label: 'API Docs', url: '#', icon: '📚' },
      { label: 'Architecture', url: '#', icon: '🏗' },
      { label: 'Benchmarks', url: '#', icon: '📊' },
    ],
    stats: { value: '99.7%', label: 'Uptime SLA' },
  },
  {
    id: 'flutter-suite',
    title: 'Nova Mobile Suite',
    subtitle: 'Flutter Cross-Platform Ecosystem',
    description:
      'A unified mobile experience spanning iOS, Android, and Web from a single Dart codebase. Features biometric auth, real-time WebSocket sync, offline-first architecture, and native performance.',
    backgroundImage: 'https://kimi-web-img.kimi.ai/img/graphql.code.market/f0f5ea3dda625920c3efaad9f681359ebe9549ac.png',
    techStack: [
      { name: 'Flutter', color: '#38bdf8' },
      { name: 'Dart', color: '#0ea5e9' },
      { name: 'Firebase', color: '#f59e0b' },
      { name: 'GraphQL', color: '#ec4899' },
    ],
    links: [
      { label: 'App Store', url: '#', icon: '🍎' },
      { label: 'Play Store', url: '#', icon: '🤖' },
      { label: 'Web Preview', url: '#', icon: '🌐' },
      { label: 'Source Code', url: '#', icon: '⚡' },
    ],
    stats: { value: '500K+', label: 'Downloads' },
  },
  {
    id: 'backend',
    title: 'Titan Infrastructure',
    subtitle: 'Rust + Node.js Distributed Backend',
    description:
      'A polyglot microservices backbone combining Rust for high-throughput data pipelines and Node.js for API gateways. Features event-driven architecture, zero-downtime deployments, and sub-millisecond latency.',
    backgroundImage: 'https://kimi-web-img.kimi.ai/img/cdn-aniq-ui.com/f78e7e0913c933734737150a3bfac147ca975fda.jpg',
    techStack: [
      { name: 'Rust', color: '#f97316' },
      { name: 'Node.js', color: '#22c55e' },
      { name: 'gRPC', color: '#8b5cf6' },
      { name: 'Kafka', color: '#a855f7' },
    ],
    links: [
      { label: 'Live Status', url: '#', icon: '📡' },
      { label: 'API Reference', url: '#', icon: '📚' },
      { label: 'Infra Diagram', url: '#', icon: '🏗' },
      { label: 'Load Tests', url: '#', icon: '📊' },
    ],
    stats: { value: '<12ms', label: 'Avg Response' },
  },
];

const ProjectsSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [expandedLinks, setExpandedLinks] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCardClick = useCallback((id: string) => {
    setActiveCard((prev) => (prev === id ? null : id));
  }, []);

  const toggleLinks = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedLinks((prev) => (prev === id ? null : id));
  }, []);

  // 3D tilt effect on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `
      perspective(1000px)
      rotateY(${x * 12}deg)
      rotateX(${-y * 12}deg)
      translateZ(30px)
      scale(1.02)
    `;
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)';
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!sectionRef.current?.contains(e.target as Node)) {
        setActiveCard(null);
        setExpandedLinks(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="section-header">
        <div className="section-tag"> Selected Work</div>
        <a className="hero-button" href="#project-grid"><span>Explore More</span></a>
      </div>

      <div className="projects-grid" id="project-grid">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card ${activeCard === project.id ? 'active' : ''}`}
            ref={(el) => { cardRefs.current[index] = el; }}
            onClick={() => handleCardClick(project.id)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCardClick(project.id);
            }}
          >
            {/* Background Image */}
            <div
              className="project-card-bg"
              style={{ backgroundImage: `url(${project.backgroundImage})` }}
            />
            <div className="project-card-overlay" />

            {/* Content */}
            <div className="project-card-content">
              <div className="project-card-top">
                <div className="project-meta">
                  <span className="project-subtitle">{project.subtitle}</span>
                  <h3 className="project-title">{project.title}</h3>
                </div>

                {/* Arrow Toggle for Links */}
                <button
                  className={`project-arrow-btn ${expandedLinks === project.id ? 'expanded' : ''}`}
                  onClick={(e) => toggleLinks(e, project.id)}
                  aria-label="View project links"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              {/* Description — Glass Blur Background ONLY here */}
              <div className="project-description-glass">
                {project.description}
              </div>

              {/* Tech Stack Badges */}
              <div className="project-tech-stack">
                {project.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="tech-badge"
                    style={{ '--badge-color': tech.color } as React.CSSProperties}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="project-stat">
                <span className="stat-value">{project.stats.value}</span>
                <span className="stat-label">{project.stats.label}</span>
              </div>
            </div>

            {/* Expandable Links Panel */}
            <div className={`project-links-panel ${expandedLinks === project.id ? 'open' : ''}`}>
              <div className="project-links-header">Project Resources</div>
              <div className="project-links-list">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    className="project-link-item"
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-label">{link.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Active Glow Border */}
            <div className="project-card-glow" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;