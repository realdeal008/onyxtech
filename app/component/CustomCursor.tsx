"use client";

import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 10}px`;
      cursor.style.top = `${e.clientY - 10}px`;
      follower.style.left = `${e.clientX - 20}px`;
      follower.style.top = `${e.clientY - 20}px`;
    };

    const onMouseEnterInteractive = () => cursor.classList.add('hover');
    const onMouseLeaveInteractive = () => cursor.classList.remove('hover');

    document.addEventListener('mousemove', onMouseMove);

    const interactiveElements = document.querySelectorAll<HTMLElement>(
      'a, button, .project-card, .skill-category, .float-element'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
};

export default CustomCursor;
