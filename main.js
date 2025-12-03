// Genius Academy - Main JavaScript File
// Interactive functionality for all pages

document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    // Initialize particles for hero section
    if (document.getElementById('particles')) {
        createParticles();
    }

    // Initialize testimonial slider
    if (document.getElementById('testimonial-slider')) {
        initializeTestimonialSlider();
    }

    // Initialize course filtering
    if (document.getElementById('course-filter')) {
        initializeCourseFiltering();
    }

    // Initialize authentication system
    if (document.getElementById('role-selection') || document.getElementById('auth-forms')) {
        initializeAuthSystem();
    }

    // Initialize dashboard functionality
    if (document.getElementById('dashboard-container')) {
        initializeDashboard();
    }

    // Initialize contact form
    if (document.getElementById('contact-form')) {
        initializeContactForm();
    }

    // Initialize scroll animations
    initializeScrollAnimations();

    // Initialize mobile navigation
    initializeMobileNavigation();
}

// Particle System for Hero Section
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size and position
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';

        particlesContainer.appendChild(particle);
    }
}

// Testimonial Slider
function initializeTestimonialSlider() {
    const splide = new Splide('#testimonial-slider', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        breakpoints: {
            1024: { perPage: 2 },
            640: { perPage: 1 }
        }
    });

    splide.mount();
}

