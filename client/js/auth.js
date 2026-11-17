const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const message = document.getElementById("message");
        const registerBtn = document.getElementById("registerBtn");

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            registerBtn.disabled = true;
            registerBtn.textContent = "Creating Account...";

            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            message.textContent = "Account created successfully! Please login.";
            message.style.color = "green";
            registerForm.reset();

        } catch (error) {
            message.textContent = error.message;
            message.style.color = "red";
        } finally {
            registerBtn.disabled = false;
            registerBtn.textContent = "Create Account";
        }
    });
}


const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const message = document.getElementById("message");
        const loginBtn = document.getElementById("loginBtn");

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            loginBtn.disabled = true;
            loginBtn.textContent = "Logging in...";

            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            message.textContent = "Login successful!";
            message.style.color = "green";

            window.location.href = "dashboard.html";

        } catch (error) {
            message.textContent = error.message;
            message.style.color = "red";
        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
        }
    });
}
