// ============================================
// MENSAJES TEMPORALES
// ============================================

export const showMessage = (message) => {
    const alertBox = document.createElement("div");

    alertBox.classList.add("message-card");
    alertBox.style.borderLeft = "4px solid #10b981";

    alertBox.innerHTML = `
        <div class="message-card__content">
            ✅ ${message}
        </div>
    `;

    document.body.appendChild(alertBox);

    alertBox.style.position = "fixed";
    alertBox.style.top = "20px";
    alertBox.style.right = "20px";
    alertBox.style.width = "300px";
    alertBox.style.zIndex = "999";
    alertBox.style.background = "white";

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
};

export const showErrorMessage = (message) => {
    const alertBox = document.createElement("div");

    alertBox.classList.add("message-card");
    alertBox.style.borderLeft = "4px solid #ef4444";

    alertBox.innerHTML = `
        <div class="message-card__content">
            ❌ ${message}
        </div>
    `;

    document.body.appendChild(alertBox);

    alertBox.style.position = "fixed";
    alertBox.style.top = "20px";
    alertBox.style.right = "20px";
    alertBox.style.width = "300px";
    alertBox.style.zIndex = "999";
    alertBox.style.background = "white";

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
};