// Course Filtering System
function initializeCourseFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    const searchInput = document.getElementById('course-search');

    // Filter by class
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter courses
            courseCards.forEach(card => {
                const cardClass = card.getAttribute('data-class');
                if (filterValue === 'all' || cardClass === filterValue) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 500,
                        easing: 'easeOutQuad'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            courseCards.forEach(card => {
                const courseTitle = card.querySelector('.course-title').textContent.toLowerCase();
                const courseDescription = card.querySelector('.course-description').textContent.toLowerCase();

                if (courseTitle.includes(searchTerm) || courseDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Authentication System
function initializeAuthSystem() {
    const roleCards = document.querySelectorAll('.role-card');
    const authForms = document.querySelectorAll('.auth-form');
    const authTabs = document.querySelectorAll('.auth-tab');

    // Hide all auth forms initially
    authForms.forEach(form => {
        form.style.display = 'none';
    });

    // Role selection
    roleCards.forEach(card => {
        card.addEventListener('click', function () {
            const role = this.getAttribute('data-role');

            // Update active role
            roleCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // Hide role selection section
            document.getElementById('role-selection').style.display = 'none';

            // Show auth forms section
            document.getElementById('auth-forms').style.display = 'block';

            // Show corresponding form
            authForms.forEach(form => {
                form.style.display = form.getAttribute('data-role') === role ? 'block' : 'none';
            });

            // Animate form appearance
            const activeForm = document.querySelector(`[data-role="${role}"]`);
            if (activeForm) {
                anime({
                    targets: activeForm,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            }
        });
    });

    // Login/Signup tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const formType = this.getAttribute('data-form');

            // Update active tab
            const tabs = this.closest('.auth-form').querySelectorAll('.auth-tab');
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding form
            const forms = this.closest('.auth-form').querySelectorAll('.form-section');
            forms.forEach(form => {
                form.style.display = form.getAttribute('data-form') === formType ? 'block' : 'none';
            });
        });
    });

    // Form submission
    const loginForms = document.querySelectorAll('.login-form');
    const signupForms = document.querySelectorAll('.signup-form');

    loginForms.forEach(form => {
        form.addEventListener('submit', handleLogin);
    });

    signupForms.forEach(form => {
        form.addEventListener('submit', handleSignup);
    });
}

function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const role = form.closest('.auth-form').getAttribute('data-role');

    // Get form data
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate login process
    showNotification('Logging in...', 'info');

    setTimeout(() => {
        // Store user session
        const userData = {
            role: role,
            name: role === 'student' ? 'John Doe' : role === 'teacher' ? 'Dr. Rajesh Kumar' : 'Admin User',
            email: email,
            loggedIn: true,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('geniusAcademyUser', JSON.stringify(userData));

        // Show success message
        showNotification('Login successful! Redirecting to dashboard...', 'success');

        // Redirect to dashboard
        setTimeout(() => {
            const dashboardUrl = role === 'admin' ? 'admin-dashboard.html' :
                role === 'teacher' ? 'teacher-dashboard.html' :
                    'student-dashboard.html';
            window.location.href = dashboardUrl;
        }, 1000);
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();
    const form = e.target;
    const role = form.closest('.auth-form').getAttribute('data-role');

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.email || !data.password || !data.firstName || !data.lastName) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Password confirmation check
    if (data.password !== data.confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    // Terms acceptance check
    if (!data.terms) {
        showNotification('Please accept the terms and conditions', 'error');
        return;
    }

    // Simulate signup process
    showNotification('Creating account...', 'info');

    setTimeout(() => {
        showNotification('Account created successfully!', 'success');

        // Switch to login form
        const loginTab = form.closest('.auth-form').querySelector('[data-form="login"]');
        if (loginTab) {
            loginTab.click();
        }

        // Clear the signup form
        form.reset();
    }, 1500);
}

// Dashboard Functionality
function initializeDashboard() {
    const user = JSON.parse(localStorage.getItem('geniusAcademyUser') || '{}');

    if (!user.loggedIn) {
        window.location.href = 'auth.html';
        return;
    }

    // Initialize sidebar navigation
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentSections = document.querySelectorAll('.content-section');

    // Hide all content sections initially except home
    contentSections.forEach(content => {
        if (content.getAttribute('data-section') !== 'home') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });

    sidebarItems.forEach(item => {
        item.addEventListener('click', function () {
            const section = this.getAttribute('data-section');

            // Update active sidebar item
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Update section title
            const sectionTitle = document.getElementById('section-title');
            if (sectionTitle) {
                const titleMap = {
                    'home': 'Dashboard',
                    'timetable': 'Timetable',
                    'courses': 'Courses',
                    'materials': 'Study Materials',
                    'quizzes': 'Quizzes & Exams',
                    'assignments': 'Assignments',
                    'attendance': 'Attendance',
                    'fees': 'Fees',
                    'performance': 'Performance',
                    'doubts': 'Doubts',
                    'profile': 'Profile',
                    'overview': 'Admin Dashboard',
                    'students': 'Student Management',
                    'teachers': 'Teacher Management',
                    'analysis': 'Analytics'
                };
                sectionTitle.textContent = titleMap[section] || 'Dashboard';
            }

            // Show corresponding content section
            contentSections.forEach(content => {
                content.style.display = content.getAttribute('data-section') === section ? 'block' : 'none';
            });

            // Animate content appearance
            const activeContent = document.querySelector(`[data-section="${section}"]`);
            if (activeContent) {
                anime({
                    targets: activeContent,
                    opacity: [0, 1],
                    translateX: [30, 0],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            }

            // Initialize section-specific functionality
            initializeSection(section);
        });
    });

    // Initialize logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('geniusAcademyUser');
            window.location.href = 'index.html';
        });
    }

    // Initialize notification system
    initializeNotifications();
}

function initializeSection(section) {
    switch (section) {
        case 'timetable':
            initializeTimetable();
            break;
        case 'courses':
            initializeCourseContent();
            break;
        case 'materials':
            initializeMaterials();
            break;
        case 'quizzes':
            initializeQuizSystem();
            break;
        case 'assignments':
            initializeAssignmentSystem();
            break;
        case 'attendance':
            initializeAttendance();
            break;
        case 'fees':
            initializeFees();
            break;
        case 'performance':
            initializePerformanceCharts();
            break;
        case 'doubts':
            initializeDoubtSystem();
            break;
        case 'profile':
            initializeProfile();
            break;
        case 'analysis':
            initializeAdminCharts();
            break;
        case 'students':
            initializeStudentManagement();
            break;
        case 'teachers':
            initializeTeacherManagement();
            break;
        case 'timetables':
            initializeTimetable();
            break;
        case 'notifications':
            initializeSystemNotifications();
            break;
        case 'settings':
            initializeSettings();
            break;
        case 'overview':
            initializeAdminCharts();
            break;
    }
}

function initializeCourseContinueButtons() {
    const continueButtons = document.querySelectorAll('.continue-btn');

    continueButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const courseName = this.getAttribute('data-course');

            // Notification alert
            showNotification(`${courseName} has been resumed!`, 'success');

            // Display course info section
            showCourseSection(courseName);

            // Hide dashboard section
            document.getElementById("hs").style.display = 'none';
            document.getElementById("cs").style.display = 'none';


            // Show course display section
            const courseSection = document.getElementById("course-display-section");
            courseSection.classList.remove('hidden');
        });
    });
}

