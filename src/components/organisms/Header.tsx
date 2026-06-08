import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ThemeToggle from '../atoms/ThemeToggle';
import type { NavSection } from '../../types';

interface HeaderProps {
  activeSection: NavSection;
  isMenuOpen: boolean;
  onMenuToggle: (open: boolean) => void;
}

const NAV_ITEMS: { section: NavSection; label: string; targetId?: string }[] = [
  { section: 'home', label: 'Home' },
  { section: 'resume', label: 'Resume', targetId: 'resume-section' },
  { section: 'projects', label: 'Work', targetId: 'projects-section' },
  { section: 'blog', label: 'Blog', targetId: 'blog-section' },
  { section: 'contact', label: 'Contact', targetId: 'footer-section' },
];

/** Frosted bar only — backdrop on a pseudo-element so fixed menus aren't trapped inside. */
const HeaderContainer = styled.header<{ $scrolled: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 max(clamp(1rem, 4vw, 2.5rem), env(safe-area-inset-right, 0px))
    0 max(clamp(1rem, 4vw, 2.5rem), env(safe-area-inset-left, 0px));
  padding-top: env(safe-area-inset-top, 0px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  min-height: 48px;
  background: ${({ $scrolled }) => ($scrolled ? 'var(--header-bg)' : 'transparent')};
  border-bottom: 1px solid
    ${({ $scrolled }) => ($scrolled ? 'var(--header-shadow)' : 'transparent')};
  transition: background 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
    border-color 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'saturate(180%) blur(20px)' : 'none')};
    -webkit-backdrop-filter: ${({ $scrolled }) =>
      $scrolled ? 'saturate(180%) blur(20px)' : 'none'};
    transition: backdrop-filter 0.35s ease;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr auto;
    background: var(--header-bg);
    border-bottom: 1px solid var(--header-shadow);

    &::before {
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
    }
  }
`;

const Logo = styled.button`
  justify-self: start;
  font-family: var(--font-display);
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.88;
  transition: opacity var(--transition);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  max-width: 55vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover { opacity: 1; }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: clamp(1.25rem, 3vw, 2rem);
  justify-self: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled.button<{ $active?: boolean; $mobile?: boolean }>`
  font-size: ${({ $mobile }) => ($mobile ? 'clamp(1.25rem, 5vw, 1.65rem)' : 'var(--text-label)')};
  font-weight: ${({ $mobile }) => ($mobile ? 500 : 600)};
  letter-spacing: ${({ $mobile }) => ($mobile ? '-0.02em' : '0.12em')};
  text-transform: ${({ $mobile }) => ($mobile ? 'none' : 'uppercase')};
  font-family: var(--font-primary);
  color: var(--text-primary);
  opacity: ${({ $active, $mobile }) => {
    if ($mobile) return $active ? 1 : 0.4;
    return $active ? 1 : 0.55;
  }};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ $mobile }) => ($mobile ? '0.75rem 0' : '0')};
  min-height: ${({ $mobile }) => ($mobile ? '48px' : 'auto')};
  width: ${({ $mobile }) => ($mobile ? '100%' : 'auto')};
  text-align: ${({ $mobile }) => ($mobile ? 'left' : 'inherit')};
  display: ${({ $mobile }) => ($mobile ? 'flex' : 'inline')};
  align-items: center;
  transition: opacity var(--transition);
  position: relative;

  &:hover { opacity: 0.85; }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--accent);
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  ${({ $mobile }) =>
    $mobile &&
    `
    &::after { display: none; }
  `}
`;

const RightSlot = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MenuButton = styled.button`
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  opacity: 0.8;

  @media (max-width: 1024px) {
    display: flex;
  }

  svg { width: 18px; height: 18px; }
`;

/** Outside header — viewport-fixed, not clipped by header backdrop-filter. */
const MobileNavOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 98;
    background: rgba(0, 0, 0, 0.35);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
    transition: opacity 0.35s ease, visibility 0.35s ease;
  }
`;

const MobileNav = styled.nav<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 88vw);
    padding: calc(var(--header-height) + 1.5rem) var(--section-padding-x)
      max(2rem, env(safe-area-inset-bottom, 0px));
    background: var(--header-bg);
    border-left: 1px solid var(--header-shadow);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12);
    z-index: 99;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
    transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
      visibility 0.4s ease;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Header({ activeSection, isMenuOpen, onMenuToggle }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onMenuToggle(false);
        document.body.style.overflow = 'auto';
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen, onMenuToggle]);

  const navigate = (targetId?: string) => {
    onMenuToggle(false);
    document.body.style.overflow = 'auto';
    if (targetId) scrollToSection(targetId);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    const next = !isMenuOpen;
    document.body.style.overflow = next ? 'hidden' : 'auto';
    onMenuToggle(next);
  };

  const closeMenu = () => {
    onMenuToggle(false);
    document.body.style.overflow = 'auto';
  };

  const navLinks = (mobile: boolean) =>
    NAV_ITEMS.map(({ section, label, targetId }) => (
      <NavLink
        key={section}
        $active={activeSection === section}
        $mobile={mobile}
        onClick={() => navigate(targetId)}
      >
        {label}
      </NavLink>
    ));

  return (
    <>
      <HeaderContainer $scrolled={scrolled}>
        <a href="#main-section" className="skip-link">Skip to content</a>

        <Logo onClick={() => navigate()} aria-label="Scroll to top">
          Harsh Mehta
        </Logo>

        <DesktopNav aria-label="Main navigation">{navLinks(false)}</DesktopNav>

        <RightSlot>
          <ThemeToggle />
          <MenuButton
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </MenuButton>
        </RightSlot>
      </HeaderContainer>

      <MobileNavOverlay $isOpen={isMenuOpen} onClick={closeMenu} aria-hidden="true" />

      <MobileNav $isOpen={isMenuOpen} aria-label="Mobile navigation" aria-hidden={!isMenuOpen}>
        {navLinks(true)}
      </MobileNav>
    </>
  );
}
