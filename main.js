import { pexelsApiKey } from './config.js';

class ServiceCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .card-icon {
            font-size: 3rem;
        }

        .card-title {
            font-size: 1.5rem;
            margin: 10px 0;
            color: var(--dark-color);
        }

        .card-description {
            color: var(--secondary-color);
        }
      </style>
      <div class="card">
        <div class="card-icon">${this.getAttribute('icon')}</div>
        <h3 class="card-title">${this.getAttribute('title')}</h3>
        <p class="card-description">${this.getAttribute('description')}</p>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));
  }
}

class ReviewCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .review-card {
            background-color: var(--light-color);
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            text-align: left;
        }

        .review-rating {
            font-size: 1.2rem;
            color: #ffc107;
        }

        .review-comment {
            font-style: italic;
            margin: 10px 0;
        }

        .review-user {
            font-weight: bold;
            text-align: right;
        }
      </style>
      <div class="review-card">
        <div class="review-rating">${'★'.repeat(this.getAttribute('rating'))}</div>
        <p class="review-comment">"${this.getAttribute('comment')}"</p>
        <p class="review-user">- ${this.getAttribute('user')}</p>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));
  }
}

class PartnerLogo extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .partner-logo {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .partner-logo img {
            max-width: 150px;
            max-height: 80px;
            filter: grayscale(100%);
            transition: filter 0.3s;
        }

        .partner-logo img:hover {
            filter: grayscale(0%);
        }
      </style>
      <div class="partner-logo">
        <img src="${this.getAttribute('logo')}" alt="${this.getAttribute('name')}">
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));
  }
}

// Pexels API
const heroImage = document.querySelector('#hero-image');

async function fetchHeroImage() {
    try {
        const response = await fetch('https://api.pexels.com/v1/search?query=medical&per_page=15', {
            headers: {
                Authorization: pexelsApiKey
            }
        });
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.photos.length);
        heroImage.src = data.photos[randomIndex].src.large2x;
    } catch (error) {
        console.error('Error fetching hero image:', error);
        heroImage.src = 'https://via.placeholder.com/1200x600?text=Healthcare+at+your+fingertips'; // Fallback image
    }
}

// Login Modal
const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');
const loginModal = document.querySelector('#login-modal');
const closeBtn = document.querySelector('.close-btn');
const loginForm = document.querySelector('#login-form');

function showLoginModal() {
    loginModal.classList.remove('hidden');
}

function hideLoginModal() {
    loginModal.classList.add('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (email && password) {
        // Mock login - in a real app, you would authenticate with a server
        localStorage.setItem('isLoggedIn', 'true');
        updateLoginState();
        hideLoginModal();
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    updateLoginState();
}

function updateLoginState() {
    if (localStorage.getItem('isLoggedIn')) {
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
}


// Event Listeners
loginBtn.addEventListener('click', showLoginModal);
closeBtn.addEventListener('click', hideLoginModal);
loginForm.addEventListener('submit', handleLogin);
logoutBtn.addEventListener('click', handleLogout);

document.addEventListener('DOMContentLoaded', () => {
    fetchHeroImage();
    updateLoginState();
});


customElements.define('service-card', ServiceCard);
customElements.define('review-card', ReviewCard);
customElements.define('partner-logo', PartnerLogo);