function showCourseSection(courseName) {
    const courseSection = document.getElementById("course-display-section");

    const descriptions = {
        "Advanced Mathematics": "Continue your journey with advanced integration, differentiation, vectors and more.",
        "Physics JEE": "Resume high-level concepts like modern physics, kinematics, dynamics and wave theory.",
        "Chemistry": "Pick up from organic, physical and inorganic concepts including kinetics and equilibrium."
    };

    courseSection.innerHTML = `
        <div class="bg-white p-6 rounded-2xl shadow-lg mb-6 animate-fade-in">
            <h2 class="font-poppins text-2xl font-bold mb-2">${courseName}</h2>
            <p class="font-source-sans text-gray-700 mb-4">${descriptions[courseName]}</p>

            <button id="back-btn" class="mt-3 bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold">
                ← Back to Dashboard
            </button>
        </div>
    `;
}

// Back button listener (delegated because button is dynamic)
document.addEventListener('click', function(e){
    if(e.target.id === 'back-btn') {
        // Hide course section
        document.getElementById('course-display-section').classList.add('hidden');

        // Show dashboard section
        document.getElementById("hs").style.display = 'block';
    }
});

// Initialize continue buttons on page load
initializeCourseContinueButtons();




// Timetable Functionality
function initializeTimetable() {
    const timetableGrid = document.getElementById('timetable-grid');
    if (!timetableGrid) return;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

    // Keep track of current view
    let currentView = 'week'; // default

    function renderTimetable(view) {
        let gridHTML = '<div class="grid gap-2" style="grid-template-columns: repeat(';

        if(view === 'week') gridHTML += '7';
        else gridHTML += '2'; // time + 1 day

        gridHTML += ', 1fr)">';

        // Header row
        gridHTML += '<div class="font-semibold text-center p-2 bg-gray-100">Time</div>';
        const dayList = (view === 'week') ? days : [days[0]]; // Example: show Monday in Day view
        dayList.forEach(day => {
            gridHTML += `<div class="font-semibold text-center p-2 bg-gray-100">${day}</div>`;
        });

        // Time slots and classes
        timeSlots.forEach(time => {
            gridHTML += `<div class="font-semibold text-center p-2 bg-gray-50">${time}</div>`;
            dayList.forEach(day => {
                const hasClass = Math.random() > 0.3; // Random class assignment
                if (hasClass) {
                    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
                    const subject = subjects[Math.floor(Math.random() * subjects.length)];
                    gridHTML += `
                        <div class="timetable-slot bg-royal-blue text-brand-white p-2 rounded text-center cursor-pointer hover:bg-blue-700 transition-colors" 
                             data-subject="${subject}" data-time="${time}" data-day="${day}">
                            <div class="font-semibold text-sm">${subject}</div>
                            <div class="text-xs opacity-90">${time}</div>
                        </div>
                    `;
                } else {
                    gridHTML += '<div class="p-2"></div>';
                }
            });
        });

        gridHTML += '</div>';
        timetableGrid.innerHTML = gridHTML;

        // Add click handlers for timetable slots
        document.querySelectorAll('.timetable-slot').forEach(slot => {
            slot.addEventListener('click', function () {
                const subject = this.getAttribute('data-subject');
                const time = this.getAttribute('data-time');
                const day = this.getAttribute('data-day');

                showModal(`
                    <div class="text-center">
                        <h3 class="text-xl font-bold mb-4">${subject}</h3>
                        <p class="text-gray-600 mb-2">${day} at ${time}</p>
                        <p class="text-gray-600 mb-4">Teacher: Dr. Smith</p>
                        <button onclick="closeModal()" class="btn-primary text-brand-white px-6 py-2 rounded">Close</button>
                    </div>
                `);
            });
        });
    }

    // Initial render
    renderTimetable(currentView);

    // Button click handlers
    const dayBtn = document.querySelector('.content-section[data-section="timetable"] button:nth-child(1)');
    const weekBtn = document.querySelector('.content-section[data-section="timetable"] button:nth-child(2)');

    dayBtn.addEventListener('click', () => {
        currentView = 'day';
        renderTimetable(currentView);
        dayBtn.classList.add('bg-royal-blue', 'text-white');
        dayBtn.classList.remove('bg-gray-200', 'text-gray-700');
        weekBtn.classList.add('bg-gray-200', 'text-gray-700');
        weekBtn.classList.remove('bg-royal-blue', 'text-white');
    });

    weekBtn.addEventListener('click', () => {
        currentView = 'week';
        renderTimetable(currentView);
        weekBtn.classList.add('bg-royal-blue', 'text-white');
        weekBtn.classList.remove('bg-gray-200', 'text-gray-700');
        dayBtn.classList.add('bg-gray-200', 'text-gray-700');
        dayBtn.classList.remove('bg-royal-blue', 'text-white');
    });
}

