// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Quiz Data
const quizData = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "How many moons does Earth have?",
        options: ["None", "One", "Two", "Three"],
        correct: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
        correct: 2
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mars", "Mercury"],
        correct: 3
    },
    {
        question: "What year did humans first land on the Moon?",
        options: ["1965", "1969", "1972", "1975"],
        correct: 1
    }
];

// Quiz Variables
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// Initialize Quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    document.getElementById('total-questions').textContent = quizData.length;
    document.getElementById('options').style.display = 'flex';
    document.querySelector('.quiz-header').style.display = 'flex';
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const questionData = quizData[currentQuestion];
    document.getElementById('question').textContent = questionData.question;
    document.getElementById('question-number').textContent = currentQuestion + 1;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    selectedOption = null;
}

// Select Option
function selectOption(index) {
    selectedOption = index;
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, i) => {
        option.classList.remove('selected', 'correct', 'incorrect');
        if (i === index) {
            option.classList.add('selected');
        }
    });
    
    // Check answer
    const questionData = quizData[currentQuestion];
    if (index === questionData.correct) {
        options[index].classList.add('correct');
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[questionData.correct].classList.add('correct');
    }
    
    // Disable further selection
    options.forEach(option => {
        option.onclick = null;
    });
    
    document.getElementById('next-btn').style.display = 'block';
}

// Next Question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Show Result
function showResult() {
    document.getElementById('options').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.querySelector('.quiz-header').style.display = 'none';
    
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    
    let message = '';
    const percentage = (score / quizData.length) * 100;
    
    if (percentage >= 80) {
        message = `🌟 Excellent! You scored ${score} out of ${quizData.length}! You're a space expert!`;
    } else if (percentage >= 60) {
        message = `🚀 Good job! You scored ${score} out of ${quizData.length}! Keep exploring!`;
    } else {
        message = `🛸 You scored ${score} out of ${quizData.length}. Time to learn more about space!`;
    }
    
    resultDiv.innerHTML = `
        <h3>${message}</h3>
        <button class="cta-button" onclick="initQuiz()">Try Again</button>
    `;
}

// Planet Card Hover Effects
const planetCards = document.querySelectorAll('.planet-card');
planetCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.planet-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Create shooting stars
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: white;
        box-shadow: 0 0 6px 2px white;
        top: ${Math.random() * 50}%;
        left: -2px;
        z-index: 999;
    `;
    
    document.body.appendChild(star);
    
    const duration = Math.random() * 2 + 1;
    star.animate([
        { transform: 'translateX(0) translateY(0)', opacity: 1 },
        { transform: `translateX(${window.innerWidth + 100}px) translateY(${Math.random() * 200 + 100}px)`, opacity: 0 }
    ], {
        duration: duration * 1000,
        easing: 'ease-out'
    }).onfinish = () => star.remove();
}

// Create shooting stars periodically
setInterval(createShootingStar, 3000);

// Facts ticker - clone content for seamless loop
const factsContent = document.querySelector('.facts-content');
if (factsContent) {
    factsContent.innerHTML += factsContent.innerHTML;
}

// Initialize quiz when page loads
window.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Add keyboard navigation for quiz
document.addEventListener('keydown', (e) => {
    if (document.getElementById('quiz').getBoundingClientRect().top < window.innerHeight) {
        if (e.key >= '1' && e.key <= '4' && selectedOption === null) {
            selectOption(parseInt(e.key) - 1);
        } else if (e.key === 'Enter' && selectedOption !== null) {
            nextQuestion();
        }
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});