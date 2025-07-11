// Educational Website JavaScript
class EducationalWebsite {
    constructor() {
        this.currentSection = 'home';
        this.currentCourse = null;
        this.currentLesson = 0;
        this.currentQuiz = null;
        this.currentQuizQuestion = 0;
        this.userData = this.loadUserData();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateProgress();
        this.updateNavigation();
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('homeBtn').addEventListener('click', () => this.showSection('home'));
        document.getElementById('coursesBtn').addEventListener('click', () => this.showSection('courses'));
        document.getElementById('progressBtn').addEventListener('click', () => this.showSection('progress'));
        document.getElementById('startLearning').addEventListener('click', () => this.showSection('courses'));

        // Course buttons
        document.querySelectorAll('.course-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const courseCard = e.target.closest('.course-card');
                const courseName = courseCard.getAttribute('data-course');
                this.startCourse(courseName);
            });
        });

        // Modal close buttons
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal('lessonModal'));
        document.getElementById('closeQuizModal').addEventListener('click', () => this.closeModal('quizModal'));

        // Lesson navigation
        document.getElementById('prevBtn').addEventListener('click', () => this.navigateLesson(-1));
        document.getElementById('nextBtn').addEventListener('click', () => this.navigateLesson(1));

        // Quiz buttons
        document.getElementById('submitQuiz').addEventListener('click', () => this.submitQuiz());
        document.getElementById('nextQuestion').addEventListener('click', () => this.nextQuizQuestion());

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        document.getElementById(sectionName).classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(sectionName + 'Btn').classList.add('active');

        this.currentSection = sectionName;
    }

    updateNavigation() {
        document.getElementById('homeBtn').classList.add('active');
    }

    startCourse(courseName) {
        this.currentCourse = courseName;
        this.currentLesson = 0;
        this.loadLesson();
    }

    loadLesson() {
        const lesson = this.getLessonData(this.currentCourse, this.currentLesson);
        if (!lesson) return;

        document.getElementById('lessonTitle').textContent = lesson.title;
        document.getElementById('lessonContent').innerHTML = lesson.content;
        document.getElementById('lessonModal').style.display = 'block';

        // Update lesson navigation buttons
        document.getElementById('prevBtn').style.display = this.currentLesson > 0 ? 'block' : 'none';
        
        const totalLessons = this.getCourseData(this.currentCourse).lessons.length;
        const nextBtn = document.getElementById('nextBtn');
        if (this.currentLesson < totalLessons - 1) {
            nextBtn.textContent = 'Next';
            nextBtn.onclick = () => this.navigateLesson(1);
        } else {
            nextBtn.textContent = 'Take Quiz';
            nextBtn.onclick = () => this.startQuiz();
        }
    }

    navigateLesson(direction) {
        const totalLessons = this.getCourseData(this.currentCourse).lessons.length;
        const newLesson = this.currentLesson + direction;
        
        if (newLesson >= 0 && newLesson < totalLessons) {
            this.currentLesson = newLesson;
            this.loadLesson();
        }
    }

    startQuiz() {
        this.closeModal('lessonModal');
        this.currentQuiz = this.getQuizData(this.currentCourse);
        this.currentQuizQuestion = 0;
        this.loadQuizQuestion();
    }

    loadQuizQuestion() {
        const question = this.currentQuiz.questions[this.currentQuizQuestion];
        document.getElementById('quizTitle').textContent = `${this.currentQuiz.title} - Question ${this.currentQuizQuestion + 1}`;
        
        const quizContent = document.getElementById('quizContent');
        quizContent.innerHTML = `
            <div class="quiz-question">
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option" data-option="${index}">
                            ${option}
                        </div>
                    `).join('')}
                </div>
                <div class="quiz-feedback" id="quizFeedback" style="display: none;"></div>
            </div>
        `;

        // Add option click handlers
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });

        document.getElementById('quizModal').style.display = 'block';
        document.getElementById('submitQuiz').style.display = 'block';
        document.getElementById('nextQuestion').style.display = 'none';
    }

    submitQuiz() {
        const selectedOption = document.querySelector('.quiz-option.selected');
        if (!selectedOption) {
            alert('Please select an answer!');
            return;
        }

        const selectedIndex = parseInt(selectedOption.getAttribute('data-option'));
        const question = this.currentQuiz.questions[this.currentQuizQuestion];
        const isCorrect = selectedIndex === question.correct;

        // Show feedback
        const feedback = document.getElementById('quizFeedback');
        feedback.style.display = 'block';
        feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.textContent = isCorrect ? 'Correct! ' + question.explanation : 'Incorrect. ' + question.explanation;

        // Update option styles
        document.querySelectorAll('.quiz-option').forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });

        // Update progress
        if (isCorrect) {
            this.updateUserProgress('quiz', this.currentCourse);
        }

        // Show next question or finish button
        document.getElementById('submitQuiz').style.display = 'none';
        if (this.currentQuizQuestion < this.currentQuiz.questions.length - 1) {
            document.getElementById('nextQuestion').style.display = 'block';
        } else {
            const nextBtn = document.getElementById('nextQuestion');
            nextBtn.textContent = 'Finish Quiz';
            nextBtn.style.display = 'block';
            nextBtn.onclick = () => this.finishQuiz();
        }
    }

    nextQuizQuestion() {
        this.currentQuizQuestion++;
        if (this.currentQuizQuestion < this.currentQuiz.questions.length) {
            this.loadQuizQuestion();
        } else {
            this.finishQuiz();
        }
    }

    finishQuiz() {
        this.closeModal('quizModal');
        this.updateUserProgress('course', this.currentCourse);
        this.updateProgress();
        alert('Congratulations! You\'ve completed the course!');
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    updateUserProgress(type, course) {
        if (!this.userData.progress[course]) {
            this.userData.progress[course] = { lessons: 0, quizzes: 0, completed: false };
        }

        if (type === 'lesson') {
            this.userData.progress[course].lessons++;
        } else if (type === 'quiz') {
            this.userData.progress[course].quizzes++;
        } else if (type === 'course') {
            this.userData.progress[course].completed = true;
        }

        this.userData.totalLessons = Object.values(this.userData.progress).reduce((sum, p) => sum + p.lessons, 0);
        this.userData.totalQuizzes = Object.values(this.userData.progress).reduce((sum, p) => sum + p.quizzes, 0);
        this.userData.lastActivity = new Date().toISOString();

        this.saveUserData();
    }

    updateProgress() {
        // Update course progress bars
        Object.keys(this.userData.progress).forEach(course => {
            const courseCard = document.querySelector(`[data-course="${course}"]`);
            if (courseCard) {
                const progress = this.userData.progress[course];
                const totalLessons = this.getCourseData(course).lessons.length;
                const totalQuizzes = this.getCourseData(course).quizzes || 1;
                const completionPercentage = progress.completed ? 100 : 
                    Math.round(((progress.lessons / totalLessons) + (progress.quizzes / totalQuizzes)) * 50);

                const progressFill = courseCard.querySelector('.progress-fill');
                const progressText = courseCard.querySelector('.progress-text');
                
                if (progressFill && progressText) {
                    progressFill.style.width = completionPercentage + '%';
                    progressText.textContent = completionPercentage + '% Complete';
                }
            }
        });

        // Update overall progress
        const totalCourses = 4;
        const completedCourses = Object.values(this.userData.progress).filter(p => p.completed).length;
        const overallProgress = Math.round((completedCourses / totalCourses) * 100);

        // Update circular progress
        const progressRing = document.querySelector('.progress-ring-progress');
        const progressPercentage = document.querySelector('.progress-percentage');
        
        if (progressRing && progressPercentage) {
            const circumference = 2 * Math.PI * 50;
            const offset = circumference - (overallProgress / 100) * circumference;
            progressRing.style.strokeDashoffset = offset;
            progressPercentage.textContent = overallProgress + '%';
        }

        // Update stats
        document.getElementById('lessonsCompleted').textContent = this.userData.totalLessons;
        document.getElementById('quizzesPassed').textContent = this.userData.totalQuizzes;
        document.getElementById('streakDays').textContent = this.calculateStreak();
    }

    calculateStreak() {
        if (!this.userData.lastActivity) return 0;
        
        const lastActivity = new Date(this.userData.lastActivity);
        const today = new Date();
        const diffTime = Math.abs(today - lastActivity);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays <= 1 ? (this.userData.streak || 1) : 0;
    }

    loadUserData() {
        const savedData = localStorage.getItem('educationalWebsiteData');
        if (savedData) {
            return JSON.parse(savedData);
        }
        return {
            progress: {},
            totalLessons: 0,
            totalQuizzes: 0,
            streak: 0,
            lastActivity: null
        };
    }

    saveUserData() {
        localStorage.setItem('educationalWebsiteData', JSON.stringify(this.userData));
    }

    getCourseData(courseName) {
        const courses = {
            'variables': {
                title: 'Variables & Data Types',
                lessons: [
                    {
                        title: 'Introduction to Variables',
                        content: `
                            <h3>What are Variables?</h3>
                            <p>Variables are containers that store data values. Think of them as labeled boxes where you can put information and retrieve it later.</p>
                            
                            <h3>Creating Variables</h3>
                            <p>In most programming languages, you can create variables like this:</p>
                            <pre>
