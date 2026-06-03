        // Initialize Icon set
        lucide.createIcons();

        // Copyright Year
        document.getElementById('year').textContent = new Date().getFullYear();

        // 1. Custom Initial Loader Sequence
        const loaderPerc = document.getElementById('loader-perc');
        const loaderBar = document.getElementById('loader-bar');
        const loaderSkill = document.getElementById('loader-skill');
        const loader = document.getElementById('loader');

        const loadingSkills = [
            "Initializing Workspace...",
            "Loading Shopify Architecture...",
            "Integrating AI Webhooks...",
            "Compiling UI/UX Interactions...",
            "Optimizing Core Web Vitals...",
            "Environment Ready."
        ];

        let perc = 0;
        let skillIndex = 0;
        
        const loaderInterval = setInterval(() => {
            perc += Math.floor(Math.random() * 4) + 1; // Increment by 1-4
            if (perc > 100) perc = 100;
            
            if (loaderPerc) loaderPerc.textContent = perc;
            if (loaderBar) loaderBar.style.width = perc + '%';
            
            const step = Math.floor((perc / 100) * (loadingSkills.length - 1));
            if (step !== skillIndex && step < loadingSkills.length) {
                skillIndex = step;
                if (loaderSkill) loaderSkill.textContent = loadingSkills[skillIndex];
            }

            if (perc === 100) {
                clearInterval(loaderInterval);
                setTimeout(() => {
                    if (loader) {
                        loader.style.opacity = '0';
                        loader.style.transform = 'translateY(-30px)'; // Elegant slide out
                        setTimeout(() => {
                            loader.style.display = 'none';
                        }, 800);
                    }
                }, 500);
            }
        }, 30);

        // 2. Custom Cursor Logic (Only executes for pointer environments)
        if (window.matchMedia("(pointer: fine)").matches) {
            const dot = document.getElementById('cursor-dot');
            const outline = document.getElementById('cursor-outline');
            
            // Un-hide initial state
            dot.style.opacity = '1';
            outline.style.opacity = '1';

            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;
                
                dot.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
                
                // Slight delay/easing for the outline ring
                outline.animate({
                    transform: `translate(${posX}px, ${posY}px) translate(-50%, -50%)`
                }, { duration: 500, fill: "forwards" });
            });

            // Hover effects for clicking elements
            document.querySelectorAll('a, button, .glass-card').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    outline.style.transform += 'scale(1.5)';
                    outline.style.background = 'rgba(255,255,255,0.1)';
                    outline.style.borderColor = 'transparent';
                });
                el.addEventListener('mouseleave', () => {
                    outline.style.transform = outline.style.transform.replace('scale(1.5)', 'scale(1)');
                    outline.style.background = 'transparent';
                    outline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                });
            });
        }

        // 3. Navbar Scroll Effect & Mobile Menu
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        });

        const menuBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');
        
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            const icon = navLinks.classList.contains('nav-active') ? 'x' : 'menu';
            menuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
            lucide.createIcons();
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                menuBtn.innerHTML = `<i data-lucide="menu"></i>`;
                lucide.createIcons();
            });
        });

        // 4. Scroll Reveal Animations & Number Counters (Intersection Observer)
        const revealElements = document.querySelectorAll('.reveal');
        const counterElements = document.querySelectorAll('.stat-num:not(.glow-text)'); // Avoid counting the age text directly
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const animateCounters = (el) => {
            if (el.classList.contains('counted')) return;
            const target = +el.getAttribute('data-target');
            const duration = 2000; // ms
            const step = Math.max(1, Math.ceil(target / (duration / 16)));
            let current = 0;
            
            const updateCounter = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.innerText = target + "+";
                    clearInterval(updateCounter);
                    el.classList.add('counted');
                } else {
                    el.innerText = current;
                }
            }, 16);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Specific logic if it's the stats section
                    if (entry.target.classList.contains('about-grid')) {
                        counterElements.forEach(counter => animateCounters(counter));
                    }
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));

        // 5. Typing Effect Logic
        const phrases = [
            "Freelance Developer.",
            "Shopify Specialist.",
            "Vibe Coder.",
            "Growth Marketer."
        ];
        
        let i = 0;
        let j = 0;
        let currentPhrase = [];
        let isDeleting = false;
        let isEnd = false;
        const typingSpeed = 100;
        const deleteSpeed = 50;
        const pauseEnd = 2000;
        const textDisplay = document.getElementById('typing-text');

        function loop() {
            isEnd = false;
            textDisplay.innerHTML = currentPhrase.join('');

            if (i < phrases.length) {
                if (!isDeleting && j <= phrases[i].length) {
                    currentPhrase.push(phrases[i][j]);
                    j++;
                    textDisplay.innerHTML = currentPhrase.join('');
                }

                if (isDeleting && j <= phrases[i].length) {
                    currentPhrase.pop(phrases[i][j]);
                    j--;
                    textDisplay.innerHTML = currentPhrase.join('');
                }

                if (j == phrases[i].length) {
                    isEnd = true;
                    isDeleting = true;
                }

                if (isDeleting && j === 0) {
                    currentPhrase = [];
                    isDeleting = false;
                    i++;
                    if (i === phrases.length) {
                        i = 0;
                    }
                }
            }
            
            const speedUp = Math.random() * (80 - 50) + 50;
            const delay = isEnd ? pauseEnd : (isDeleting ? deleteSpeed : speedUp);
            setTimeout(loop, delay);
        }
        
        // Start typing after loader
        setTimeout(loop, 1200);

        // 6. Glass Card Hover Glow tracking effect
        document.querySelectorAll('.card-content-wrap').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
