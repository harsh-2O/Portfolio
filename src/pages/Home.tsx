import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useTheme } from "../context/ThemeContext";
import ExperienceSection from "../components/ExperienceSection";

// Import regular SVG icons
import javascriptIcon from "../assets/icon/javascript.svg";
import reactIcon from "../assets/icon/react.svg";
import flutterIcon from "../assets/icon/flutter.svg";
import nodeJsIcon from "../assets/icon/nodeJs.svg";
import googleCloudIcon from "../assets/icon/googleCloud.svg";
import firebaseIcon from "../assets/icon/firebase.svg";
import pythonIcon from "../assets/icon/python.svg";
import pandasIcon from "../assets/icon/pandas.svg";

// Import colored SVG icons
import javascriptColorIcon from "../assets/icon/javascript_color.svg";
import reactColorIcon from "../assets/icon/react_color.svg";
import flutterColorIcon from "../assets/icon/flutter_color.svg";
import nodeJsColorIcon from "../assets/icon/nodeJs_color.svg";
import googleCloudColorIcon from "../assets/icon/gcp_color.svg";
import firebaseColorIcon from "../assets/icon/fireBase_color.svg";
import pythonColorIcon from "../assets/icon/python_color.svg";
import pandasColorIcon from "../assets/icon/pandas_color.svg";

// Import project logos
import apeLogo from "../assets/logos/ape.png";
import carbonLogo from "../assets/logos/carbon.jpg";
import sociobuzzLogo from "../assets/logos/sociobuzz.jpg";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Container = styled.div`
  padding: 2rem;
  position: relative;
  background-color: var(--background);
  color: var(--text-primary);
  transition: background-color var(--transition), color var(--transition);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: color var(--transition);
  letter-spacing: -0.02em;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

interface NavigationProps {
  isOpen?: boolean;
}

const Navigation = styled.nav<NavigationProps>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
  background-color: var(--nav-bg);
  padding: 0.6rem 0.8rem;
  border-radius: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: var(--header-height);
    left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    flex-direction: column;
    background-color: rgba(var(--primary-rgb), 0.9);
    width: 100%;
    height: calc(100vh - var(--header-height));
    padding: 2rem;
    transition: left 0.3s ease-in-out;
    z-index: 99;
    gap: 3rem;
    align-items: center;
    justify-content: flex-start;
  }
`;

const ProjectCountBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  background-color: #c3c3c3;
  color: #000;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 0.8em;
  line-height: 1;

  ${(props) =>
    props.theme === "dark" &&
    `
    background-color: #4d4d4d;
    color: #fff;
  `}

  @media (max-width: 768px) {
    width: 1.5em;
    height: 1.5em;
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    width: 1.2em;
    height: 1.2em;
    font-size: 0.6rem;
  }
`;

const NavLink = styled.a<{ active?: boolean }>`
  color: ${(props) => (props.active ? "var(--nav-bg)" : "var(--nav-text)")};
  background: ${(props) => (props.active ? "var(--nav-text)" : "transparent")};
  padding: 0.5rem 1.5rem;
  border-radius: 2em;
  font-weight: 500;
  transition: all var(--transition);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  &:hover {
    color: ${(props) =>
      props.active ? "var(--nav-bg)" : "rgba(255, 255, 255, 0.8)"};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  width: 36px;
  height: 36px;
  padding: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--hamburger-color);
    transition: transform 0.3s ease, opacity 0.3s ease,
      background-color var(--transition);

    &:nth-of-type(1) {
      transform: ${({ isOpen }: { isOpen: boolean }) =>
        isOpen ? "translateY(8px) rotate(45deg)" : "none"};
    }

    &:nth-of-type(2) {
      opacity: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "0" : "1")};
    }

    &:nth-of-type(3) {
      transform: ${({ isOpen }: { isOpen: boolean }) =>
        isOpen ? "translateY(-8px) rotate(-45deg)" : "none"};
    }
  }
`;

const DarkModeToggle = styled.button`
  width: 3.2em;
  height: 3.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--nav-bg);
  color: var(--nav-text);
  cursor: pointer;
  transition: all var(--transition);
  padding: 0.8em;

  svg {
    width: 2.2em;
    height: 2.2em;
    transition: transform var(--transition);

    path {
      stroke: var(--nav-text);
      stroke-width: 2;
    }
  }

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const MainContent = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0rem auto;
  text-align: center;
  margin-top: var(--header-height);
  padding: 1rem var(--section-padding-x);
  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    padding-top: var(--header-height);
    padding-left: var(--section-padding-x-md);
    padding-right: var(--section-padding-x-md);
  }

  @media (max-width: 480px) {
    padding-top: var(--header-height);
    padding-left: var(--section-padding-x-sm);
    padding-right: var(--section-padding-x-sm);
  }
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  min-height: 3rem;
  min-width: 150px;
  position: relative;

  @media (max-width: 768px) {
    min-height: 2.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    min-height: 2rem;
  }
