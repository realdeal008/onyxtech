"use client";

import React, { useEffect, useRef, useState } from 'react';
import MatrixRain from './MatrixRain';
import ParticleField from './ParticleField';
import StarField from './StarField';

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const backToTopRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const footer = footerRef.current;
        if (!footer) return;

        // Intersection Observer for reveal animations and canvas
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        observer.observe(footer);

        // Back to top button
        const backToTop = backToTopRef.current;
        const handleScroll = () => {
            if (backToTop) {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);

        const handleBackToTopClick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        if (backToTop) {
            backToTop.addEventListener('click', handleBackToTopClick);
        }

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            if (backToTop) {
                backToTop.removeEventListener('click', handleBackToTopClick);
            }
        };
    }, []);

    return (
        <>
            <footer className="onyx-footer" id="onyxFooter" ref={footerRef}>
                <StarField />
                <MatrixRain className="matrix-hacking-layer--footer" />
                <ParticleField />

                <div className="footer-content">
                    {/* Top: CTA + Social */}
                    <div className="footer-top reveal">
                        <div className="footer-cta">
                            <h2>
                                Ready to build
                                <br />
                                <span>something epic?</span>
                            </h2>
                            <p>
                                Let's collaborate and turn your vision into a digital masterpiece.
                                The next big thing starts here.
                            </p>
                            <a href="#contact" className="footer-cta-btn">
                                <span>Start a Project</span>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                        <div className="footer-social">
                            <a href="#" className="social-link" aria-label="GitHub">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="Dribbble">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073a42.153 42.153 0 00-.767-1.68c2.31-1 4.165-2.358 5.548-4.082a9.863 9.863 0 012.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68a46.287 46.287 0 00-3.488-5.438A9.894 9.894 0 0112 2.087c2.275 0 4.368.779 6.043 2.072zM7.527 3.166a44.59 44.59 0 013.537 5.381c-2.43.715-5.331 1.082-8.684 1.105a9.931 9.931 0 015.147-6.486zM2.087 12l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48A9.865 9.865 0 012.087 12zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027a39.137 39.137 0 012.043 7.46c-3.349 1.291-6.953.666-9.641-1.433zm11.586.43a41.098 41.098 0 00-1.92-6.897c1.876-.265 3.94-.196 6.199.196a9.923 9.923 0 01-4.279 6.701z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Middle: Links */}
                    <div className="footer-middle">
                        <div className="footer-brand reveal reveal-delay-1">

                                <div className="logo">  ONYX<span>TECH</span> </div>
                            <p>
                                Crafting digital experiences with precision and passion. We build
                                products that matter, one pixel at a time.
                            </p>
                        </div>
                        <div className="footer-col reveal reveal-delay-2">
                            <h4>Navigation</h4>
                            <ul>
                                <li>
                                    <a href="#about">About</a>
                                </li>
                                <li>
                                    <a href="#projects">Projects</a>
                                </li>
                                <li>
                                    <a href="#skills">Skills</a>
                                </li>
                                <li>
                                    <a href="#contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-col reveal reveal-delay-3">
                            <h4>Services</h4>
                            <ul>
                                <li>
                                    <a href="#">Web Development</a>
                                </li>
                                <li>
                                    <a href="#">UI/UX Design</a>
                                </li>
                                <li>
                                    <a href="#">Mobile Apps</a>
                                </li>
                                <li>
                                    <a href="#">Consulting</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-col reveal reveal-delay-4">
                            <h4>Connect</h4>
                            <ul>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                <li>
                                    <a href="#">Newsletter</a>
                                </li>
                                <li>
                                    <a href="#">Careers</a>
                                </li>
                                <li>
                                    <a href="#">Support</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom: Copyright */}
                    <div className="footer-bottom reveal">
                        <div className="footer-copy">
                            &#169; 2026 OnyxTech. Crafted with <span className="heart">&#9829;</span> and
                            precision.
                        </div>
                        <div className="footer-legal">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>

            <button className="back-to-top" ref={backToTopRef} aria-label="Back to top">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>
        </>
    );
};

export default Footer;