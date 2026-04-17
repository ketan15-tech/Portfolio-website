(() => {
  'use strict';

  // ─── Custom cursor ─────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      follower.style.left = mouseX + 'px';
      follower.style.top = mouseY + 'px';
    });

    const interactiveEls = document.querySelectorAll('a, button, .project-card, .skill-group, .contact-item');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.width = '56px';
        follower.style.height = '56px';
        follower.style.borderColor = 'rgba(0,229,160,0.7)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.borderColor = 'rgba(0,229,160,0.4)';
      });
    });
  }

  // ─── Sticky navbar ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Mobile nav toggle ──────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.nav-link, .nav-resume').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ─── Smooth scroll for anchor links ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── Scroll reveal (Intersection Observer) ─────────────────
  const revealEls = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── Skill bar animation on scroll ─────────────────────────
  const barFills = document.querySelectorAll('.bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  barFills.forEach(bar => barObserver.observe(bar));

  // ─── Active nav link on scroll ─────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.style.color = isActive ? 'var(--text)' : '';
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(sec => activeLinkObserver.observe(sec));

  // ─── Resume button ──────────────────────────────────────────
  document.getElementById('resumeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    // Replace with actual resume PDF path when available
    alert('Resume download coming soon!\nReplace this with your actual PDF link.');
  });

  // ─── Typing effect on hero subtitle ────────────────────────
  const heroTitle = document.querySelector('.hero-title em');
  if (heroTitle) {
    const texts = [
      'Aspiring Software Developer',
      'AI Enthusiast',
      'Problem Solver',
      'Lifelong Learner',
    ];
    let current = 0;
    let charIdx = 0;
    let deleting = false;
    let paused = false;

    const type = () => {
      const fullText = texts[current];

      if (paused) return;

      if (!deleting) {
        heroTitle.textContent = fullText.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === fullText.length) {
          paused = true;
          setTimeout(() => {
            paused = false;
            deleting = true;
          }, 2200);
        }
      } else {
        heroTitle.textContent = fullText.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          current = (current + 1) % texts.length;
        }
      }
    };

    setInterval(type, deleting ? 55 : 90);
    setInterval(type, 90);
  }

  // ─── Project card tilt on mousemove ────────────────────────
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -5;
      const rotateY = ((x - cx) / cx) * 5;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ─── Scroll progress indicator ──────────────────────────────
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; width: 0%;
    background: linear-gradient(90deg, #00e5a0, #00b87a);
    z-index: 9999; transition: width 0.1s linear; pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });

  // ─── Stats counter animation ────────────────────────────────
  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent;
      const numMatch = raw.match(/\d+/);
      if (!numMatch) return;

      const target = parseInt(numMatch[0]);
      const suffix = raw.replace(/\d+/, '');
      let count = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + suffix;
        if (count >= target) clearInterval(timer);
      }, 40);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => {
    if (/\d/.test(el.textContent)) counterObserver.observe(el);
  });

})();
