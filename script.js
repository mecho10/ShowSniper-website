// script.js

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Terminal typing animation
function animateTerminal() {
    const lines = document.querySelectorAll('.terminal-line');
    lines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.5}s`;
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', function() {
    // Animate terminal on load
    animateTerminal();
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Terminal live typing effect
let terminalLines = [
    { text: '[14:39:11.408] | Initializing Show Sniper...', class: 'time' },
    { text: 'Validating license...', class: 'info' },
    { text: 'Welcome to Show Sniper!', class: 'success' },
    { text: '請確保您已透過 Discord Bot 綁定金鑰', class: '' },
    { text: '驗證金鑰中...', class: 'info' },
    { text: '金鑰驗證成功，有效期限至：2025-07-19', class: 'success' },
    { text: '[Task1] 你選擇的場次 key: 19641', class: 'info' },
    { text: '[Task1] 任務啟動，準備進入票區頁面...', class: 'info' },
    { text: '[Task1] 購票中...', class: 'info' },
    { text: '[Task1] 檢查訂單中...', class: 'warning' },
    { text: '[Task1] 🎉 恭喜搶到票！', class: 'success' },
    { text: '✓ Discord webhook 發送成功', class: 'success' }
];

let currentLine = 0;
let terminalContent = document.getElementById('terminal-content');

function typeNextLine() {
    if (currentLine < terminalLines.length) {
        const lineData = terminalLines[currentLine];
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        
        if (lineData.class) {
            lineElement.innerHTML = `<span class="${lineData.class}">${lineData.text}</span>`;
        } else {
            lineElement.textContent = lineData.text;
        }
        
        terminalContent.appendChild(lineElement);
        
        // Scroll to bottom
        terminalContent.parentElement.scrollTop = terminalContent.parentElement.scrollHeight;
        
        currentLine++;
        
        // Random delay between lines
        const delay = Math.random() * 1000 + 500;
        setTimeout(typeNextLine, delay);
    } else {
        // Restart animation after 5 seconds
        setTimeout(() => {
            terminalContent.innerHTML = '';
            currentLine = 0;
            typeNextLine();
        }, 5000);
    }
}

// Start terminal animation when in view
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && currentLine === 0) {
            typeNextLine();
        }
    });
});

const terminalWindow = document.querySelector('.terminal-window');
if (terminalWindow) {
    terminalObserver.observe(terminalWindow);
}

// Counter animation for stats
function animateCounter(element, target) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    };
    
    updateCounter();
}

// Animate stats when in view
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumber = entry.target.querySelector('.stat-number');
            
            if (statNumber.textContent.includes('%')) {
                statNumber.dataset.suffix = '%';
                animateCounter(statNumber, parseFloat(statNumber.textContent));
            } else if (statNumber.textContent.includes('秒')) {
                statNumber.dataset.suffix = '秒';
                animateCounter(statNumber, parseFloat(statNumber.textContent));
            } else if (statNumber.textContent.includes('+')) {
                statNumber.dataset.suffix = '+';
                animateCounter(statNumber, parseInt(statNumber.textContent));
            }
        }
    });
});

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Play button click effect
const playBtn = document.querySelector('.play-btn');
if (playBtn) {
    playBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('演示影片即將開始播放...');
        // 這裡可以加入實際的影片播放邏輯
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-animation');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to logo
const logoImg = document.querySelector('.logo-img');
if (logoImg) {
    logoImg.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(360deg)';
    });
    
    logoImg.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg)';
    });
}

// Form submission (if you add a contact form later)
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('感謝您的訊息！我們會盡快回覆您。');
    e.target.reset();
}

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            alert('🎉 恭喜發現彩蛋！使用優惠碼 "KONAMI" 可享 9 折優惠！');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});