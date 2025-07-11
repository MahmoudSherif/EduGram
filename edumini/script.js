// Populate current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Course Data (could be fetched from API in real app)
const courses = [
  {
    title: 'Introduction to HTML',
    description: 'Learn the basic structure of web pages using HTML5.',
    level: 'Beginner',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
  },
  {
    title: 'CSS Fundamentals',
    description: 'Style your websites with cascaded style sheets and modern layout techniques.',
    level: 'Beginner',
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
  },
  {
    title: 'JavaScript Basics',
    description: 'Add interactivity to your sites by understanding the fundamentals of JavaScript.',
    level: 'Beginner',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    title: 'Responsive Web Design',
    description: 'Create sites that look great on any screen size using responsive design principles.',
    level: 'Intermediate',
    link: 'https://web.dev/learn/design/'
  },
  {
    title: 'Git & GitHub Essentials',
    description: 'Version control your projects and collaborate using Git & GitHub.',
    level: 'Beginner',
    link: 'https://docs.github.com/en/get-started/quickstart'
  }
];

function renderCourses() {
  const container = document.getElementById('course-container');
  if (!container) return;

  courses.forEach(({ title, description, level, link }) => {
    const card = document.createElement('div');
    card.className = 'course-card';

    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = level;

    const h3 = document.createElement('h3');
    h3.className = 'course-title';
    h3.textContent = title;

    const p = document.createElement('p');
    p.className = 'course-desc';
    p.textContent = description;

    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = 'Start Learning →';

    card.appendChild(badge);
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(a);

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderCourses);