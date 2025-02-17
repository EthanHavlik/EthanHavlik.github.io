//version 2 - 2/16/25:  created file; 
"use strict";

const getElement = selector => document.querySelector(selector); 

//gives error messages if a form element was not filled
const displayErrorMsgs = msgs => {
    // create a new ul element
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
        const form = getElement("form");
        form.insertBefore(ul, getElement("#formTop"));
    } else {
        node.parentNode.replaceChild(ul, node);
    }
};
//checks which error messages should appear, if any
const processEntries = () => {
    const email = getElement("#email_address");
    const phone = getElement("#phone");
    const country = getElement("#country");
    const address = getElement("#address");
    const msgs = [];

    if (email.value === "") {
        msgs.push("Please enter an email address.");
    }
    if (!email.value.includes("@") || !email.value.includes(".")) {
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
        getElement("form").submit();  
    } else {
        displayErrorMsgs(msgs);
    }
};

//clears form entries
const resetForm = () => {
    getElement("form").reset();
    const ul = getElement("ul");
    if (ul !== null) ul.remove();
    getElement("#email_address").focus();
};

document.addEventListener("DOMContentLoaded", () => {
    getElement("#submit").addEventListener("click", processEntries);
    getElement("#resetForm").addEventListener("click", resetForm);  
    getElement("#email_address").focus();
});