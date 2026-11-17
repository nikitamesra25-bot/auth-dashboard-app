const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const profileAvatar = document.getElementById("profileAvatar");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

const detailName = document.getElementById("detailName");
const detailEmail = document.getElementById("detailEmail");
const createdAt = document.getElementById("createdAt");

const message = document.getElementById("message");

const editProfileBtn = document.getElementById("editProfileBtn");
const editProfileForm = document.getElementById("editProfileForm");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let currentUser = null;

const fetchProfile = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to fetch profile");
        }

        currentUser = data.user;
        displayProfile(currentUser);

    } catch (error) {
        message.textContent = error.message;
        message.style.color = "red";
    }
};

const displayProfile = (user) => {
    profileAvatar.textContent = user.name.charAt(0).toUpperCase();

    profileName.textContent = user.name;
    profileEmail.textContent = user.email;

    detailName.textContent = user.name;
    detailEmail.textContent = user.email;

    createdAt.textContent = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "Not available";
};

editProfileBtn.addEventListener("click", () => {
    document.getElementById("editName").value = currentUser.name;
    document.getElementById("editEmail").value = currentUser.email;

    editProfileForm.style.display = "block";
    editProfileBtn.style.display = "none";
    message.textContent = "";
});

cancelEditBtn.addEventListener("click", () => {
    editProfileForm.style.display = "none";
    editProfileBtn.style.display = "inline-block";
    message.textContent = "";
});

editProfileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("editName").value.trim();
    const email = document.getElementById("editEmail").value.trim();

    const saveBtn = document.getElementById("saveProfileBtn");

    try {
        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";

        const response = await fetch("http://localhost:5000/api/users/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, email })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Profile update failed");
        }

        currentUser = data.user;
        displayProfile(currentUser);

        message.textContent = "Profile updated successfully!";
        message.style.color = "green";

        editProfileForm.style.display = "none";
        editProfileBtn.style.display = "inline-block";

    } catch (error) {
        message.textContent = error.message;
        message.style.color = "red";

    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = "Save Changes";
    }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
});

if (token) {
    fetchProfile();
}
