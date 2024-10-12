document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Function to render projects
    const renderProjects = (projects) => {
        const projectContainer = document.querySelector('#projects .container');
        if (projectContainer) {
            projectContainer.innerHTML = ''; // Clear previous content
            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project', 'glow-effect', 'hover-glow');
                projectElement.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                `;
                projectContainer.appendChild(projectElement);
            });
        } else {
            console.error('Project container not found');
        }
    };

    // Fetch projects from backend
    fetch('/projects')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(projects => {
            console.log('Projects fetched successfully:', projects);
            renderProjects(projects);
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            // Handle error (e.g., display a message to the user)
        });

    // Toggle menu for smaller screens
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            console.log('Menu toggle clicked');
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('show');
            }
        });

        // Close menu when a nav item is clicked
        navMenu.querySelectorAll('a').forEach(navItem => {
            navItem.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('show');
            });
        });
    } else {
        console.error('Menu toggle or nav menu not found');
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add futuristic hover effect to all elements with 'hover-glow' class
    const hoverGlowElements = document.querySelectorAll('.hover-glow');
    hoverGlowElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.textShadow = '0 0 10px #66FCF1, 0 0 20px #66FCF1, 0 0 30px #66FCF1';
        });
        element.addEventListener('mouseout', () => {
            element.style.textShadow = 'none';
        });
    });
});
