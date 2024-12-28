import { Toast } from "bootstrap";

export function showToast(message, type = "info") {
    const toastElement = document.getElementById("toast");
    const toastBody = toastElement.querySelector(".toast-body");



    toastBody.textContent = message;

    // Set the toast color based on alert type
    const toastHeader = toastElement.querySelector(".toast-header");
    if (type === "success") {
        toastHeader.classList.add("bg-success");
        toastHeader.classList.remove("bg-danger", "bg-warning");
    } else if (type === "error") {
        toastHeader.classList.add("bg-danger");
        toastHeader.classList.remove("bg-success", "bg-warning");
    } else {
        toastHeader.classList.add("bg-warning");
        toastHeader.classList.remove("bg-danger", "bg-success");
    }

    // Show the toast using Bootstrap's Toast API
    const toast = new Toast(toastElement, {
        delay: 2000,
    });
    toast.show();
}
