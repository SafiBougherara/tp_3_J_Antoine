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
    if (auth.authenticated) {
        nav.innerHTML = `
            <a href="/">Accueil</a>
            <a href="/admin.html">Admin</a>
            <a href="#" onclick="logout()">Déconnexion (${auth.user.username})</a>
        `;
    } else {
        nav.innerHTML = `
            <a href="/">Accueil</a>
            <a href="/login.html">Connexion</a>
            <a href="/register.html">Inscription</a>
        `;
    }
}