// JavaScript example
let message = "Hello, World!";
let age = 25;
let isStudent = true;
                            </pre>
                            
                            <h3>Types of Data</h3>
                            <p>Variables can store different types of data:</p>
                            <ul>
                                <li><strong>Strings:</strong> Text data like "Hello"</li>
                                <li><strong>Numbers:</strong> Integers like 42 or decimals like 3.14</li>
                                <li><strong>Booleans:</strong> True or false values</li>
                                <li><strong>Arrays:</strong> Lists of values</li>
                            </ul>
                        `
                    },
                    {
                        title: 'Working with Different Data Types',
                        content: `
                            <h3>String Operations</h3>
                            <p>You can combine strings using concatenation:</p>
                            <pre>
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName; // "John Doe"
                            </pre>
                            
                            <h3>Number Operations</h3>
                            <p>Perform mathematical operations with numbers:</p>
                            <pre>
let x = 10;
let y = 5;
let sum = x + y;        // 15
let product = x * y;    // 50
let division = x / y;   // 2
                            </pre>
                            
                            <h3>Boolean Logic</h3>
                            <p>Use boolean values for decision making:</p>
                            <pre>
let isLoggedIn = true;
let hasPermission = false;
let canAccess = isLoggedIn && hasPermission; // false
                            </pre>
                        `
                    }
                ],
                quizzes: 1
            },
            'control-flow': {
                title: 'Control Flow',
                lessons: [
                    {
                        title: 'Conditional Statements',
                        content: `
                            <h3>If Statements</h3>
                            <p>Use if statements to execute code based on conditions:</p>
                            <pre>
