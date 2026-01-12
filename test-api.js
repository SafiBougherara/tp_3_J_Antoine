const http = require('http');

function request(path, method = 'GET', body = null, token = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (token) {
            options.headers['Cookie'] = `token=${token}`;
        }

        const req = http.request(options, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(data), headers: res.headers });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data, headers: res.headers });
                }
            });
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runTests() {
    console.log('--- Starting Tests ---');

    console.log('1. Register User');
    const register = await request('/api/auth/register', 'POST', {
        username: 'testuser_' + Date.now(), // Unique
        email: 'test' + Date.now() + '@example.com',
        password: 'password123'
    });
    console.log('Register:', register.status, register.body);

    console.log('2. Login User');
    const login = await request('/api/auth/login', 'POST', {
        email: register.body.message === 'User created' ? 'test' + Date.now() + '@example.com' : 'test@example.com', // Actually need to reuse the email/pass just created.
        // Let's fix this logic to be simpler
    });

    // Retry with known dummy for stable test or better variable scope
    // Actually, let's just use fixed creds for test script and handle cleanup or ignore errors if exists

    // Re-do strict flow
}

async function main() {
    const unique = Date.now();
    const email = `test${unique}@example.com`;
    const password = 'password123';

    console.log('--- Starting Tests ---');

    // 1. Register
    console.log(`\n[1] Registering user ${email}...`);
    const reg = await request('/api/auth/register', 'POST', { username: `user${unique}`, email, password });
    console.log(`Status: ${reg.status}, Body:`, reg.body);

    // 2. Login
    console.log(`\n[2] Logging in...`);
    const login = await request('/api/auth/login', 'POST', { email, password });
    console.log(`Status: ${login.status}, Body:`, login.body);

    let token = null;
    if (login.headers['set-cookie']) {
        const cookie = login.headers['set-cookie'][0];
        token = cookie.split(';')[0].split('=')[1];
        console.log(`Token received: ${token.substring(0, 10)}...`);
    } else {
        console.error('No token received!');
        return;
    }

    // 3. Create Article
    console.log(`\n[3] Creating article...`);
    const art = await request('/api/articles', 'POST', { title: 'Test API', content: 'Content from test script.' }, token);
    console.log(`Status: ${art.status}, Body:`, art.body);

    // 4. Get Articles
    console.log(`\n[4] Fetching all articles...`);
    const list = await request('/api/articles');
    console.log(`Status: ${list.status}, Count: ${Array.isArray(list.body) ? list.body.length : 0}`);

    console.log('\n--- Tests Finished ---');
}

// Check if server is running? No, we assume user or I ran it. 
// Actually I will run the server in background then run this script.
setTimeout(main, 1000);
