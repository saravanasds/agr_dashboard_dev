import { toast } from "react-toastify";

// show password
export function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password-input");
  const eyeIcon = document.querySelector(".eyeIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  }
}

export default function showCustomConfirmationToast(message, onConfirm) {
  const handleConfirm = () => {
    onConfirm(true);
    toast.dismiss();
  };

  const handleCancel = () => {
    onConfirm(false);
    toast.dismiss();
  };

  toast(
    <div className="custom-confirmation-toast">
      <div className="toast-message">{message}</div>
      <button className="toast-confirm-button" onClick={handleConfirm}>
        Confirm
      </button>
      <button className="toast-cancel-button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}

// utils/utils.js

export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns 0-11
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