let temperature = 25;

if (temperature > 30) {
    console.log("It's hot outside!");
} else if (temperature > 20) {
    console.log("Nice weather!");
} else {
    console.log("It's cold!");
}
                            </pre>
                            
                            <h3>Comparison Operators</h3>
                            <p>Use these operators to compare values:</p>
                            <ul>
                                <li><code>==</code> Equal to</li>
                                <li><code>!=</code> Not equal to</li>
                                <li><code>></code> Greater than</li>
                                <li><code><</code> Less than</li>
                                <li><code>>=</code> Greater than or equal</li>
                                <li><code><=</code> Less than or equal</li>
                            </ul>
                        `
                    },
                    {
                        title: 'Loops',
                        content: `
                            <h3>For Loops</h3>
                            <p>Use for loops to repeat code a specific number of times:</p>
                            <pre>
for (let i = 0; i < 5; i++) {
    console.log("Count: " + i);
}
// Output: Count: 0, Count: 1, Count: 2, Count: 3, Count: 4
                            </pre>
                            
                            <h3>While Loops</h3>
                            <p>Use while loops to repeat code while a condition is true:</p>
                            <pre>
let count = 0;
while (count < 3) {
    console.log("Count is: " + count);
    count++;
}
                            </pre>
                            
                            <h3>Loop Control</h3>
                            <p>Use <code>break</code> to exit a loop early and <code>continue</code> to skip to the next iteration.</p>
                        `
                    }
                ],
                quizzes: 1
            },
            'functions': {
                title: 'Functions',
                lessons: [
                    {
                        title: 'Creating Functions',
                        content: `
                            <h3>What are Functions?</h3>
                            <p>Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.</p>
                            
                            <h3>Function Declaration</h3>
                            <pre>
