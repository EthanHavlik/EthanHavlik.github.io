"use strict";
const getElement = (selector) => document.querySelector(selector);

const form = getElement("form");
const email = getElement("#email_address");
const phone = getElement("#phone");
const submit = getElement("#submit");
const reset = getElement("#resetForm");
let msgs = [];

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

const processEntries = () => {
    msgs = [];
    if (email.value === "") {
        msgs.push("Please enter an email address.");
    }
    else if (!/.@[^\.]/.test(email.value) || !/[^@\.]\.[^\.]/.test(email.value)) {
        msgs.push("Email address is invalid.");
    }
    if (phone.value === "") {
        msgs.push("Please enter a phone number.");
    }
    if (msgs.length === 0) {
        form.submit();
        msgs.push("Form submitted.");
        displayErrorMsgs(msgs);
    }
    else {
        displayErrorMsgs(msgs);
    }
};

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
});
