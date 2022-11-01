const signupFormHandler = async function (event) {
    event.preventDefault();

    const emailEl = document.querySelector("#email-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");
    fetch("/api/users", {
        method: "post",
        body: JSON.stringify({
            email: emailEl.value.trim(),
            password: passwordEl.value.trim()
        }),
        headers: {"Content-Type": "application/json"}
    })
        .then(function (res) {
            if (res.ok) {document.location.replace("/login");}
            else (alert("Password must be only 8 characters."))
        })
        .catch(err => console.log(err));
};

document
    .querySelector("#signup-btn")
    ?.addEventListener("click", signupFormHandler);