function greet(name) {
    return "Hello, " + name + "!";
}

// Call the function
let message = greet("Alice");
console.log(message); // "Hello, Alice!"
                            </pre>
                            
                            <h3>Function Parameters</h3>
                            <p>Functions can accept parameters (inputs) to work with different data:</p>
                            <pre>
function addNumbers(a, b) {
    return a + b;
}

let result = addNumbers(5, 3); // 8
                            </pre>
                        `
                    },
                    {
                        title: 'Advanced Function Concepts',
                        content: `
                            <h3>Arrow Functions</h3>
                            <p>A shorter way to write functions:</p>
                            <pre>
const multiply = (a, b) => a * b;
const square = x => x * x;
                            </pre>
                            
                            <h3>Function Scope</h3>
                            <p>Variables declared inside a function are only accessible within that function:</p>
                            <pre>
function myFunction() {
    let localVar = "I'm local";
    console.log(localVar); // Works
}

// console.log(localVar); // Error: localVar is not defined
                            </pre>
                            
                            <h3>Return Values</h3>
                            <p>Functions can return values to be used elsewhere in your code:</p>
                            <pre>
function calculateArea(radius) {
    return Math.PI * radius * radius;
}

let area = calculateArea(5);
                            </pre>
                        `
                    }
                ],
                quizzes: 1
            },
            'algorithms': {
                title: 'Basic Algorithms',
                lessons: [
                    {
                        title: 'Sorting Algorithms',
                        content: `
                            <h3>What are Algorithms?</h3>
                            <p>Algorithms are step-by-step procedures for solving problems. They're like recipes for computers!</p>
                            
                            <h3>Bubble Sort</h3>
                            <p>A simple sorting algorithm that repeatedly steps through the list:</p>
                            <pre>
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

let numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]
                            </pre>
                        `
                    },
                    {
                        title: 'Search Algorithms',
                        content: `
                            <h3>Linear Search</h3>
                            <p>Search through each element one by one:</p>
                            <pre>
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

