# Space Explorer - Educational Website

An interactive educational website about space exploration, featuring information about planets, space missions, and an engaging quiz to test your knowledge.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth scrolling and mobile-friendly menu
- **Planet Information**: Learn about all planets in our solar system
- **Space Missions Timeline**: Explore major milestones in space exploration
- **Interactive Quiz**: Test your knowledge with a 5-question quiz
- **Beautiful Animations**: Shooting stars, floating elements, and smooth transitions
- **Fun Facts Ticker**: Scrolling space facts at the bottom of the page

## How to Run

### Option 1: Using Python (Recommended)
If you have Python installed, navigate to the project directory and run:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 2: Using Node.js
If you have Node.js installed, you can use the `http-server` package:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 3: Direct File Opening
Simply open the `index.html` file directly in your web browser by double-clicking it. Note that some features might not work properly due to CORS restrictions.

### Option 4: Using the included server script
Run the included Python server script:

```bash
python server.py
```

Then open your browser and go to: `http://localhost:8000`

## Project Structure

```
space-education/
├── index.html          # Main HTML file
├── css/
│   └── styles.css     # All styling and animations
├── js/
│   └── main.js        # Interactive functionality and quiz logic
├── README.md          # This file
└── server.py          # Simple Python HTTP server
```

## Technologies Used

- HTML5
- CSS3 (with animations and transitions)
- Vanilla JavaScript
- Google Fonts (Orbitron and Inter)
- CSS Grid and Flexbox for responsive layouts

## Browser Compatibility

This website works on all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Features in Detail

### Quiz System
- 5 questions about space
- Immediate feedback on answers
- Score tracking
- Ability to retake the quiz
- Keyboard navigation support (use number keys 1-4 to select answers)

### Animations
- Shooting stars that appear randomly
- Floating planet animation
- Smooth scroll-triggered animations for cards
- Parallax effect on the hero section
- Hover effects on interactive elements

### Responsive Design
- Mobile menu with hamburger icon
- Responsive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

Enjoy exploring space! 🚀