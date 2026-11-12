"use client";

import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img
        src="/Programming%20Computer.svg"
        alt=""
        className="loader-background"
        aria-hidden="true"
      />

      <div className="loader-overlay"></div>

      <div className="loader-content">
        <div className="loader-text">OnyxTech</div>
      </div>
    </div>
  );
};

export default Loader;