`;

const PlusSign = styled.span`
  display: block;
  margin: 0.5rem 2rem;

  @media (max-width: 768px) {
    margin: 0.25rem 1rem;
  }

  @media (max-width: 480px) {
    margin: 0;
  }
`;

const ChangingText = styled.span`
  display: block;
  min-width: 200px;
  text-align: left;

  @media (max-width: 768px) {
    min-width: 150px;
  }

  @media (max-width: 480px) {
    min-width: 100px;
  }
`;

const WipeRectangle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  will-change: transform, opacity;
`;

const Title = styled(motion.div)`
  font-size: 7.5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0rem;
  color: var(--text-primary);
  transition: color var(--transition);
  letter-spacing: -0.04em;

  span {
    display: block;
    visibility: hidden;
  }

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
`;

const ContactSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 0 4rem;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-top: 5rem;
    padding: 0 1.5rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 2rem;
    margin-top: 3rem;
    padding: 0 1rem;
    align-items: center;
    text-align: center;
  }
`;

const ContactInfo = styled(motion.div)`
  width: 100%;
  text-align: left;
  visibility: hidden;
  max-width: 400px;

  h3 {
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
    transition: color var(--transition);
    letter-spacing: -0.02em;
  }

  p {
    color: var(--text-primary);
    font-size: 1.25rem;
    transition: color var(--transition);
    letter-spacing: -0.01em;
  }

  @media (max-width: 768px) {
    max-width: 300px;

    h3 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    text-align: center;
    max-width: 100%;

    h3 {
      font-size: 1.75rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

const Description = styled(motion.p)`
  max-width: 600px;
  font-size: 1.3rem;
  line-height: 1.4;
  text-align: right;
  color: var(--text-primary);
  transition: color var(--transition);
  visibility: hidden;
  letter-spacing: -0.01em;
  padding-left: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 450px;
    padding-left: 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    text-align: center;
    max-width: 100%;
  }
`;

const ScrollIndicator = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 26px;
  height: 42px;
  border: 2px solid var(--text-primary);
  border-radius: 20px;
  transition: all var(--transition);
  opacity: 1;

  &::after {
    content: "";
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: var(--text-primary);
    border-radius: 2px;
    animation: scrollIndicator 2s infinite;
    transition: background-color var(--transition);
  }

  @keyframes scrollIndicator {
    0% {
      top: 6px;
      opacity: 1;
    }
    50% {
      top: 24px;
      opacity: 0.5;
    }
    100% {
      top: 6px;
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 22px;
    height: 36px;
    bottom: 1.5rem;

    &::after {
      width: 3px;
      height: 6px;
    }
  }

  @media (max-width: 480px) {
    width: 18px;
    height: 30px;
    bottom: 5rem;
  }
`;

const ScrollText = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: all var(--transition);
  letter-spacing: -0.02em;
  opacity: 0;

  @media (max-width: 768px) {
    bottom: 1.5rem;
    left: 1.5rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    bottom: 5rem;
    left: 1rem;
    font-size: 0.8rem;
  }
`;

const ResumeHeader = styled.div`
  min-height: 80vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 4rem;
  max-width: 1440px;
  margin: 0rem auto;
  padding-left: var(--section-padding-x);
  padding-right: var(--section-padding-x);

  .resume-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 1.2rem;
    margin-bottom: 1rem;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
  }

  @media (max-width: 768px) {
    padding-left: var(--section-padding-x-md);
    padding-right: var(--section-padding-x-md);
  }

  @media (max-width: 480px) {
    padding-left: var(--section-padding-x-sm);
    padding-right: var(--section-padding-x-sm);
  }
`;

const ResumeTitle = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: color var(--transition);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--nav-bg);
  color: var(--nav-text);
  border: none;
  border-radius: 100px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);

  &:hover {
    transform: scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const TechItem = styled.div`
  aspect-ratio: 1;
  background-color: var(--tech-item-bg, transparent);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  position: relative;

  &:hover {
    transform: translateY(-5px);
    background-color: var(--tech-item-hover-bg, transparent);
  }

  .icon-normal,
  .icon-colored {
    position: absolute;
    width: 60%;
    height: 60%;
    object-fit: contain;
    transition: opacity var(--transition);
  }

  .icon-normal {
    opacity: 0.7;
  }

  .icon-colored {
    opacity: 0;
  }

  &:hover .icon-normal {
    opacity: 0;
  }

  &:hover .icon-colored {
    opacity: 1;
  }
`;

const DescriptionSection = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: var(--header-height);
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 3rem;
  padding-right: 3rem;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    flex-direction: column;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: 500;
  color: var(--text-primary);
  max-width: 400px;
  line-height: 1.4;
  letter-spacing: -0.02em;
  margin-right: 2rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--text-primary);
  max-width: 600px;
  text-align: right;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: left;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ProjectsSection = styled.div`
  min-height: 120vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4rem;
  max-width: 1440px;
  margin: 0 auto;
  padding-left: var(--section-padding-x);
  padding-right: var(--section-padding-x);

  @media (max-width: 768px) {
    padding-left: var(--section-padding-x-md);
    padding-right: var(--section-padding-x-md);
  }

  @media (max-width: 480px) {
    padding-left: var(--section-padding-x-sm);
    padding-right: var(--section-padding-x-sm);
  }
`;

const ProjectsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-right: 3rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const ProjectsTitle = styled.h2`
  font-size: 4rem;
  font-weight: 600;
  color: var(--text-primary);
  max-width: 538px;
  transition: color var(--transition);
  letter-spacing: -0.02em;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 3rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const ProjectsDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--text-primary);
  max-width: 500px;
  text-align: left;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const MoreLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: all var(--transition);
  cursor: pointer;
  text-decoration: none;

  &:hover {
    transform: translateX(5px);
  }

  svg {
    width: 13px;
    height: 15px;
    transform: rotate(90deg);
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  cursor: pointer;
`;

const CardImage = styled(motion.div)<{ gradient?: boolean }>`
  aspect-ratio: 686/500;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  ${(props) =>
    props.gradient
      ? `
    background: linear-gradient(135deg, #7a19f3, #a952f3);
  `
      : ""}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.25rem;
`;

const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: color var(--transition);
`;

const CardSubtitle = styled.p`
  font-size: 1.125rem;
  color: var(--text-primary);
  opacity: 0.8;
  transition: color var(--transition);
`;

const ProjectOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ProjectDetail = styled(motion.div)`
  width: 80%;
  max-width: 720px;
  background: var(--background);
  border-radius: 2rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 95%;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    width: 98%;
    border-radius: 1.5rem;
  }
`;

const ScrollingBanner = styled.div`
  background-color: var(--text-primary);
  color: var(--background);
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin-top: 4rem;

  @media (max-width: 768px) {
    height: 140px;
    margin: 0;
  }

  @media (max-width: 480px) {
    height: 100px;
    margin: 0;
  }
`;

const ScrollingText = styled.div`
  white-space: nowrap;
  font-size: 6rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  position: absolute;
  animation: scrollText 120s cubic-bezier(0.33, 1, 0.68, 1) infinite;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);

  @keyframes scrollText {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
}