//study matirial
function initializeMaterials() {
    const materialSection = document.getElementById('ms'); // Materials table section
    const materialViewSection = document.getElementById('material-view-section');
    const materialTitle = document.getElementById('material-title');
    const materialDescription = document.getElementById('material-description');
    const backBtn = document.getElementById('material-back-btn');

    // Get all table rows in the materials section
    const tableRows = materialSection.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
        const title = row.cells[0].innerText;
        const course = row.cells[1].innerText;
        const type = row.cells[2].innerText;
        const uploadedBy = row.cells[3].innerText;

        const [viewBtn, downloadBtn] = row.querySelectorAll('button');

        // VIEW button click
        viewBtn.addEventListener('click', () => {
            // Hide materials table
            materialSection.style.display = 'none';

            // Show material view section
            materialViewSection.classList.remove('hidden');

            // Set material info
            materialTitle.innerText = title;
            materialDescription.innerHTML = `
                <strong>Course:</strong> ${course}<br>
                <strong>Type:</strong> ${type}<br>
                <strong>Uploaded By:</strong> ${uploadedBy}<br>
                <br>
                Content preview goes here...
            `;

            // Notification
            showNotification(`Viewing: ${title}`, 'info');
        });

        // DOWNLOAD button click
        downloadBtn.addEventListener('click', () => {
            showNotification(`File "${title}" downloaded!`, 'success');

            // Optional: actual download link if needed
            // window.location.href = fileURL;
        });
    });

    // BACK button click
    backBtn.addEventListener('click', () => {
        // Hide material view section
        materialViewSection.classList.add('hidden');

        // Show materials table
        materialSection.style.display = 'block';
    });
}

// Initialize after DOM is loaded

    initializeMaterials();




