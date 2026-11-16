"use client";

import SplashScreen from "./component/SplashScreen";
import Nav from "./component/Nav";
import Hero from "./component/Hero";
import AboutSection from "./component/AboutSection";
import ProjectsSection from "./component/ProjectsSection";
import {TechnicalArsenal} from "./component/SkillSection";
import {LandingDashboard} from "./component/ContactSection";
import BackgroundAnimation from "./component/BackgroundAnimation";
import Footer from "./component/Footer";
import ConsultantChat from "./component/ConsultantChat";

export default function Page() {
  return (
    <SplashScreen>
      <Nav />
      <Hero />
      
      <BackgroundAnimation>
        <AboutSection />
        <ProjectsSection />
        <TechnicalArsenal/>
        <LandingDashboard />
      </BackgroundAnimation>
       <Footer/>
      <ConsultantChat />
    </SplashScreen>
  );
}