const TestimonialSection = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  justify-content: flex-start;
  padding-top: 6rem;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    min-height: 80vh;
  }

  @media (max-width: 480px) {
    padding-left: 1rem;
    padding-right: 1rem;
    min-height: 70vh;
  }
`;

const TestimonialTitle = styled.h2`
  font-size: 4rem;
  font-weight: 600;
  color: var(--text-primary);
  max-width: 812px;
  transition: color var(--transition);
  letter-spacing: -0.02em;
  padding-left: 2rem;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
`;

const TestimonialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 2rem;
  padding-top: 2rem;
  width: 100%;
  padding-bottom: 2rem;
  gap: 4rem;
  min-height: 250px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
    min-height: 250px;
  }

  @media (max-width: 480px) {
    min-height: 320px;
    gap: 1rem;
  }
`;

const TestimonialQuote = styled(motion.p)`
  font-size: 1.75rem;
  line-height: 1.6;
  color: var(--text-primary);
  max-width: 1080px;
  position: relative;
  font-weight: 500;
  padding-bottom: 6rem;

  &::before {
    content: '"';
    font-size: 6rem;
    position: absolute;
    top: -3rem;
    left: -2rem;
    color: var(--text-primary);
    opacity: 0.1;
  }

  background: linear-gradient(
    135deg,
    var(--text-primary) 18.5%,
    rgba(100, 100, 100, 0.7) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding-bottom: 6rem;

    &::before {
      font-size: 4rem;
      top: -2rem;
      left: -1.5rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    padding-bottom: 5rem;

    &::before {
      font-size: 3rem;
      top: -1.5rem;
      left: -1rem;
    }
  }
`;