let fruits = ["apple", "banana", "orange", "grape"];
console.log(linearSearch(fruits, "orange")); // 2
                            </pre>
                            
                            <h3>Binary Search</h3>
                            <p>Efficient search for sorted arrays:</p>
                            <pre>
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}
                            </pre>
                        `
                    }
                ],
                quizzes: 1
            }
        };
        
        return courses[courseName];
    }

    getLessonData(courseName, lessonIndex) {
        const course = this.getCourseData(courseName);
        return course ? course.lessons[lessonIndex] : null;
    }

    getQuizData(courseName) {
        const quizzes = {
            'variables': {
                title: 'Variables & Data Types Quiz',
                questions: [
                    {
                        question: 'Which of the following is a correct way to declare a variable in JavaScript?',
                        options: [
                            'variable name = "value";',
                            'let name = "value";',
                            'name := "value";',
                            'var name == "value";'
                        ],
                        correct: 1,
                        explanation: 'In JavaScript, you use "let" (or "var" or "const") to declare variables.'
                    },
                    {
                        question: 'What data type is the value true?',
                        options: ['String', 'Number', 'Boolean', 'Array'],
                        correct: 2,
                        explanation: 'True and false are boolean values.'
                    },
                    {
                        question: 'How do you combine two strings in JavaScript?',
                        options: [
                            'string1 + string2',
                            'string1.combine(string2)',
                            'merge(string1, string2)',
                            'string1 & string2'
                        ],
                        correct: 0,
                        explanation: 'You can combine strings using the + operator.'
                    }
                ]
            },
            'control-flow': {
                title: 'Control Flow Quiz',
                questions: [
                    {
                        question: 'What will this code output: if (5 > 3) { console.log("Yes"); } else { console.log("No"); }',
                        options: ['Yes', 'No', 'Error', 'Nothing'],
                        correct: 0,
                        explanation: 'Since 5 is greater than 3, the condition is true and "Yes" is printed.'
                    },
                    {
                        question: 'Which loop is best for iterating a specific number of times?',
                        options: ['while loop', 'for loop', 'do-while loop', 'if statement'],
                        correct: 1,
                        explanation: 'For loops are designed for iterating a specific number of times.'
                    },
                    {
                        question: 'What does the break statement do in a loop?',
                        options: [
                            'Skips to the next iteration',
                            'Exits the loop completely',
                            'Restarts the loop',
                            'Causes an error'
                        ],
                        correct: 1,
                        explanation: 'The break statement exits the loop completely.'
                    }
                ]
            },
            'functions': {
                title: 'Functions Quiz',
                questions: [
                    {
                        question: 'What is the purpose of function parameters?',
                        options: [
                            'To return values',
                            'To pass data into the function',
                            'To declare variables',
                            'To end the function'
                        ],
                        correct: 1,
                        explanation: 'Parameters allow you to pass data into a function.'
                    },
                    {
                        question: 'What does the return statement do?',
                        options: [
                            'Prints a value',
                            'Sends a value back to the caller',
                            'Declares a variable',
                            'Starts a loop'
                        ],
                        correct: 1,
                        explanation: 'The return statement sends a value back to wherever the function was called.'
                    },
                    {
                        question: 'Which is the correct arrow function syntax?',
                        options: [
                            'const func = (x) -> x * 2;',
                            'const func = (x) => x * 2;',
                            'const func = (x) = x * 2;',
                            'const func = (x) { return x * 2; }'
                        ],
                        correct: 1,
                        explanation: 'Arrow functions use the => syntax.'
                    }
                ]
            },
            'algorithms': {
                title: 'Basic Algorithms Quiz',
                questions: [
                    {
                        question: 'What is the time complexity of bubble sort?',
                        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
                        correct: 2,
                        explanation: 'Bubble sort has a time complexity of O(n²) due to nested loops.'
                    },
                    {
                        question: 'When is binary search most efficient?',
                        options: [
                            'On unsorted arrays',
                            'On sorted arrays',
                            'On small arrays only',
                            'On string arrays only'
                        ],
                        correct: 1,
                        explanation: 'Binary search requires the array to be sorted to work efficiently.'
                    },
                    {
                        question: 'What does linear search do?',
                        options: [
                            'Sorts the array',
                            'Searches each element one by one',
                            'Divides the array in half',
                            'Removes duplicates'
                        ],
                        correct: 1,
                        explanation: 'Linear search checks each element sequentially until it finds the target.'
                    }
                ]
            }
        };
        
        return quizzes[courseName];
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EducationalWebsite();
});

// Add some CSS for the progress ring gradient
const style = document.createElement('style');
style.textContent = `
    .progress-ring svg {
        overflow: visible;
    }
    .progress-ring defs {
        display: none;
    }
`;
document.head.appendChild(style);

// Add SVG gradient definition for progress ring
const svg = document.querySelector('.progress-ring');
if (svg) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.id = 'progressGradient';
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#667eea');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#764ba2');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
}