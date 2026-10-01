document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const messageDiv = document.getElementById("message");

    fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, surname: surname })
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error("Ошибка сети");
    })
    .then(data => {
        console.log("Ответ сервера:", data);
        messageDiv.style.color = "green";
        messageDiv.innerText = "Успешно сохранено! ID: " + data.id;
        document.getElementById("userForm").reset();
    })
    .catch(error => {
        console.error("Ошибка:", error);
        messageDiv.style.color = "red";
        messageDiv.innerText = "Ошибка при отправке";
    });
});
