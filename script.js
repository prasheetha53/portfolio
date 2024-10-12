document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Function to render projects
    const renderProjects = (projects) => {
        const projectContainer = document.querySelector('#projects .container');
        if (projectContainer) {
            projectContainer.innerHTML = ''; // Clear previous content
            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');
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
            navMenu.classList.toggle('show');
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
});