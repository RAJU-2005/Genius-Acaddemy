# Genius Academy - Project Outline

## File Structure
```
/mnt/okcomputer/output/
├── index.html              # Landing page (Home)
├── courses.html            # Courses page
├── about.html              # About us page
├── contact.html            # Contact page
├── auth.html               # Authentication (role selection + login/signup)
├── student-dashboard.html  # Student dashboard
├── teacher-dashboard.html  # Teacher dashboard
├── admin-dashboard.html    # Admin dashboard
├── main.js                 # Main JavaScript file with all functionality
└── resources/              # Images and assets folder
    ├── hero-education.png
    ├── feature-*.png
    ├── teacher-*.png
    └── course-*.png
```

## Page Breakdown

### Public Pages
1. **index.html** - Landing page with hero section, features, testimonials, CAT banner
2. **courses.html** - Course catalog with 50+ courses, filtering by class
3. **about.html** - Institute information, mission, teacher profiles
4. **contact.html** - Contact form and institute details
5. **auth.html** - Role selection and authentication flow

### Dashboard Pages
6. **student-dashboard.html** - Complete student portal with 12 sections
7. **teacher-dashboard.html** - Teacher management interface
8. **admin-dashboard.html** - Full administrative control panel

## Key Features Implementation

### Navigation System
- Common navbar across all public pages
- Role-based sidebar navigation for dashboards
- Breadcrumb navigation within dashboards
- Mobile-responsive hamburger menu

### Interactive Components
- Course filtering and search
- Timetable scheduling system
- Quiz and assignment interfaces
- Attendance tracking
- Fee management system
- Performance analytics with charts
- Doubt resolution system
- Notification system

### Data Management
- Local storage for user sessions
- Mock data for courses, students, teachers
- Form validation and error handling
- Success/error notifications
- Modal dialogs for detailed views

## Technical Stack
- Pure HTML5, CSS3, JavaScript (ES6+)
- Tailwind CSS for styling
- Font imports (Raleway, Poppins, Source Sans 3, Montserrat)
- Chart.js for data visualization
- Local storage for state management
- Responsive design with mobile-first approach