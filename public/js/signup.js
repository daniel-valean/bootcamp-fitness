const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const emailEl = document.querySelector("#email-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");
    fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        email: emailEl.value.trim(),
        password: passwordEl.value.trim()
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function(res) {
        if(res.ok)
        {document.location.replace("/dashboard");}
        else(alert("Password must be atleast 8 characters, 1 uppercase, and a symbol."))
      })
      .catch(err => console.log(err));
  };
  
  document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);