// Quiz System Data
// JavaScript
const quizzes = [
    {
        id: 1,
        title: 'Physics - Chapter 5: Laws of Motion',
        questions: [
            { q: 'Which law states that every action has an equal and opposite reaction?', options: ['Newton\'s 1st Law', 'Newton\'s 2nd Law', 'Newton\'s 3rd Law', 'Law of Inertia'], correct: 2 },
            { q: 'What is the SI unit of Force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 1 },
            { q: 'Inertia depends on?', options: ['Velocity', 'Mass', 'Volume', 'Shape'], correct: 1 },
            { q: 'Rate of change of momentum is directly proportional to?', options: ['Force', 'Velocity', 'Mass', 'Time'], correct: 0 },
            { q: 'A rocket works on the principle of conservation of?', options: ['Energy', 'Mass', 'Linear Momentum', 'Angular Momentum'], correct: 2 }
        ]
    },
    {
        id: 2,
        title: 'Mathematics - Calculus: Derivatives',
        questions: [
            { q: 'Derivative of sin(x) is?', options: ['cos(x)', '-cos(x)', 'tan(x)', '-sin(x)'], correct: 0 },
            { q: 'Derivative of x^n is?', options: ['nx^(n-1)', 'x^(n+1)', 'nx^n', 'n^x'], correct: 0 },
            { q: 'Derivative of log(x) is?', options: ['1/x', 'e^x', 'x', '1'], correct: 0 },
            { q: 'Derivative of a constant is?', options: ['1', '0', 'Infinity', 'Constant itself'], correct: 1 },
            { q: 'd/dx(e^x) = ?', options: ['e^x', 'xe^(x-1)', 'log(x)', '1'], correct: 0 }
        ]
    }
];

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizTimerInterval;
let timeLeft = 15 * 60; // 15 mins

function initQuizList() {
    const quizList = document.getElementById('quiz-list');
    quizzes.forEach(quiz => {
        const div = document.createElement('div');
        div.className = 'p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-50';
        div.innerHTML = `
            <h3 class="font-bold text-lg mb-2">${quiz.title}</h3>
            <p>${quiz.questions.length} Questions • 15 Mins</p>
        `;
        div.onclick = () => startQuiz(quiz.id);
        quizList.appendChild(div);
    });
}

function startQuiz(quizId) {
    currentQuiz = quizzes.find(q => q.id === quizId);
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(null);
    timeLeft = 15 * 60;

    document.getElementById('quiz-modal').classList.remove('hidden');
    renderQuestion();
    startTimer();
}

function renderQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    const quizContent = document.getElementById('quiz-content');
    const progress = Math.round(((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100);

    quizContent.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">${currentQuiz.title}</h3>
            <span class="text-gray-600">Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}</span>
        </div>

        <div class="mb-4">
            <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div class="bg-blue-600 h-2 rounded-full" style="width: ${progress}%"></div>
            </div>
            <h4 class="text-lg font-semibold mb-4">${question.q}</h4>
            <div class="space-y-2">
                ${question.options.map((opt, index) => `
                    <button class="w-full text-left p-3 border rounded hover:bg-gray-50 transition-colors ${userAnswers[currentQuestionIndex] === index ? 'bg-blue-50 border-blue-600' : ''}"
                        onclick="selectAnswer(${index})">${opt}</button>
                `).join('')}
            </div>
        </div>

        <div class="flex justify-between mt-6">
            <button onclick="prevQuestion()" class="px-4 py-2 border rounded ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${currentQuestionIndex === 0 ? 'disabled' : ''}>Previous</button>
            ${currentQuestionIndex === currentQuiz.questions.length - 1
                ? `<button onclick="submitQuiz()" class="px-4 py-2 bg-green-600 text-white rounded">Submit</button>`
                : `<button onclick="nextQuestion()" class="px-4 py-2 bg-blue-600 text-white rounded">Next</button>`}
        </div>

        <div class="mt-4 text-right text-gray-600">Time Left: <span id="modal-timer">${formatTime(timeLeft)}</span></div>
    `;
}

function selectAnswer(index) {
    userAnswers[currentQuestionIndex] = index;
    renderQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function submitQuiz() {
    clearInterval(quizTimerInterval);

    const score = userAnswers.reduce((acc, ans, idx) => {
        if (ans === currentQuiz.questions[idx].correct) return acc + 1;
        return acc;
    }, 0);

    const percentage = Math.round((score / currentQuiz.questions.length) * 100);

    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = `
        <div class="text-center">
            <h3 class="text-2xl font-bold mb-4">Quiz Completed!</h3>
            <div class="text-4xl font-bold text-blue-600 mb-2">${score}/${currentQuiz.questions.length}</div>
            <div class="text-xl text-gray-600 mb-6">${percentage}% Correct</div>
            <button onclick="closeQuizModal()" class="px-6 py-2 bg-blue-600 text-white rounded">Close</button>
        </div>
    `;
}

function closeQuizModal() {
    document.getElementById('quiz-modal').classList.add('hidden');
    clearInterval(quizTimerInterval);
    currentQuiz = null;
    currentQuestionIndex = 0;
    userAnswers = [];
}

function startTimer() {
    clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
        timeLeft--;
        const timerEl = document.getElementById('modal-timer');
        if (timerEl) timerEl.textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(quizTimerInterval);
            submitQuiz();
        }
    }, 1000);
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

document.getElementById('close-quiz-modal').onclick = closeQuizModal;

initQuizList();


// Assignment System
function initializeAssignmentSystem() {
    const assignmentContainer = document.getElementById('assignment-container');
    if (!assignmentContainer) return;

    const assignments = [
        {
            id: 1,
            title: 'Algebra Problems - Set 1',
            course: 'Mathematics',
            dueDate: '2025-12-10',
            status: 'pending',
            description: 'Complete problems 1-20 from Chapter 3'
        },
        {
            id: 2,
            title: 'Physics Lab Report',
            course: 'Physics',
            dueDate: '2025-12-15',
            status: 'submitted',
            description: 'Submit lab report for pendulum experiment'
        }
    ];

    let assignmentsHTML = '<div class="space-y-4">';
    assignments.forEach(assignment => {
        const statusColor = assignment.status === 'pending' ? 'text-strong-red' : 'text-green-600';
        assignmentsHTML += `
            <div class="bg-brand-white p-6 rounded-lg shadow-lg">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-semibold text-lg">${assignment.title}</h3>
                        <p class="text-gray-600">${assignment.course}</p>
                    </div>
                    <span class="${statusColor} font-semibold capitalize">${assignment.status}</span>
                </div>
                <p class="text-gray-700 mb-4">${assignment.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">Due: ${assignment.dueDate}</span>
                    ${assignment.status === 'pending' ? `
                        <button onclick="submitAssignment(${assignment.id})" class="btn-primary text-brand-white px-4 py-2 rounded">Submit</button>
                    ` : `
                        <button onclick="viewAssignment(${assignment.id})" class="btn-secondary text-brand-black px-4 py-2 rounded">View</button>
                    `}
                </div>
            </div>
        `;
    });
    assignmentsHTML += '</div>';

    assignmentContainer.innerHTML = assignmentsHTML;
}

function submitAssignment(assignmentId) {
    showModal(`
        <div class="text-center">
            <h3 class="text-xl font-bold mb-4">Submit Assignment</h3>
            <div class="mb-4">
                <label class="block text-left mb-2">Upload File:</label>
                <input type="file" class="w-full border rounded p-2" accept=".pdf,.doc,.docx">
            </div>
            <div class="mb-6">
                <label class="block text-left mb-2">Comments:</label>
                <textarea class="w-full border rounded p-2" rows="3" placeholder="Add any comments..."></textarea>
            </div>
            <div class="flex gap-4">
                <button onclick="closeModal()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button onclick="confirmSubmit(${assignmentId})" class="flex-1 btn-primary text-brand-white px-4 py-2 rounded">Submit</button>
            </div>
        </div>
    `);
}

function confirmSubmit(assignmentId) {
    showNotification('Assignment submitted successfully!', 'success');
    closeModal();
    // Refresh assignments
    setTimeout(() => initializeAssignmentSystem(), 1000);
}

function viewAssignment(assignmentId) {
    // Find the assignment data
    const assignments = [
        {
            id: 1,
            title: 'Algebra Problems - Set 1',
            course: 'Mathematics',
            dueDate: '2025-12-10',
            status: 'pending',
            description: 'Complete problems 1-20 from Chapter 3'
        },
        {
            id: 2,
            title: 'Physics Lab Report',
            course: 'Physics',
            dueDate: '2025-12-15',
            status: 'submitted',
            description: 'Submit lab report for pendulum experiment',
            marks: 18,
            totalMarks: 20,
            teacher: 'Mr. Ramesh',
            correctedName: 'Pendulum Experiment Report'
        }
    ];

    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    showModal(`
        <div class="text-center">
            <h3 class="text-xl font-bold mb-4">${assignment.title}</h3>
            <p class="text-gray-600 mb-4">${assignment.course} • Due: ${assignment.dueDate}</p>
            <p class="text-gray-700 mb-4">${assignment.description}</p>
            
            ${assignment.status === 'submitted' ? `
                <div class="mb-4 p-4 bg-gray-100 rounded">
                    <p><strong>Marks Obtained:</strong> ${assignment.marks}/${assignment.totalMarks}</p>
                    <p><strong>Teacher Corrected:</strong> ${assignment.teacher}</p>
                    <p><strong>Corrected Name:</strong> ${assignment.correctedName}</p>
                </div>
            ` : ''}

            <button onclick="closeModal()" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded">Close</button>
        </div>
    `);
}


// Performance Charts
function initializePerformanceCharts() {
    const chartContainer = document.getElementById('performance-charts');
    if (!chartContainer) return;

    // Subject Performance Chart
    const subjectChart = echarts.init(document.getElementById('subject-chart'));
    const subjectOption = {
        title: { text: 'Subject-wise Performance', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English']
        },
        yAxis: { type: 'value', max: 100 },
        series: [{
            data: [85, 78, 92, 88, 82],
            type: 'bar',
            itemStyle: { color: '#2563EB' }
        }]
    };
    subjectChart.setOption(subjectOption);

    // Attendance Chart
    const attendanceChart = echarts.init(document.getElementById('attendance-chart'));
    const attendanceOption = {
        title: { text: 'Attendance Trend', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: { type: 'value', max: 100 },
        series: [{
            data: [95, 92, 88, 94, 96, 98],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#FCD34D' }
        }]
    };
    attendanceChart.setOption(attendanceOption);
}

// Admin Charts
function initializeAdminCharts() {
    // Enrollment Chart
    const enrollmentChart = echarts.init(document.getElementById('enrollment-chart'));
    if (enrollmentChart) {
        const enrollmentOption = {
            title: { text: 'Student Enrollment Trends', left: 'center' },
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: { type: 'value' },
            series: [{
                data: [45, 52, 61, 78, 89, 95, 102, 125, 156, 178, 195, 210],
                type: 'line',
                smooth: true,
                itemStyle: { color: '#2563EB' }
            }]
        };
        enrollmentChart.setOption(enrollmentOption);
    }

    // Revenue Chart
    const revenueChart = echarts.init(document.getElementById('revenue-chart'));
    if (revenueChart) {
        const revenueOption = {
            title: { text: 'Monthly Revenue', left: 'center' },
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: { type: 'value' },
            series: [{
                data: [180000, 220000, 250000, 280000, 320000, 290000, 310000, 350000, 380000, 420000, 450000, 480000],
                type: 'bar',
                itemStyle: { color: '#FCD34D' }
            }]
        };
        revenueChart.setOption(revenueOption);
    }
}

// Doubt System
function initializeDoubtSystem() {
    const doubtContainer = document.getElementById('doubt-container');
    if (!doubtContainer) return;

    const doubts = [
        {
            id: 1,
            subject: 'Mathematics',
            teacher: 'Dr. Kumar',
            question: 'How to solve quadratic equations using the quadratic formula?',
            status: 'answered',
            answer: 'The quadratic formula is x = (-b ± √(b²-4ac)) / 2a. Apply this to your equation by identifying a, b, and c coefficients.'
        },
        {
            id: 2,
            subject: 'Physics',
            teacher: 'Dr. Sharma',
            question: 'What is the difference between speed and velocity?',
            status: 'open',
            answer: ''
        }
    ];

    let doubtHTML = '<div class="space-y-6">';

    // Doubt submission form
    doubtHTML += `
        <div class="bg-brand-white p-6 rounded-lg shadow-lg">
            <h3 class="font-semibold text-lg mb-4">Ask a New Doubt</h3>
            <form id="doubt-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select class="border rounded p-2" required>
                        <option value="">Select Subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                    </select>
                    <select class="border rounded p-2" required>
                        <option value="">Select Teacher</option>
                        <option value="Dr. Kumar">Dr. Kumar</option>
                        <option value="Dr. Sharma">Dr. Sharma</option>
                        <option value="Dr. Patel">Dr. Patel</option>
                    </select>
                </div>
                <textarea class="w-full border rounded p-2" rows="4" placeholder="Describe your doubt..." required></textarea>
                <button type="submit" class="btn-primary text-brand-white px-6 py-2 rounded">Submit Doubt</button>
            </form>
        </div>
    `;

    // Existing doubts
    doubts.forEach(doubt => {
        const statusColor = doubt.status === 'answered' ? 'text-green-600' : 'text-strong-red';
        doubtHTML += `
            <div class="bg-brand-white p-6 rounded-lg shadow-lg">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="font-semibold">${doubt.subject} - ${doubt.teacher}</h4>
                        <span class="${statusColor} text-sm capitalize">${doubt.status}</span>
                    </div>
                </div>
                <p class="text-gray-700 mb-4">${doubt.question}</p>
                ${doubt.status === 'answered' ? `
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h5 class="font-semibold text-green-800 mb-2">Teacher's Answer:</h5>
                        <p class="text-green-700">${doubt.answer}</p>
                    </div>
                ` : ''}
            </div>
        `;
    });

    doubtHTML += '</div>';
    doubtContainer.innerHTML = doubtHTML;

    // Handle doubt form submission
    document.getElementById('doubt-form').addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification('Doubt submitted successfully!', 'success');
        this.reset();
    });
}

// Notification System
function initializeNotifications() {
    const notificationBell = document.getElementById('notification-bell');
    const notificationDropdown = document.getElementById('notification-dropdown');

    if (notificationBell && notificationDropdown) {
        notificationBell.addEventListener('click', function () {
            notificationDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!notificationBell.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.add('hidden');
            }
        });
    }
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Privacy policy check
        if (!data.privacy) {
            showNotification('Please accept the privacy policy', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Sending your message...', 'info');

        setTimeout(() => {
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            this.reset();
        }, 2000);
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Mobile Navigation
function initializeMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-brand-white ${type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
            type === 'warning' ? 'bg-yellow-500' : 'bg-royal-blue'
        }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    anime({
        targets: notification,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 300,
        easing: 'easeOutQuad'
    });

    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            opacity: [1, 0],
            translateX: [0, 100],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => notification.remove()
        });
    }, 3000);
}

function showModal(content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
    modal.innerHTML = `
        <div class="bg-brand-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
            ${content}
        </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    anime({
        targets: modal,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    window.closeModal = function () {
        anime({
            targets: modal,
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => modal.remove()
        });
    };
}

// Additional Initialization Functions

function initializeCourseContent() {
    const courseSection = document.querySelector('[data-section="courses"]');
    if (!courseSection) return;

    // Add listeners to 'Open Course' buttons
    const openButtons = courseSection.querySelectorAll('.btn-primary');
    openButtons.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', function () {
            const card = this.closest('.card-hover');
            const courseData = {
                title: card.querySelector('h3').textContent,
                tag: card.querySelector('.bg-bright-yellow').textContent,
                instructor: card.querySelector('p:nth-child(1)').textContent.replace('Teacher: ', ''),
                progress: card.querySelector('.bg-royal-blue').style.width
            };
            openCourseDetail(courseData);
        });
    });

    // Back button listener
    const backBtn = document.getElementById('back-to-courses');
    if (backBtn) {
        backBtn.addEventListener('click', closeCourseDetail);
    }

    // Enroll button listener
    const enrollBtn = document.getElementById('enroll-btn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function () {
            this.textContent = 'Enrolled Successfully';
            this.classList.remove('btn-primary');
            this.classList.add('bg-green-600', 'text-white');
            this.disabled = true;
            showNotification('You have successfully enrolled in this course!', 'success');
        });
    }
}

