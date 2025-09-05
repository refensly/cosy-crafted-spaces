import { MutableRefObject } from 'react';

export const scrollToElementWithOffset = (elementId: string, mobileMenuOpen?: boolean) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Calculate header height dynamically
  const headerElement = document.querySelector('header');
  let headerHeight = 80; // Default fallback

  if (headerElement) {
    const headerRect = headerElement.getBoundingClientRect();
    headerHeight = headerRect.height;
    
    // Account for mobile menu if open
    if (mobileMenuOpen) {
      const mobileMenu = headerElement.querySelector('[class*="md:hidden"]');
      if (mobileMenu) {
        const menuRect = mobileMenu.getBoundingClientRect();
        headerHeight += menuRect.height;
      }
    }
  }

  // Add extra buffer for better visual spacing
  const offset = headerHeight + 16;

  // Get element position
  const elementRect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const targetPosition = elementRect.top + scrollTop - offset;

  // Smooth scroll to calculated position
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

export const scrollToContact = (mobileMenuOpen?: boolean) => {
  scrollToElementWithOffset('contact-form', mobileMenuOpen);
};

export const scrollToSection = (sectionId: string, mobileMenuOpen?: boolean) => {
  scrollToElementWithOffset(sectionId, mobileMenuOpen);
};