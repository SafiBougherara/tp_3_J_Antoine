async function checkAuth() {
    try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        return data;
    } catch {
        return { authenticated: false };
    }
}

async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login.html';
}

function updateNav(auth) {
    const nav = document.getElementById('nav');
    const container = document.createElement('div');
    container.className = 'container';

    // Brand
    const brand = document.createElement('a');
    brand.href = '/';
    brand.textContent = 'Mon Blog';
    brand.className = 'brand';
    container.appendChild(brand);

    // Links container
    const links = document.createElement('div');

    if (auth.authenticated) {
        links.innerHTML = `
            <a href="/">Accueil</a>
            <a href="/admin.html">Admin</a>
            <a href="#" onclick="logout()">Déconnexion (${auth.user.username})</a>
        `;
    } else {
        links.innerHTML = `
            <a href="/">Accueil</a>
            <a href="/login.html">Connexion</a>
            <a href="/register.html" class="btn btn-primary" style="color: white; margin-left: 1rem;">Inscription</a>
        `;
    }

    container.appendChild(links);
    nav.innerHTML = '';
    nav.appendChild(container);
}