function openCourseDetail(data) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');

    // Show detail view
    const detailView = document.getElementById('course-detail-view');
    detailView.classList.remove('hidden');

    // Populate data
    document.getElementById('course-detail-title').textContent = data.title;
    document.getElementById('course-detail-tag').textContent = data.tag;
    document.getElementById('course-detail-instructor').textContent = 'By ' + data.instructor;

    // Reset enroll button
    const enrollBtn = document.getElementById('enroll-btn');
    if (enrollBtn) {
        enrollBtn.textContent = 'Enroll Now';
        enrollBtn.classList.add('btn-primary');
        enrollBtn.classList.remove('bg-green-600');
        enrollBtn.disabled = false;
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

function closeCourseDetail() {
    document.getElementById('course-detail-view').classList.add('hidden');
    document.querySelector('[data-section="courses"]').style.display = 'block';
}

function initializeMaterials() {
    const materialSection = document.querySelector('[data-section="materials"]');
    if (!materialSection) return;

    // Handle View/Download/Delete buttons
    const buttons = materialSection.querySelectorAll('button');
    buttons.forEach(btn => {
        const action = btn.textContent.trim();
        if (['View', 'Download', 'Edit', 'Delete'].includes(action)) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', function () {
                if (action === 'Delete') {
                    if (confirm('Are you sure you want to delete this material?')) {
                        showNotification('Material deleted successfully', 'success');
                        this.closest('tr').remove();
                    }
                } else {
                    showNotification(`${action}ing material...`, 'info');
                }
            });
        }
    });

    // Handle Upload Form
    const uploadForm = materialSection.querySelector('form');
    if (uploadForm) {
        const newForm = uploadForm.cloneNode(true);
        uploadForm.parentNode.replaceChild(newForm, uploadForm);

        newForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('Material uploaded successfully!', 'success');
            this.reset();
        });
    }
}

