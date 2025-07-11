# CodeAcademy Mini - Educational Website

A comprehensive mini educational website focused on teaching programming fundamentals through interactive lessons and quizzes.

## 🚀 Features

- **Interactive Lessons**: Learn programming concepts through hands-on, step-by-step tutorials
- **Multiple Courses**: Four comprehensive courses covering:
  - Variables & Data Types
  - Control Flow (if/else, loops)
  - Functions
  - Basic Algorithms
- **Interactive Quizzes**: Test your knowledge with multiple-choice questions and instant feedback
- **Progress Tracking**: Monitor your learning progress with visual indicators
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful, clean interface with smooth animations
- **Local Storage**: Progress is saved automatically in your browser

## 🎯 Course Content

### 1. Variables & Data Types
- Introduction to variables and data storage
- Working with strings, numbers, and booleans
- Data type operations and manipulations

### 2. Control Flow
- Conditional statements (if/else)
- Comparison operators
- Loops (for, while) and loop control

### 3. Functions
- Creating and calling functions
- Function parameters and return values
- Arrow functions and function scope

### 4. Basic Algorithms
- Sorting algorithms (bubble sort)
- Search algorithms (linear and binary search)
- Algorithm complexity basics

## 🛠️ How to Run

### Option 1: Simple HTTP Server (Recommended)
```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have it installed)
npx http-server -p 8000
```

Then open your browser and navigate to `http://localhost:8000`

### Option 2: Direct File Access
Simply open `index.html` in your web browser by double-clicking the file or dragging it into your browser window.

## 📱 How to Use

1. **Home Page**: Start with the welcome page that introduces the platform
2. **Navigation**: Use the top navigation to switch between:
   - Home: Welcome page and features overview
   - Courses: Browse and start learning courses
   - Progress: Track your learning journey

3. **Taking Courses**:
   - Click "Start Course" on any course card
   - Navigate through lessons using Previous/Next buttons
   - Complete all lessons to unlock the quiz

4. **Quizzes**:
   - Answer multiple-choice questions
   - Get instant feedback on your answers
   - Complete quizzes to mark courses as finished

5. **Progress Tracking**:
   - View overall progress with a circular progress indicator
   - See individual course completion percentages
   - Track lessons completed and quizzes passed

## 🎨 Design Features

- **Modern Gradient Design**: Beautiful color schemes with purple/blue gradients
- **Responsive Layout**: Adapts to all screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Modal Windows**: Lessons and quizzes open in elegant modal dialogs
- **Progress Visualization**: Visual progress bars and circular indicators
- **Clean Typography**: Uses Inter font for excellent readability

## 🔧 Technical Stack

- **HTML5**: Semantic markup with modern structure
- **CSS3**: Advanced styling with Flexbox, Grid, and animations
- **Vanilla JavaScript**: No external libraries - pure ES6+ JavaScript
- **Local Storage**: Client-side data persistence
- **Font Awesome**: Beautiful icons throughout the interface
- **Google Fonts**: Professional typography

## 📊 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learning Path

1. Start with **Variables & Data Types** to understand basic programming concepts
2. Move to **Control Flow** to learn decision-making and repetition
3. Continue with **Functions** to understand code organization
4. Finish with **Basic Algorithms** to learn problem-solving techniques

## 🔄 Progress System

- **Lesson Progress**: Track completion of individual lessons
- **Quiz Progress**: Monitor quiz performance
- **Course Completion**: Visual indicators for finished courses
- **Overall Progress**: Circular progress showing total completion
- **Streak Counter**: Daily learning streak tracking

## 🎯 Educational Goals

This website is designed to help beginners:
- Understand fundamental programming concepts
- Practice with interactive examples
- Test knowledge with quizzes
- Build confidence in coding
- Prepare for more advanced programming topics

## 🚀 Getting Started

1. Clone or download this repository
2. Run a local server (see "How to Run" section)
3. Open your browser to `http://localhost:8000`
4. Click "Start Learning Now" to begin your journey!

## 📝 Notes

- All progress is saved locally in your browser
- No internet connection required after initial load
- Works completely offline
- Reset progress by clearing browser data if needed

## 📂 Additional Project – EduMini

In addition to **CodeAcademy Mini**, this repository now also includes a super-lightweight static variant called **EduMini**.  You can find the source in the `edumini/` directory:

```bash
edumini/
├── index.html   # main page
├── styles.css   # styling
└── script.js    # small helper script
```

EduMini demonstrates how the same educational content can be delivered with **just three files** (HTML, CSS and JS) and **no build step**.  Open `edumini/index.html` directly in your browser or serve the folder with any static server:

```bash
python3 -m http.server -d edumini 8080
```

Then visit `http://localhost:8080`.

---

**Happy Learning!** 🎉 Start your programming journey today with CodeAcademy Mini!