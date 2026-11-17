const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const welcomeMessage = document.getElementById("welcomeMessage");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const blogsContainer = document.getElementById("blogsContainer");


const fetchProfile = async () => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/users/profile",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to fetch profile");
        }

        userName.textContent = data.user.name;
        userEmail.textContent = data.user.email;
        welcomeMessage.textContent = `Welcome, ${data.user.name}!`;

    } catch (error) {
        console.error("Profile Error:", error.message);
    }
};


const fetchBlogs = async () => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/blogs/my-blogs",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to fetch blogs");
        }

        blogsContainer.innerHTML = "";

        if (!data.blogs || data.blogs.length === 0) {
            blogsContainer.textContent = "You have not created any blogs yet.";
            return;
        }

        data.blogs.forEach((blog) => {
            const blogCard = document.createElement("div");
            blogCard.className = "blog-card";

            const title = document.createElement("h3");
            title.textContent = blog.title;

            const content = document.createElement("p");
            content.textContent = blog.content;

            const date = document.createElement("small");
            date.textContent = new Date(blog.createdAt).toLocaleDateString();

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => {
                editBlog(blog._id, blog.title, blog.content);
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                deleteBlog(blog._id);
            });

            const actions = document.createElement("div");
            actions.className = "blog-actions";
            actions.append(editBtn, deleteBtn);

            blogCard.append(title, content, date, actions);
            blogsContainer.appendChild(blogCard);
        });

    } catch (error) {
        blogsContainer.textContent = error.message;
        console.error("Blogs Error:", error);
    }
};

const editBlog = async (id, oldTitle, oldContent) => {
    const title = prompt("Enter updated blog title:", oldTitle);

    if (title === null) return;

    const content = prompt("Enter updated blog content:", oldContent);

    if (content === null) return;

    if (!title.trim() || !content.trim()) {
        alert("Title and content cannot be empty.");
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:5000/api/blogs/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim()
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Blog update failed");
        }

        alert("Blog updated successfully!");
        fetchBlogs();

    } catch (error) {
        alert(error.message);
    }
};


const deleteBlog = async (id) => {
    const confirmDelete = confirm(
        "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
        const response = await fetch(
            `http://localhost:5000/api/blogs/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Blog deletion failed");
        }

        alert("Blog deleted successfully!");
        fetchBlogs();

    } catch (error) {
        alert(error.message);
    }
};


const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
});


const createBlogBtn = document.getElementById("createBlogBtn");

createBlogBtn.addEventListener("click", () => {
    window.location.href = "create-blog.html";
});


if (token) {
    fetchProfile();
    fetchBlogs();
}
