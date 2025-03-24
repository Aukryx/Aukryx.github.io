// Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Elements that should change cursor
    const cursorElements = document.querySelectorAll('a, button, input, textarea, .project-card');
    
    cursorElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(122, 162, 247, 0.2)';
            cursorTrail.style.opacity = '0';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
            cursorTrail.style.opacity = '1';
        });
    });
    
    // Sticky Navigation
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // About Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tab).classList.add('active');
        });
    });
    
    // Projects Filter
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Project Modals
    document.addEventListener('DOMContentLoaded', function() {
        // Modal opening
        const projectButtons = document.querySelectorAll('.project-view[data-project]');
        const modals = document.querySelectorAll('.modal');
        const modalCloseButtons = document.querySelectorAll('.modal-close');
        
        projectButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectType = button.getAttribute('data-project');
                const modal = document.getElementById(`${projectType}Modal`);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                }
            });
        });
        
        // Close modal with button
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close modal when clicking outside content
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    if (modal.classList.contains('active')) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }
        });
        
        // Handle disabled demo links
        const demoLinks = document.querySelectorAll('.modal-demo-link.disabled-link');
        demoLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Demo unavailable for this project. Please check the GitHub repository for more information.');
            });
        });
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Form Submission
    /*
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Envoi en cours...';
        
        setTimeout(() => {
            submitBtn.textContent = 'Envoyé !';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = 'Envoyer';
            }, 3000);
        }, 2000);
    });
    */
    
    // Animation on Scroll
    const animateElements = document.querySelectorAll('.about-content, .project-card, .contact-info, .contact-form');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    
    // Initialize Animation
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add CSS for Skills Bar
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .skills-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .skill-item {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .skill-bar {
            width: 100%;
            height: 8px;
            background-color: rgba(169, 177, 214, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .skill-progress {
            height: 100%;
            border-radius: 4px;
            transition: width 1.5s ease;
            width: 0;
        }
        
        .timeline {
            position: relative;
            margin-top: 1rem;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, var(--accent-blue), var(--accent-purple));
        }
        
        .timeline-item {
            position: relative;
            padding-left: 2rem;
            margin-bottom: 2rem;
        }
        
        .timeline-dot {
            position: absolute;
            top: 0;
            left: -5px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--accent-blue);
            border: 2px solid var(--bg-secondary);
        }
        
        .timeline-content {
            background-color: rgba(122, 162, 247, 0.05);
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: var(--shadow);
        }
        
        .timeline-date {
            color: var(--accent-cyan);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Initialize skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Call animation when skills tab is shown
    document.querySelector('.tab-button[data-tab="skills"]').addEventListener('click', animateSkillBars);
    
    // Initial animation
    setTimeout(animateSkillBars, 1000);