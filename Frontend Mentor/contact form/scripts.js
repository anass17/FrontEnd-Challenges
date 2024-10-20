let textInputs = document.querySelectorAll('input[type="text"], textarea'),
emailInput = document.querySelector('input[type="email"]'),
contactCheck = document.querySelector('#contact-consent'),
contactSelect = document.querySelectorAll('.form-select input'),
contactSubmit = document.querySelector('.contact-submit');

function verifyInput(item) {
    if (item.value.trim() == "") {
        item.style.borderColor = "#e50000";
        item.nextElementSibling.style.display = "block";
        return false;
    }

    item.style.borderColor = "";
    item.nextElementSibling.style.display = "none";
    return true;
}

function verifyEmail(item) {
    if (item.value.trim().search(/^[a-zA-Z0-9._-]{1,}@[a-z0-9A-Z.]{1,}\.[a-zA-Z]{1,}$/) < 0) {
        item.style.borderColor = "#e50000";
        item.nextElementSibling.style.display = "block";
        return false;
    }

    item.style.borderColor = "";
    item.nextElementSibling.style.display = "none";
    return true;
}

function verifyCheck(item) {
    if (!contactCheck.checked) {
        item.style.borderColor = "#e50000";
        item.nextElementSibling.nextElementSibling.style.display = "block";
        return false;
    }

    item.style.borderColor = "";
    item.nextElementSibling.nextElementSibling.style.display = "none";
    return true;
}

function verifySelect(list) {
    let itemSelected = false;
    list.forEach((item) => {
        if (item.checked) {
            itemSelected = true;
        }
    });

    if (itemSelected == false) {
        list[0].nextElementSibling.nextElementSibling.style.display = "block";
        return false;
    }
    list[0].nextElementSibling.nextElementSibling.style.display = "none";
    return true;
}



contactSubmit.onclick = function (e) {
    let errorsExist = false;
    e.preventDefault();
    textInputs.forEach((item) => {
        verifyInput(item) ? "" : errorsExist = true;
    });
    verifyEmail(emailInput) ? "" : errorsExist = true;
    verifyCheck(contactCheck) ? "" : errorsExist = true;
    verifySelect(contactSelect) ? "" : errorsExist = true;

    if (errorsExist == false) {
        textInputs.forEach((item) => {
            item.value = "";
        });
        emailInput.value = "";
        contactCheck.checked = false;
        contactSelect.forEach((item) => {
            item.checked = false;
        });

        successMessage = document.createElement('div');
        successTitle = document.createElement('h2');
        successContent = document.createElement('p');

        successMessage.className = 'contact-success';
        successTitle.innerHTML = 
        `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFF" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>
        Message Sent!`;
        successContent.textContent = "Thanks for completing the form. We\'ll be in touch soon!";

        successMessage.appendChild(successTitle);
        successMessage.appendChild(successContent);
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.style.opacity = "0";
            successMessage.style.animation = "slide-up .5s ease-in-out backwards";
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 4000);
    }
}

