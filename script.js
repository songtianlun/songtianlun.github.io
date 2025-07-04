document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    addScrollAnimations();
    addThemeSupport();
});

async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        
        const projectsGrid = document.getElementById('projectsGrid');
        projectsGrid.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });
        
        // Add staggered animation
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
        showErrorMessage();
    }
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const linksHtml = createLinksHtml(project.links);
    const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${project.name}</h3>
            <span class="project-year">${project.year}</span>
        </div>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
            ${tagsHtml}
        </div>
        <div class="project-links">
            ${linksHtml}
        </div>
    `;
    
    return card;
}

function createLinksHtml(links) {
    const linkLabels = {
        demo: { label: '演示', icon: '🚀' },
        github: { label: 'GitHub', icon: '💻' },
        docs: { label: '文档', icon: '📚' },
        article: { label: '文章', icon: '📝' }
    };
    
    return Object.entries(links).map(([key, url]) => {
        const linkInfo = linkLabels[key] || { label: key, icon: '🔗' };
        return `
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="project-link">
                <span>${linkInfo.icon}</span>
                <span>${linkInfo.label}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3"/>
                </svg>
            </a>
        `;
    }).join('');
}

function showErrorMessage() {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = `
        <div class="error-message">
            <h3>加载项目时出错</h3>
            <p>请稍后重试或查看 <a href="https://github.com/songtianlun" target="_blank">GitHub</a> 了解更多项目信息。</p>
        </div>
    `;
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => observer.observe(card));
}

function addThemeSupport() {
    // Check for system theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    }
    
    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
}

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images if any are added later
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Analytics tracking (if needed)
function trackEvent(eventName, properties = {}) {
    // Add your analytics tracking code here
    console.log('Event tracked:', eventName, properties);
}

// Track project link clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('.project-link')) {
        const link = e.target.closest('.project-link');
        const projectCard = link.closest('.project-card');
        const projectName = projectCard.querySelector('.project-title').textContent;
        const linkType = link.textContent.trim();
        
        trackEvent('project_link_click', {
            project: projectName,
            link_type: linkType,
            url: link.href
        });
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease-out both;
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out both;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .error-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        background: var(--surface);
        border-radius: 16px;
        border: 1px solid var(--border);
    }
    
    .error-message h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    
    .error-message p {
        color: var(--text-secondary);
    }
    
    .error-message a {
        color: var(--primary-color);
        text-decoration: none;
    }
    
    .error-message a:hover {
        text-decoration: underline;
    }
    
    /* Dark theme support */
    .dark-theme {
        --text-primary: #f7fafc;
        --text-secondary: #e2e8f0;
        --text-muted: #a0aec0;
        --background: #1a202c;
        --surface: #2d3748;
        --border: #4a5568;
    }
    
    .dark-theme .hero {
        background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    }
    
    .dark-theme .project-card {
        background: var(--surface);
        border-color: var(--border);
    }
    
    .dark-theme .project-link {
        background: var(--background);
        border-color: var(--border);
        color: var(--text-primary);
    }
    
    .dark-theme .project-link:hover {
        background: var(--primary-color);
        color: white;
    }
`;
document.head.appendChild(style);