const TestimonialAuthor = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 0.2rem;
  position: absolute;
  bottom: 0rem;
  right: 8rem;

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
  }

  @media (max-width: 480px) {
    bottom: 1rem;
    right: 1rem;
  }
`;

const AuthorName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color var(--transition);
`;

const AuthorPosition = styled.p`
  font-size: 1rem;
  color: var(--text-primary);
  opacity: 0.8;
  transition: color var(--transition);
`;

const Footer = styled.footer`
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
  gap: 6rem;

  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    gap: 4rem;
    min-height: 80vh;
  }

  @media (max-width: 480px) {
    padding-left: 1rem;
    padding-right: 1rem;
    gap: 3rem;
    min-height: 70vh;
  }
`;

const FooterTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const FooterTitle = styled.h2`
  font-size: 6rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  transition: color var(--transition);
  letter-spacing: -0.02em;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const EmailButton = styled.a`
  background-color: var(--nav-bg);
  color: var(--nav-text);
  border-radius: 9rem;
  padding: 1.75rem 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 500;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
  }

  @media (max-width: 768px) {
    padding: 1.25rem 2rem;
    font-size: 1.1rem;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
    font-size: 0.9rem;
    width: 90%;
    justify-content: center;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 5rem;
  }
`;

const Copyright = styled.p`
  font-size: 1rem;
  color: var(--text-primary);
  transition: color var(--transition);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 2.5rem;
    margin-top: 1rem;
  }
`;

const SocialLink = styled.a`
  font-size: 1rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: all var(--transition);

  &:hover {
    opacity: 0.7;
  }
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--nav-bg);
  color: var(--nav-text);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 90;
  transition: all var(--transition);
  opacity: 0;
  visibility: hidden;

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    bottom: 5rem;
    right: 1rem;
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--header-bg);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 2px 10px var(--header-shadow);
  transition: background-color var(--transition), color var(--transition);
  height: var(--header-height);

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    justify-content: space-between;

    & > :first-of-type {
      flex: 1;
    }

    & > :last-of-type {
      margin-left: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }
