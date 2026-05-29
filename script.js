// SAO Intro & Digital Rain Logic
const canvas = document.getElementById('sao-bg-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 18; // Balanced size
if (typeof introState === 'undefined') {
    var introState = 'FLOWING'; 
}
let introTimer = 0;

const leftStreams = [];
const rightStreams = [];
const streamCount = Math.floor(height / fontSize);

// Store current characters to allow slower updates
const leftChars = [];
const rightChars = [];

for (let i = 0; i < streamCount; i++) {
    leftStreams[i] = -Math.random() * width;
    rightStreams[i] = width + Math.random() * width;
    leftChars[i] = characters.charAt(Math.floor(Math.random() * characters.length));
    rightChars[i] = characters.charAt(Math.floor(Math.random() * characters.length));
}

function drawIntro() {
    if (introState === 'FLOWING') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#FF8C00'; 
        ctx.font = fontSize + 'px monospace';
        let allReachedCenter = true;
        for (let i = 0; i < streamCount; i++) {
            // Further reduced character update probability (approx 1 in 10 frames)
            if (Math.random() > 1) {
                leftChars[i] = characters.charAt(Math.floor(Math.random() * characters.length));
                rightChars[i] = characters.charAt(Math.floor(Math.random() * characters.length));
            }

            ctx.fillText(leftChars[i], leftStreams[i], i * fontSize);
            leftStreams[i] += fontSize * 3; // Slightly faster flow (from 2)

            ctx.fillText(rightChars[i], rightStreams[i], i * fontSize);
            rightStreams[i] -= fontSize * 3; // Slightly faster flow

            if (leftStreams[i] < width / 2 || rightStreams[i] > width / 2) allReachedCenter = false;
        }
        if (allReachedCenter) introTimer++;
        if (introTimer > 15) { introState = 'BLACKOUT'; introTimer = 0; }
    } else if (introState === 'BLACKOUT') {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        introTimer++;
        if (introTimer > 40) {
            introState = 'NAME_REVEAL';
            for (let i = 0; i < streamCount; i++) leftStreams[i] = Math.random() * width;
        }
    } else if (introState === 'NAME_REVEAL') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 140, 0, 0.3)';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < streamCount; i++) {
            if (Math.random() > 0.6) {
                leftChars[i] = characters.charAt(Math.floor(Math.random() * characters.length));
            }
            ctx.fillText(leftChars[i], leftStreams[i], i * fontSize);
            leftStreams[i] += 5;
            if (leftStreams[i] > width) leftStreams[i] = 0;
        }
        if (document.getElementById('sao-start-btn')) {
            ctx.fillStyle = '#fffbe0';
            ctx.font = '45px "DotGothic16", monospace'; // Pixel/Dot font
            ctx.textAlign = 'center';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ffaa00';
            ctx.fillText('かやく / kayaku', width / 2, height / 2 - 30);
            ctx.font = '22px "DotGothic16", monospace'; // Pixel/Dot font
            ctx.shadowBlur = 5;
            ctx.fillText('cybersecurity student', width / 2, height / 2 + 15);
            ctx.shadowBlur = 0;
            document.getElementById('sao-start-btn').classList.remove('hidden');
        }
        if (document.getElementById('sao-header')) document.getElementById('sao-header').classList.remove('hidden');
    }
}

function animate() { 
    drawIntro(); 
    requestAnimationFrame(animate); 
}
if (document.getElementById('sao-start-btn')) document.getElementById('sao-start-btn').classList.add('hidden');
animate();
window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });

// SAO UI Elements
const saoStartBtn = document.getElementById('sao-start-btn');
const saoMainMenu = document.getElementById('sao-main-menu');
const catBtns = document.querySelectorAll('.sao-cat-btn');
const subMenus = document.querySelectorAll('.sub-menu');

if (saoStartBtn) {
    saoStartBtn.addEventListener('click', () => {
        saoMainMenu.classList.remove('hidden');
        saoStartBtn.classList.add('blur-bg'); // Blur the MENU button
        saoStartBtn.style.pointerEvents = 'none'; // Prevent interaction while menu is open
        canvas.classList.add('blur-bg');
    });
}

// Category switching
catBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent backdrop click
        const targetId = btn.getAttribute('data-target');
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        subMenus.forEach(menu => {
            menu.classList.remove('active');
            if (menu.id === targetId) menu.classList.add('active');
        });
    });
});

// Close logic
if (saoMainMenu) {
    saoMainMenu.addEventListener('click', (e) => {
        const isBackdrop = e.target === saoMainMenu;
        const isContainer = e.target.classList.contains('sao-menu-container');
        const isRowContainer = e.target.classList.contains('menu-rows-container');
        
        if (isBackdrop || isContainer || isRowContainer) {
            saoMainMenu.classList.add('hidden');
            saoStartBtn.classList.remove('blur-bg'); // Unblur the MENU button
            saoStartBtn.style.pointerEvents = 'auto'; // Re-enable interaction
            canvas.classList.remove('blur-bg');
        }
    });
}
