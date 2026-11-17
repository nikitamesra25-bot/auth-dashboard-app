const createBlogForm = document.getElementById("createBlogForm");
const message = document.getElementById("message");
const createBlogBtn = document.getElementById("createBlogBtn");

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

createBlogForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    try {
        createBlogBtn.disabled = true;
        createBlogBtn.textContent = "Publishing...";

        const response = await fetch(
            "http://localhost:5000/api/blogs",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Blog creation failed");
        }

        message.textContent = "Blog published successfully!";
        message.style.color = "green";

        createBlogForm.reset();

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1200);

    } catch (error) {
        message.textContent = error.message;
        message.style.color = "red";

    } finally {
        createBlogBtn.disabled = false;
        createBlogBtn.textContent = "Publish Blog";
    }
});
