// SAO Intro & Digital Rain Logic
const canvas = document.getElementById('sao-bg-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 16;
let introState = 'FLOWING'; // FLOWING, BLACKOUT, NAME_REVEAL
let introTimer = 0;

// Streams for horizontal flow with randomization
const leftStreams = [];
const rightStreams = [];
const streamCount = Math.floor(height / fontSize);

for (let i = 0; i < streamCount; i++) {
    leftStreams[i] = -Math.random() * width;
    rightStreams[i] = width + Math.random() * width;
}

function drawIntro() {
    if (introState === 'FLOWING') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#FF8C00'; 
        ctx.font = fontSize + 'px monospace';

        let allReachedCenter = true;
        for (let i = 0; i < streamCount; i++) {
            const textL = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(textL, leftStreams[i], i * fontSize);
            leftStreams[i] += fontSize * 2;

            const textR = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(textR, rightStreams[i], i * fontSize);
            rightStreams[i] -= fontSize * 2;

            if (leftStreams[i] < width / 2 || rightStreams[i] > width / 2) {
                allReachedCenter = false;
            }
        }

        if (allReachedCenter) introTimer++;
        if (introTimer > 15) {
            introState = 'BLACKOUT';
            introTimer = 0;
        }
    } else if (introState === 'BLACKOUT') {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        
        introTimer++;
        if (introTimer > 40) {
            introState = 'NAME_REVEAL';
            // Transition to persistent background rain
            for (let i = 0; i < streamCount; i++) {
                leftStreams[i] = Math.random() * width;
            }
        }
    } else if (introState === 'NAME_REVEAL') {
        // Persistent rain
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 140, 0, 0.3)';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < streamCount; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, leftStreams[i], i * fontSize);
            leftStreams[i] += 5;
            if (leftStreams[i] > width) leftStreams[i] = 0;
        }

        // Show Name
        ctx.fillStyle = '#FF8C00';
        ctx.font = 'bold 50px sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FF8C00';
        ctx.fillText('Your Name', width / 2, height / 2);
        ctx.shadowBlur = 0;

        // Show start button after reveal
        document.getElementById('sao-start-btn').classList.remove('hidden');
    }
}

function animate() {
    drawIntro();
    requestAnimationFrame(animate);
}

// Ensure button starts hidden for intro
document.getElementById('sao-start-btn').classList.add('hidden');

animate();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// SAO Menu Logic
const saoStartBtn = document.getElementById('sao-start-btn');
const saoMainMenu = document.getElementById('sao-main-menu');
const saoPanel = document.getElementById('sao-panel');
const saoPanelBody = document.getElementById('sao-panel-body');
const saoPanelClose = document.getElementById('sao-panel-close');
const saoSectionBtns = document.querySelectorAll('.sao-section-btn');

saoStartBtn.addEventListener('click', () => {
    saoMainMenu.classList.remove('hidden');
    saoStartBtn.classList.add('hidden');
});

saoSectionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const sectionId = btn.getAttribute('data-section');
        const sectionContent = document.getElementById(sectionId);
        
        if (sectionContent) {
            // Clone content to show in panel
            saoPanelBody.innerHTML = sectionContent.innerHTML;
            saoMainMenu.classList.add('hidden');
            saoPanel.classList.remove('hidden');
        }
    });
});

saoPanelClose.addEventListener('click', () => {
    saoPanel.classList.add('hidden');
    saoStartBtn.classList.remove('hidden');
});

// Close menu on background click
saoMainMenu.addEventListener('click', (e) => {
    if (e.target === saoMainMenu) {
        saoMainMenu.classList.add('hidden');
        saoStartBtn.classList.remove('hidden');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Basic reveal animation on scroll (optional)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const triggerBottom = window.innerHeight / 5 * 4;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if(sectionTop < triggerBottom) {
            section.classList.add('show');
        } else {
            section.classList.remove('show');
        }
    });
});
