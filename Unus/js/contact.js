//version 2 - 2/16/25:  created file;
//version 3 - 3/2/25:  converted JavaScript to TypeScript and transpiled back
"use strict";
const getElement = (selector) => document.querySelector(selector);
//since this script is tailor made for a specific page, upfront type assertion seems prudent; it avoids constant type checking and enables things like .submit() and .value
const form = getElement("form");
const email = getElement("#email_address");
const phone = getElement("#phone");
const country = getElement("#country");
const address = getElement("#address");
const submit = getElement("#submit");
const reset = getElement("#resetForm");
const msgs = [];
//gives error messages if a form element was not filled
const displayErrorMsgs = (msgs) => {
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
    }
    else if (node.parentNode) {
        node.parentNode.replaceChild(ul, node);
    }
};
//checks which error messages should appear, if any
const processEntries = () => {
    if (email.value === "") {
        msgs.push("Please enter an email address.");
    }
    else if (!email.value.includes("@") || !email.value.includes(".")) {
        msgs.push("Email address is invalid.");
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
    }
    else {
        displayErrorMsgs(msgs);
    }
};
//clears form entries
const resetForm = () => {
    form.reset();
    const ul = getElement("ul");
    if (ul !== null)
        ul.remove();
    email.focus();
};
document.addEventListener("DOMContentLoaded", () => {
    submit.addEventListener("click", processEntries);
    reset.addEventListener("click", resetForm);
    email.focus();
});