`;

const Home = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const titleSpan1Ref = useRef<HTMLSpanElement>(null);
  const plusSignRef = useRef<HTMLSpanElement>(null);
  const changingTextRef = useRef<HTMLSpanElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const techSectionRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const scrollToTopRef = useRef<HTMLButtonElement>(null);
  const [activeNavLink, setActiveNavLink] = useState<string>("home");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleNavLinkClick = (section: string) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    }
    setActiveNavLink(section);
  };

  useEffect(() => {
    const texts = [
      "UI/UX Designer",
      "Solver",
      "Mobile Developer",
      "Aspiring ML Engineer",
    ];
    let currentIndex = 0;

    if (titleSpan1Ref.current)
      titleSpan1Ref.current.style.visibility = "visible";
    if (plusSignRef.current) plusSignRef.current.style.visibility = "visible";
    if (changingTextRef.current)
      changingTextRef.current.style.visibility = "visible";
    if (contactInfoRef.current)
      contactInfoRef.current.style.visibility = "visible";
    if (descriptionRef.current)
      descriptionRef.current.style.visibility = "visible";

    gsap.set(
      [titleSpan1Ref.current, plusSignRef.current, changingTextRef.current],
      {
        willChange: "transform, opacity",
      }
    );

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(
          [titleSpan1Ref.current, plusSignRef.current, changingTextRef.current],
          {
            willChange: "auto",
          }
        );
      },
    });

    tl.fromTo(
      titleSpan1Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    ).fromTo(
      titleSpan1Ref.current,
      { text: "" },
      { text: "Full Stack Developer", duration: 1, ease: "none" }
    );

    tl.fromTo(
      plusSignRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.3"
    )
      .fromTo(
        plusSignRef.current,
        { text: "" },
        { text: "+", duration: 0.2, ease: "none" }
      )
      .fromTo(
        changingTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        changingTextRef.current,
        { text: "" },
        { text: texts[0], duration: 1, ease: "none" }
      );

    let wipeAnimationTimeout: number | null = null;
    const wipeAnimation = () => {
      const nextIndex = (currentIndex + 1) % texts.length;
      const nextText = texts[nextIndex];

      const wipeTl = gsap.timeline({
        onComplete: () => {
          currentIndex = nextIndex;
          if (wipeAnimationTimeout) {
            window.clearTimeout(wipeAnimationTimeout);
          }
          wipeAnimationTimeout = window.setTimeout(wipeAnimation, 2000);
        },
      });

      wipeTl
        .set(wipeRef.current, {
          x: "-100%",
          opacity: 0.7,
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          visibility: "visible",
          willChange: "transform",
        })
        .to(wipeRef.current, {
          x: "0%",
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(changingTextRef.current, { text: nextText, duration: 0 }, "-=0.1")
        .to(wipeRef.current, {
          x: "100%",
          duration: 0.5,
          ease: "power2.inOut",
        })
        .set(wipeRef.current, {
          x: "-100%",
          willChange: "auto",
        });
    };

    let initialWipeTimeout: number | null = null;
    tl.then(() => {
      initialWipeTimeout = window.setTimeout(wipeAnimation, 2000);
    });

    gsap.set([contactInfoRef.current, descriptionRef.current], {
      willChange: "transform, opacity",
    });

    gsap.fromTo(
      contactInfoRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        delay: 2.5,
        onComplete: () => {
          gsap.set(contactInfoRef.current, { willChange: "auto" });
        },
      }
    );

    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 2.8,
        onComplete: () => {
          gsap.set(descriptionRef.current, { willChange: "auto" });
        },
      }
    );

    const updateScrollIndicators = () => {
      if (
        scrollIndicatorRef.current &&
        scrollToTopRef.current &&
        scrollTextRef.current
      ) {
        const viewportHeight = window.innerHeight;

        const resumeSectionEl = document.getElementById("resume-section");
        const techSectionEl = document.getElementById("tech-section");
        const projectsSectionEl = document.getElementById("projects-section");
        const footerEl = document.getElementById("footer-section");

        const resumeTop = resumeSectionEl?.getBoundingClientRect().top || 0;
        const techTop = techSectionEl?.getBoundingClientRect().top || 0;
        const projectsTop = projectsSectionEl?.getBoundingClientRect().top || 0;
        const footerTop = footerEl?.getBoundingClientRect().top || 0;

        if (resumeTop > 0) {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 1,
            visibility: "visible",
            duration: 0.3,
          });
        } else {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            visibility: "hidden",
            duration: 0.3,
          });
        }

        if (techTop < viewportHeight && projectsTop > 0) {
          gsap.to(scrollTextRef.current, {
            opacity: 1,
            visibility: "visible",
            duration: 0.3,
          });
        } else {
          gsap.to(scrollTextRef.current, {
            opacity: 0,
            visibility: "hidden",
            duration: 0.3,
          });
        }

        if (footerTop < viewportHeight) {
          gsap.to(scrollToTopRef.current, {
            opacity: 1,
            visibility: "visible",
            duration: 0.3,
          });
        } else {
          gsap.to(scrollToTopRef.current, {
            opacity: 0,
            visibility: "hidden",
            duration: 0.3,
          });
        }
      }
    };

    let scrollTimeout: number | null = null;
    const handleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = window.setTimeout(() => {
          updateScrollIndicators();
          scrollTimeout = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    updateScrollIndicators();

    return () => {
      if (initialWipeTimeout) {
        window.clearTimeout(initialWipeTimeout);
      }
      if (wipeAnimationTimeout) {
        window.clearTimeout(wipeAnimationTimeout);
      }

      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.scrollbarWidth = "none";

    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      body::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }
      html {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.body.style.overflow = "";
      document.body.style.scrollbarWidth = "";
      if (styleEl && styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;

      const resumeSectionEl = document.getElementById("resume-section");
      const projectsSectionEl = document.getElementById("projects-section");
      const footerSectionEl = document.getElementById("footer-section");

      const resumeSectionTop =
        resumeSectionEl?.getBoundingClientRect().top || 0;
      const projectsSectionTop =
        projectsSectionEl?.getBoundingClientRect().top || 0;
      const footerSectionTop =
        footerSectionEl?.getBoundingClientRect().top || 0;

      if (footerSectionTop < window.innerHeight / 2) {
        setActiveNavLink("contact");
      } else if (projectsSectionTop < window.innerHeight / 2) {
        setActiveNavLink("projects");
      } else if (resumeSectionTop < window.innerHeight / 2) {
        setActiveNavLink("resume");
      } else {
        setActiveNavLink("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const response = await fetch("/data/testimonials.json", { signal });
        const data = await response.json();
        setTestimonials(data);

        return controller;
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Error loading testimonials:", error);
        }
      }
    };

    let timeoutId: number | null = null;
    const deferredFetch = () => {
      timeoutId = window.setTimeout(() => {
        fetchTestimonials();
      }, 1000);
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(deferredFetch);
    } else {
      deferredFetch();
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000);

    return () => clearInterval(intervalId);
  }, [testimonials]);

  const projects = [
    {
      id: 1,
      title: "APE (Audio Personality Emulator)",
      subtitle: "Natural Language Processing & Generative ML Model",
      description: `Developing a voice emulation system using Random Forest Regression to predict audio sequences, with plans for GAN integration for realistic voice synthesis.\n
        • Worked on MFCC feature extraction, data preprocessing, and initial model training, showcasing expertise in machine learning pipelines and audio processing. \n
        • Aiming to enable users to set personalized voice profiles for devices like Alexa or Siri, addressing the demand for custom AI-driven solutions.`,
      image: apeLogo,
      gradient: true,
    },
    {
      id: 2,
      title: "Sociabuzz",
      subtitle: "REST API & REACT.Js",
      description: `Constructed a robust REST API for a social media platform, providing comprehensive CRUD functionality to users, utilizing Node.js and MongoDB. Developed a scalable and efficient backend system. • Developed the frontend of the application using React.js users experienced a 30% improvement in navigation and responsiveness, enhancing their overall experience. • Leveraged the capabilities of Node.js and MongoDB to ensure efficient data access, resulting in improved platform performance and usability. Data retrieval times were reduced by 40%, enhancing the overall user experience.`,
      image: sociobuzzLogo,
      gradient: false,
    },
    {
      id: 3,
      title: "Carbon Footprint Analysis",
      subtitle: "EDA & DataAnalysis",
      description: `Analyzed 3 datasets and processed 100,000+ data points to calculate carbon intensities for 15 industries. Developed visualizations using Python libraries to present analysis findings and enable data-driven decisions. Implemented data normalization techniques for accurate compari- son of carbon emissions across commodities. Planned future expansion with machine learning integration and real-time carbon footprint tracking web application.`,
      image: carbonLogo,
      gradient: true,
    },
  ];

  const openProject = (id: number) => {
    setSelectedProject(id);
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <HeaderContainer>
        <Logo>Harsh Mehta</Logo>

        <HamburgerButton
          onClick={toggleMenu}
          isOpen={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          title={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </HamburgerButton>

        <Navigation isOpen={isMenuOpen}>
          <NavLink
            active={activeNavLink === "home"}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              handleNavLinkClick("home");
            }}
          >
            Home
          </NavLink>
          <NavLink
            active={activeNavLink === "resume"}
            onClick={() => {
              const resumeSection = document.getElementById("resume-section");
              if (resumeSection) {
                resumeSection.scrollIntoView({ behavior: "smooth" });
                handleNavLinkClick("resume");
              }
            }}
          >
            Resume
          </NavLink>
          <NavLink
            active={activeNavLink === "projects"}
            onClick={() => {
              const projectsSection =
                document.getElementById("projects-section");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
                handleNavLinkClick("projects");
              }
            }}
          >
            <ProjectCountBadge theme={isDarkMode ? "dark" : "light"}>
              {projects.length}
            </ProjectCountBadge>
            Projects
          </NavLink>
          <NavLink
            active={activeNavLink === "contact"}
            onClick={() => {
              const footerSection = document.getElementById("footer-section");
              if (footerSection) {
                footerSection.scrollIntoView({ behavior: "smooth" });
                handleNavLinkClick("contact");
              }
            }}
          >
            Contact
          </NavLink>
        </Navigation>

        <DarkModeToggle
          onClick={toggleDarkMode}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </DarkModeToggle>
      </HeaderContainer>

      <MainContent id="main-section">
        <Title>
          <span ref={titleSpan1Ref}></span>
          <TitleContainer>
            <PlusSign ref={plusSignRef}></PlusSign>
            <ChangingText ref={changingTextRef}></ChangingText>
            <WipeRectangle ref={wipeRef} />
          </TitleContainer>
        </Title>

        <ContactSection>
          <ContactInfo ref={contactInfoRef}>
            <h3>Let's Talk</h3>
            <p>hdmehta406@gmail.com</p>
          </ContactInfo>

          <Description ref={descriptionRef}>
            Hello, I'm Harsh, an online Fullstack developer focusing on brand
            identity, user experience, and ai focus softwares.
          </Description>
        </ContactSection>
      </MainContent>

      <ResumeHeader id="resume-section">
        <div className="resume-top">
          <ResumeTitle>Resume</ResumeTitle>
          <DownloadButton
            onClick={() => window.open("/assets/resume/resume.pdf", "_blank")}
            aria-label="Download resume"
            title="Download resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </DownloadButton>
        </div>

        <ExperienceSection
          sections={[
            {
              number: "01",
              title: "Education",
              items: [
                {
                  title: "Bachelor of Technology in Computer Science",
                  subtitle:
                    "Indian Institute of Information Technology, Vadodara",
                  date: "2020 - 2024",
                  gpa: "GPA: 8.37/10.0",
                },
              ],
            },
            {
              number: "02",
              title: "Work Experience",
              items: [
                {
                  title: "Software Engineer",
                  subtitle: "Searce India Pvt. Ltd.",
                  date: "July, 2024 - Present",
                },
                {
                  title: "Software Engineer Analyst",
                  subtitle: "Searce India Pvt. Ltd.",
                  date: "Jan, 2024 - Jul, 2024",
                },
                {
                  title: "Data Science Intern",
                  subtitle: "Arcelor Mittal Nippon Steel India Pvt. Ltd.",
                  date: "May, 2023 - Jul, 2023",
                },
                {
                  title: "Research Intern",
                  subtitle:
                    "International Institute of Information Technology, Hyderabad",
                  date: "May, 2023 - Jul, 2023",
                },
              ],
            },
          ]}
        />
      </ResumeHeader>

      <DescriptionSection ref={techSectionRef} id="tech-section">
        <div className="section-header">
          <SectionTitle>Technologies I work with</SectionTitle>
          <SectionDescription>
            As a frontend developer using modern ideas simplicity design and
            universal visual identification tailored to dedicated and current
            market
          </SectionDescription>
        </div>

        <TechGrid>
          <TechItem>
            <img
              className="icon-normal"
              src={javascriptIcon}
              alt="JavaScript"
              loading="lazy"
              width="60"
              height="60"
            />
            <img
              className="icon-colored"
              src={javascriptColorIcon}
              alt="JavaScript"
              loading="lazy"
              width="60"
              height="60"
            />
          </TechItem>
          <TechItem>
            <img
              className="icon-normal"
              src={reactIcon}
              alt="React"
              loading="lazy"
              width="60"
              height="60"
            />
            <img
              className="icon-colored"
              src={reactColorIcon}
              alt="React"
              loading="lazy"
              width="60"
              height="60"
            />
          </TechItem>
          <TechItem>
            <img
              className="icon-normal"
              src={flutterIcon}
              alt="Flutter"
              loading="lazy"
              width="60"
              height="60"
            />
            <img
              className="icon-colored"
              src={flutterColorIcon}
              alt="Flutter"
              loading="lazy"
              width="60"
              height="60"
            />
          </TechItem>
          <TechItem>
            <img
              className="icon-normal"
              src={nodeJsIcon}
              alt="Node.js"
              loading="lazy"
              width="60"
              height="60"
            />
            <img
              className="icon-colored"
              src={nodeJsColorIcon}
              alt="Node.js"
              loading="lazy"
              width="60"
              height="60"
            />
          </TechItem>
          <TechItem>
            <img
              className="icon-normal"
              src={googleCloudIcon}
              alt="Google Cloud"
              loading="lazy"
              width="60"
              height="60"
            />
            <img
              className="icon-colored"
              src={googleCloudColorIcon}
              alt="Google Cloud"
              loading="lazy"
              width="60"
              height="60"
            />
          </TechItem>
          <TechItem>
            <img
              className="icon-normal"
              src={firebaseIcon}
              alt="Firebase"
              loading="lazy"
              width="60"
              height="60"
            />
            <img
              className="icon-colored"
              src={firebaseColorIcon}
              alt="Firebase"
              loading="lazy"
              width="60"
              height="60"
            />
          </TechItem>
          <TechItem>
            <img
              className="icon-normal"
              src={pythonIcon}
              alt="Python"
              loading="lazy"
              width="60"
              height="60"
            />
            <img
              className="icon-colored"
              src={pythonColorIcon}
              alt="Python"
              loading="lazy"
              width="60"
              height="60"
            />
          </TechItem>
          <TechItem>
            <img
              className="icon-normal"
              src={pandasIcon}
              alt="Pandas"
              loading="lazy"
              width="60"
              height="60"
            />
            <img
              className="icon-colored"
              src={pandasColorIcon}
              alt="Pandas"
              loading="lazy"
              width="60"
              height="60"
            />
          </TechItem>
        </TechGrid>
      </DescriptionSection>

      <ProjectsSection id="projects-section">
        <ProjectsHeader>
          <div>
            <ProjectsTitle>Projects</ProjectsTitle>
            <ProjectsDescription>
              As a frontend developer using modern ideas simplicity design and
              universal visual identification tailored to dedicated and current
              market
            </ProjectsDescription>
          </div>
          <MoreLink>
            More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </MoreLink>
        </ProjectsHeader>

        <ProjectGrid>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              onClick={() => openProject(project.id)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              aria-label={`View project: ${project.title}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openProject(project.id);
                }
              }}
            >
              <CardImage gradient={project.gradient}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  width="686"
                  height="500"
                  fetchPriority="low"
                />
              </CardImage>
              <CardContent>
                <CardTitle>{project.title}</CardTitle>
                <CardSubtitle>{project.subtitle}</CardSubtitle>
              </CardContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </ProjectsSection>

      <ScrollingBanner>
        <ScrollingText>
          Designing pixel-perfect UIs and writing scalable backend code.   
          Crafting software that's fast, functional, and easy to fall in love
          with.    From wireframes to deploy — I build complete digital
          experiences.    Blending code and content to create brands people
          remember.    Turning complex ideas into simple, intuitive user
          journeys.   
        </ScrollingText>
      </ScrollingBanner>

      <TestimonialSection>
        <TestimonialTitle>People Says About Me</TestimonialTitle>

        <AnimatePresence mode="wait">
          {testimonials.length > 0 && (
            <TestimonialWrapper key={testimonials[currentTestimonialIndex].id}>
              <TestimonialQuote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                "{testimonials[currentTestimonialIndex].quote}"
              </TestimonialQuote>

              <TestimonialAuthor
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AuthorName>
                  {testimonials[currentTestimonialIndex].author}
                </AuthorName>
                <AuthorPosition>
                  {testimonials[currentTestimonialIndex].position}
                </AuthorPosition>
              </TestimonialAuthor>
            </TestimonialWrapper>
          )}
        </AnimatePresence>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "2rem",
          }}
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              onClick={() => setCurrentTestimonialIndex(index)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor:
                  index === currentTestimonialIndex
                    ? "var(--text-primary)"
                    : "rgba(100, 100, 100, 0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              role="tab"
              tabIndex={0}
              aria-selected={index === currentTestimonialIndex}
              aria-label={`Show testimonial ${index + 1} from ${
                testimonial.author
              }`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setCurrentTestimonialIndex(index);
                }
              }}
            />
          ))}
        </div>
      </TestimonialSection>

      <Footer id="footer-section">
        <FooterTop>
          <FooterTitle>Let's talk!</FooterTitle>
          <EmailButton href="mailto:hdmehta406@gmail.com">
            hdmehta406@gmail.com
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: "rotate(-360deg)" }}
            >
              <path d="M7 17L17 7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </EmailButton>
        </FooterTop>

        <FooterBottom>
          <Copyright>2025 © — Made by Harsh Mehta</Copyright>
          <SocialLinks>
            <SocialLink
              href="https://github.com/harsh-2O"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </SocialLink>
            <SocialLink
              href="https://leetcode.com/u/JamesHiding"
              target="_blank"
              rel="noopener noreferrer"
            >
              LeetCode
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/harsh2o"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </Footer>

      <ScrollIndicator ref={scrollIndicatorRef} />
      <ScrollText ref={scrollTextRef}>Scroll Down</ScrollText>
      <ScrollToTopButton
        ref={scrollToTopRef}
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        title="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: "scale(2)" }}
          aria-hidden="true"
          focusable="false"
        >
          <polyline points="36 30 24 18 12 30"></polyline>
        </svg>
      </ScrollToTopButton>

      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
          >
            <ProjectDetail
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {projects
                .filter((project) => project.id === selectedProject)
                .map((project) => (
                  <div key={project.id}>
                    <CardImage gradient={project.gradient}>
                      <img
                        src={project.image}
                        alt={project.title}
                        width="686"
                        height="500"
                      />
                    </CardImage>
                    <CardContent style={{ marginTop: "1.5rem" }}>
                      <CardTitle style={{ fontSize: "2.5rem" }}>
                        {project.title}
                      </CardTitle>
                      <CardSubtitle style={{ fontSize: "1.5rem" }}>
                        {project.subtitle}
                      </CardSubtitle>
                      <p style={{ marginTop: "1rem", lineHeight: 1.6 }}>
                        {project.description}
                      </p>
                    </CardContent>
                  </div>
                ))}
            </ProjectDetail>
          </ProjectOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Home;
