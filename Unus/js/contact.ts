//version 2 - 2/16/25:  created file
//version 3 - 3/2/25:  converted JavaScript to TypeScript and transpiled back
//version 4 - 3/9/25:  added regex for email format validation
"use strict";

const getElement = (selector:string) => document.querySelector(selector);

//since this script is tailor made for a specific page, upfront type assertion seems prudent; it avoids constant type checking and enables things like .submit() and .value
const form = getElement("form") as HTMLFormElement;
const email = getElement("#email_address") as HTMLInputElement;
const phone = getElement("#phone") as HTMLInputElement;
const country = getElement("#country") as HTMLInputElement;
const address = getElement("#address") as HTMLInputElement;
const submit = getElement("#submit") as HTMLInputElement;
const reset = getElement("#resetForm") as HTMLInputElement;
let msgs:string[] = [];

//gives error messages if a form element was not filled
const displayErrorMsgs = (msgs:string[]) => {
    const ul = document.createElement("ul");
    ul.classList.add("messages");

    for (let msg of msgs) {
        const li = document.createElement("li");
        const text = document.createTextNode(msg);
        li.appendChild(text);
        ul.appendChild(li);
    }

    const node = getElement("ul");
    if (node == null) {
        form.insertBefore(ul, getElement("#formTop"));
    } else if (node!.parentNode) {
        node!.parentNode.replaceChild(ul, node!);
    }
};
//checks which error messages should appear, if any
const processEntries = () => {
    msgs = [];
    if (email.value === "") {
        msgs.push("Please enter an email address.");
    } else if (!/.@[^\.]/.test(email.value) || !/[^@\.]\.[^\.]/.test(email.value)) {
        msgs.push("Email address is invalid.")
    }
    if (phone.value === "") {
        msgs.push("Please enter a phone number."); 
    }
    if (country.value === "") {
        msgs.push("Please select a country.");
    }
    if (address.value === "") {
        msgs.push("Please enter an address.");
    }

    if (msgs.length === 0) {
        form.submit();  
    } else {
        displayErrorMsgs(msgs);
    }
};

//clears form entries
const resetForm = () => {
    form.reset();
    const ul = getElement("ul");
    if (ul !== null) ul.remove();
    email.focus();
};

document.addEventListener("DOMContentLoaded", () => {
    submit.addEventListener("click", processEntries);
    reset.addEventListener("click", resetForm);  
    email.focus();
});