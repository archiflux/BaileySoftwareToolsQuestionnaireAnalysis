/**
 * Bailey Partnership Software Survey - Navigation
 * Handles sidebar navigation and scroll behavior
 */

(function() {
  'use strict';

  // Navigation state
  let activeSection = null;
  let sections = [];
  let navLinks = [];

  /**
   * Initialize navigation
   */
  function initNavigation() {
    // Get all sections and nav links
    sections = Array.from(document.querySelectorAll('.report-section'));
    navLinks = Array.from(document.querySelectorAll('.nav-link'));

    // Add click handlers for smooth scrolling
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // Set up scroll observer
    setupScrollObserver();

    // Handle initial hash in URL
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(() => {
          scrollToSection(targetSection);
        }, 100);
      }
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.nav-sidebar');

    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });

      // Close sidebar when clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992 &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      });
    }
  }

  /**
   * Handle navigation link clicks
   */
  function handleNavClick(e) {
    e.preventDefault();

    const href = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(href);

    if (targetSection) {
      scrollToSection(targetSection);

      // Update URL without triggering scroll
      history.pushState(null, null, href);

      // Close mobile menu if open
      const sidebar = document.querySelector('.nav-sidebar');
      if (sidebar && window.innerWidth <= 992) {
        sidebar.classList.remove('open');
      }
    }
  }

  /**
   * Scroll to a section with offset for fixed header
   */
  function scrollToSection(section) {
    const metadataHeight = 50;
    const offset = 20;
    const targetPosition = section.offsetTop - metadataHeight - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Set up Intersection Observer for scroll-based highlighting
   */
  function setupScrollObserver() {
    const options = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          updateActiveNav(sectionId);
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  /**
   * Update active navigation state
   */
  function updateActiveNav(sectionId) {
    if (activeSection === sectionId) return;

    activeSection = sectionId;

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Expand/collapse sections
   */
  function initExpandables() {
    const expandableTriggers = document.querySelectorAll('.expandable-trigger');

    expandableTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const content = trigger.nextElementSibling;
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        trigger.setAttribute('aria-expanded', !isExpanded);
        content.hidden = isExpanded;
      });
    });
  }

  /**
   * Initialize table sorting
   */
  function initTableSorting() {
    const sortableHeaders = document.querySelectorAll('.data-table th.sortable');

    sortableHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const table = header.closest('.data-table');
        const columnIndex = Array.from(header.parentNode.children).indexOf(header);
        const isAscending = header.classList.contains('sorted-asc');

        // Remove sorting classes from all headers
        table.querySelectorAll('th').forEach(th => {
          th.classList.remove('sorted-asc', 'sorted-desc');
        });

        // Add new sorting class
        header.classList.add(isAscending ? 'sorted-desc' : 'sorted-asc');

        // Sort the table
        sortTable(table, columnIndex, !isAscending);
      });
    });
  }

  /**
   * Sort table rows
   */
  function sortTable(table, columnIndex, ascending) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
      const aValue = getCellValue(a, columnIndex);
      const bValue = getCellValue(b, columnIndex);

      if (!isNaN(aValue) && !isNaN(bValue)) {
        return ascending ? aValue - bValue : bValue - aValue;
      }

      return ascending
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
  }

  /**
   * Get cell value for sorting
   */
  function getCellValue(row, index) {
    const cell = row.children[index];
    const text = cell.textContent.trim();
    const number = parseFloat(text.replace(/[^0-9.-]/g, ''));
    return isNaN(number) ? text.toLowerCase() : number;
  }

  /**
   * Initialize scroll-triggered animations
   */
  function initScrollAnimations() {
    // Elements to animate on scroll
    const animatableSelectors = [
      '.widget',
      '.metric-card',
      '.insight-box',
      '.discipline-card',
      '.data-table-wrapper',
      '.chart-container'
    ];

    const animatableElements = document.querySelectorAll(animatableSelectors.join(', '));

    // Add scroll-animate class to all animatable elements
    animatableElements.forEach(el => {
      el.classList.add('scroll-animate');
    });

    // Create Intersection Observer for scroll animations
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('visible');
          // Stop observing once animated
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully visible
      threshold: 0.1
    });

    // Observe all animatable elements
    animatableElements.forEach(el => {
      animationObserver.observe(el);
    });
  }

  /**
   * Back to top button
   */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Print functionality
   */
  function initPrint() {
    const printBtn = document.getElementById('printReport');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initNavigation();
      initExpandables();
      initTableSorting();
      initBackToTop();
      initPrint();
      initScrollAnimations();
    });
  } else {
    initNavigation();
    initExpandables();
    initTableSorting();
    initBackToTop();
    initPrint();
    initScrollAnimations();
  }

  // Export for testing
  if (typeof window !== 'undefined') {
    window.dashboardNav = {
      scrollToSection,
      updateActiveNav
    };
  }
})();