function initializeAttendance() {
    const attendanceSection = document.querySelector('[data-section="attendance"]');
    if (!attendanceSection) return;

    // Handle Save Attendance
    const saveBtn = attendanceSection.querySelector('button.btn-primary');
    if (saveBtn) {
        const newBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newBtn, saveBtn);

        newBtn.addEventListener('click', function () {
            showNotification('Attendance records saved successfully!', 'success');
        });
    }

    // Handle Present/Absent/Late buttons
    const statusButtons = attendanceSection.querySelectorAll('td button');
    statusButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Reset siblings
            const siblings = this.parentNode.querySelectorAll('button');
            siblings.forEach(s => s.classList.remove('ring-2', 'ring-offset-2', 'ring-gray-400'));
            // Highlight selected
            this.classList.add('ring-2', 'ring-offset-2', 'ring-gray-400');
        });
    });
}

function initializeFees() {
    // Placeholder for Fees initialization
    console.log('Fees section initialized');
}

function initializeProfile() {
    const profileSection = document.querySelector('[data-section="profile"]');
    if (!profileSection) return;

    const forms = profileSection.querySelectorAll('form');
    forms.forEach(form => {
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        newForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('Profile updated successfully!', 'success');
        });
    });
}

function initializeStudentManagement() {
    const section = document.querySelector('[data-section="students"]');
    if (!section) return;

    // Add generic listeners for buttons
    const buttons = section.querySelectorAll('button');
    buttons.forEach(btn => {
        const text = btn.textContent.trim();
        if (['View', 'Message'].includes(text)) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', () => showNotification(`${text} student details...`, 'info'));
        }
    });
}

function initializeTeacherManagement() {
    const section = document.querySelector('[data-section="teachers"]');
    if (!section) return;

    const buttons = section.querySelectorAll('button');
    buttons.forEach(btn => {
        const text = btn.textContent.trim();
        if (['View', 'Message', 'Edit', 'Delete'].includes(text)) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', () => showNotification(`${text} teacher details...`, 'info'));
        }
    });
}

function initializeSystemNotifications() {
    const section = document.querySelector('[data-section="notifications"]');
    if (!section) return;

    const form = section.querySelector('form');
    if (form) {
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        newForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('System notification sent successfully!', 'success');
            this.reset();
        });
    }
}

function initializeSettings() {
    const section = document.querySelector('[data-section="settings"]');
    if (!section) return;

    const forms = section.querySelectorAll('form');
    forms.forEach(form => {
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        newForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('Settings saved successfully!', 'success');
        });
    });
}



    // Sample doubts data
   