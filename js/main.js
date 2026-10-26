/**
 * Pranali Kasar Portfolio - Interactive Experience
 * Handles Case Study Drawer, Contact Modal, Copy-to-Clipboard, and Architectural Grid
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Case Studies Dataset ---
  const caseStudies = {
    '01': {
      title: 'Dantayu — Helping Smiles to Stay Healthy',
      category: 'Healthcare UX Design • UX Research • System Design',
      heroImage: 'assets/images/project-care.svg',
      stats: [
        { label: 'Screening Clarity', value: '+46%' },
        { label: 'Elderly Adoption', value: '88%' },
        { label: 'Follow-up Rate', value: '+35%' }
      ],
      problem: 'Indian senior citizens face significant barriers to oral healthcare due to low awareness, dental anxiety, lack of geriatric-accessible clinics, and fragmented follow-up between home care and clinical intervention.',
      research: 'Conducted contextual interviews and observation sessions with senior citizens, geriatric caregivers, and dental specialists. Identified that fear of pain, unclear preventive routines, and intimidating medical terminology prevent regular oral hygiene practices.',
      strategy: 'Architected an integrated physical-digital oral care ecosystem. Designed intuitive visual symptom self-screening, habit-anchored morning and evening care rituals, and seamless family caregiver follow-up coordination with accessible typography and calm touchpoints.',
      outcome: 'Validated through user trials with elderly participants: daily care routine adherence increased significantly, fear-induced visit cancellations dropped by 35%, and family caregivers reported higher confidence in tracking oral health.',
      behanceUrl: 'https://www.behance.net/gallery/256158987/Dantaayu-Helping-Smiles-to-Stay-Healthy'
    },
    '02': {
      title: 'Svaroots — Modular Sneaker Brand & Digital Experience',
      category: 'Business Strategy • Branding Design • UI Design',
      heroImage: 'assets/images/project-svaroots.png',
      stats: [
        { label: 'Conversion Rate', value: '+32%' },
        { label: 'Customization Flow', value: '4.6 ★' },
        { label: 'Craft Adoption', value: '78%' },
      ],
      problem: 'Traditional Indian artisanal footwear struggled to reach contemporary urban sneakerheads due to rigid sizing, non-modular construction, and disconnected digital buying experiences.',
      research: 'Conducted field ethnography across craft clusters in Rajasthan and usability sessions with urban Gen-Z sneaker collectors. Identified deep interest in heritage Indian embroidery when paired with modern modular sole aesthetics.',
      strategy: 'Built an end-to-end digital experience: designed a modular sneaker 3D customization configurator, distinctive typographic identity, and seamless e-commerce journey celebrating artisan provenance.',
      outcome: 'Achieved +32% checkout completion, validated modular sneaker customizer with over 2,000 beta sessions, and created a scalable design system for craft-driven lifestyle brands.'
    },
    '03': {
      title: 'When the Road Competes with the Screen — Automotive Touchscreen HMIs',
      category: 'Automobile UX • UX Research • Interaction Behaviour',
      heroImage: 'assets/images/project-smart.svg',
      stats: [
        { label: 'Eyes-off-Road Time', value: '-38%' },
        { label: 'Task Completion', value: '+44%' },
        { label: 'Cognitive Comfort', value: '91%' },
      ],
      problem: 'Increasing touchscreen screen sizes in modern vehicle dashboards cause dangerous cognitive overload, driver distraction, and interaction friction under chaotic Indian driving traffic.',
      research: 'Conducted in-vehicle ethnographic drive-alongs, eye-tracking gaze analysis, and cognitive load tests across city commutes, monsoon conditions, and nighttime highway drives.',
      strategy: 'Developed an ergonomic HMI framework: prioritized glanceable tactile micro-gestures, dynamic contextual widgets that adjust to speed, and calm visual typography minimizing cognitive distraction.',
      outcome: 'Validated through road trials: eyes-off-road duration dropped by 38%, critical climate/media task completion speed improved by 44%, and drivers reported significantly higher spatial confidence.'
    },
    '04': {
      title: 'An AR Customisation Experience for Svaroots',
      category: 'Business Strategy • Branding Design • UI Design',
      heroImage: 'assets/images/project-svaroots-ar.svg',
      stats: [
        { label: 'AR Engagement', value: '+42%' },
        { label: 'Dwell Time', value: '3.2x' },
        { label: 'Return Intent', value: '-28%' }
      ],
      problem: 'Extending Svaroots\' modular shoe customization into augmented reality, allowing consumers to explore, scale, and test bespoke footwear on their own feet in real space before purchasing.',
      research: 'Identified that footwear buyers hesitate with unconventional modular configurations without seeing spatial proportions, surface texture lighting, and realistic scale on their own feet.',
      strategy: 'Architected a lightweight WebAR try-before-you-buy feature with frictionless camera permissions, real-time colorway swapping, and modular sole configuration synced with the campaign catalog.',
      outcome: 'Boosted pre-order confidence, increased campaign customization sessions by 42%, and established an engaging bridge between digital configurators and physical product delivery.'
    }
  };

  // --- Modal Elements ---
  const modalBackdrop = document.getElementById('caseStudyModal');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalHeroImage = document.getElementById('modalHeroImage');
  const modalStatsGrid = document.getElementById('modalStatsGrid');
  const modalProblem = document.getElementById('modalProblem');
  const modalResearch = document.getElementById('modalResearch');
  const modalStrategy = document.getElementById('modalStrategy');
  const modalOutcome = document.getElementById('modalOutcome');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Open Case Study Inline Card Tab (horizontally aligned with card)
  document.querySelectorAll('.case-study-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      const targetTab = document.getElementById('tab-' + projectId);

      // Close other open card tabs
      document.querySelectorAll('.project-card-tab').forEach(tab => {
        if (tab !== targetTab) {
          tab.classList.remove('active');
          tab.setAttribute('aria-hidden', 'true');
          const row = tab.closest('.project-row');
          if (row) row.classList.remove('tab-open');
        }
      });

      if (targetTab) {
        targetTab.classList.add('active');
        targetTab.setAttribute('aria-hidden', 'false');
        const parentRow = targetTab.closest('.project-row');
        if (parentRow) parentRow.classList.add('tab-open');
      }
    });
  });

  // Close Card Tab via Close Button
  document.querySelectorAll('.card-tab-close-btn').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentTab = closeBtn.closest('.project-card-tab');
      if (parentTab) {
        parentTab.classList.remove('active');
        parentTab.setAttribute('aria-hidden', 'true');
        const parentRow = parentTab.closest('.project-row');
        if (parentRow) parentRow.classList.remove('tab-open');
      }
    });
  });

  // Close Modal Handler
  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // --- Contact Modal ---
  const contactModal = document.getElementById('contactModal');
  const contactCloseBtn = document.getElementById('contactCloseBtn');
  const contactTriggers = document.querySelectorAll('.trigger-contact');

  contactTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (contactModal) {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (contactCloseBtn) {
    contactCloseBtn.addEventListener('click', () => {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Contact form submission via FormSubmit.co
  const contactForm = document.getElementById('portfolioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://formsubmit.co/ajax/pranalikasar510@gmail.com', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        if (response.ok) {
          submitBtn.textContent = 'Message Sent! Thank You.';
          submitBtn.style.background = '#16A34A';
          submitBtn.style.color = '#FFFFFF';
          contactForm.reset();

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            if (contactModal) {
              contactModal.classList.remove('active');
              document.body.style.overflow = '';
            }
          }, 2400);
        } else {
          // If response not ok (e.g., initial activation pending), submit natively
          contactForm.submit();
        }
      } catch (err) {
        // Fallback for file:// protocol or offline network
        contactForm.submit();
      }
    });
  }

  // --- Copy Email to Clipboard ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyIndicator = document.getElementById('copyIndicator');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'pranalikasar510@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyIndicator) {
          copyIndicator.classList.add('show');
          copyIndicator.textContent = 'Copied to clipboard!';
          setTimeout(() => {
            copyIndicator.classList.remove('show');
          }, 2400);
        }
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }

  // --- Blueprint Grid Toggle ---
  const gridToggleBtn = document.getElementById('gridToggleBtn');
  if (gridToggleBtn) {
    gridToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('show-grid');
      const isActive = document.body.classList.contains('show-grid');
      gridToggleBtn.querySelector('.grid-status').textContent = isActive ? 'Grid: ON' : 'Grid: OFF';
    });
  }

  // Keyboard shortcut: Press 'G' to toggle grid
  window.addEventListener('keydown', (e) => {
    if (e.key === 'g' || e.key === 'G') {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (gridToggleBtn) gridToggleBtn.click();
    }
    if (e.key === 'Escape') {
      document.querySelectorAll('.project-card-tab.active').forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-hidden', 'true');
      });
      closeModal();
      if (contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // --- Mobile Hamburger Menu ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Scroll Spy & Smooth Navigation Highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else if (item.getAttribute('href')?.startsWith('#')) {
            item.classList.remove('active');
          }
        });
      }
    });
  }



  window.addEventListener('scroll', highlightNavOnScroll);
});
