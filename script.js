// Typing Animation for Terminal
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize particle effect
    initParticles();
    
    // Initialize retro effects
    initRetroEffects();
});

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elements = document.querySelectorAll('.skill-category, .project-card, .contact-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Floating Terminal Toggle
function toggleTerminal() {
    const terminal = document.getElementById('miniTerminal');
    const isVisible = terminal.style.display === 'block';
    
    if (isVisible) {
        terminal.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            terminal.style.display = 'none';
        }, 300);
    } else {
        terminal.style.display = 'block';
        terminal.style.animation = 'slideIn 0.3s ease-out forwards';
    }
}

// Add CSS animations for terminal
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Particle Effect
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00D9FF;
            border-radius: 50%;
            opacity: 0;
            animation: float 6s linear forwards;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }
    
    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0);
            }
            10% {
                opacity: 1;
                transform: translateY(-10px) scale(1);
            }
            90% {
                opacity: 1;
                transform: translateY(-90vh) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100vh) scale(0);
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Create particles periodically
    setInterval(createParticle, 2000);
}

// Retro Effects
function initRetroEffects() {
    // Add glitch effect to main title
    const title = document.querySelector('.neon-text');
    if (title) {
        title.addEventListener('mouseenter', () => {
            title.style.animation = 'glitch 0.5s ease-in-out';
        });
        
        title.addEventListener('animationend', () => {
            title.style.animation = 'neonGlow 2s ease-in-out infinite alternate';
        });
    }
    
    // Add glitch CSS
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(glitchStyle);
}

// Terminal Commands Simulation
function simulateTerminalCommands() {
    const commands = [
        { command: 'git status', output: 'On branch main\nnothing to commit, working tree clean' },
        { command: 'npm run dev', output: 'Server running on http://localhost:3000' },
        { command: 'docker ps', output: 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS' },
        { command: 'php artisan serve', output: 'Laravel development server started: http://127.0.0.1:8000' }
    ];
    
    let currentCommand = 0;
    
    function runCommand() {
        const terminal = document.querySelector('.terminal-content');
        if (terminal && currentCommand < commands.length) {
            const cmd = commands[currentCommand];
            
            // Add command line
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span class="prompt">visitor@dimaswi:~$</span> <span class="command">${cmd.command}</span>`;
            terminal.appendChild(commandLine);
            
            // Add output
            setTimeout(() => {
                const output = document.createElement('div');
                output.className = 'terminal-output';
                output.innerHTML = cmd.output.split('\n').map(line => `<div>${line}</div>`).join('');
                terminal.appendChild(output);
                
                currentCommand++;
                if (currentCommand < commands.length) {
                    setTimeout(runCommand, 3000);
                }
            }, 1000);
        }
    }
    
    // Start simulation when terminal is opened
    document.querySelector('.floating-terminal').addEventListener('click', () => {
        if (currentCommand === 0) {
            setTimeout(runCommand, 1000);
        }
    });
}

// Initialize terminal simulation
simulateTerminalCommands();

// Smooth scrolling for internal links
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

// Add matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        opacity: 0.1;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];
    
    for(let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00D9FF';
        ctx.font = fontSize + 'px Fira Code';
        
        for(let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            if(rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }
    
    setInterval(draw, 30);
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize matrix rain effect
setTimeout(createMatrixRain, 2000);

// Add easter egg - Konami code
let konamiCode = [];
const correctCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > correctCode.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === correctCode.join(',')) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        // Show secret message
        const message = document.createElement('div');
        message.textContent = '🎉 Konami Code Activated! You found the easter egg! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 217, 255, 0.9);
            color: black;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Fira Code', monospace;
            font-weight: bold;
            z-index: 9999;
            animation: bounce 0.5s ease-in-out;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
        
        konamiCode = [];
    }
});

// Add bounce animation for easter egg
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate(-50%, -50%) scale(1);
        }
        40%, 43% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        70% {
            transform: translate(-50%, -50%) scale(1.05);
        }
        90% {
            transform: translate(-50%, -50%) scale(1.02);
        }
    }
`;
document.head.appendChild(bounceStyle);
