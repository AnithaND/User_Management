
const API_URL = "https://your-backend-api.com/users"; // Replace with your API URL

const userForm = document.getElementById("userForm");
const userTableBody = document.querySelector("#userTable tbody");

// Fetch users from the backend
async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    userTableBody.innerHTML = ""; // Clear the table before re-rendering
    users.forEach(user => renderUserRow(user));
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("Failed to fetch users.");
  }
}

// Render a user in the table
function renderUserRow(user) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.dob}</td>
    <td>
      <button class="action-btn update-btn" onclick="editUser('${user.id}')">Edit</button>
      <button class="action-btn delete-btn" onclick="deleteUser('${user.id}')">Delete</button>
    </td>
  `;
  userTableBody.appendChild(row);
}

// Add a new user
userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newUser = {
    name: userForm.name.value,
    email: userForm.email.value,
    dob: userForm.dob.value,
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    fetchUsers(); // Refresh the list
    userForm.reset();
    alert("User added successfully!");
  } catch (error) {
    console.error("Error adding user:", error);
    alert("Failed to add user.");
  }
});

// Edit a user
async function editUser(id) {
  const name = prompt("Enter new name:");
  const email = prompt("Enter new email:");
  const dob = prompt("Enter new date of birth:");

  if (name && email && dob) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, dob }),
      });
      fetchUsers(); // Refresh the list
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  }
}

// Delete a user
async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchUsers(); // Refresh the list
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  }
}

// Fetch users on page load
fetchUsers();
