//version 1 - 1/31/25:  created file
//version 1.1 - 2/2/25:  added "under construction" alert
//version 2 - 2/16/25:  removed alert; added controllers carousel functionality
//version 3 - 3/2/25:  converted JavaScript to TypeScript and transpiled back
"use strict";

const sources = ["images/classic.png", "images/byteSized.png", "images/buzzer.png", "images/singleAction.png", "images/righty.png", "images/lefty.png"];
const alts = ["Classic controller", "Byte Sized controller", "Buzzer controller", "Single Action controller", "Righty controller", "Lefty controller"];
const ctrlrNames = ["Classic", "Byte Sized", "Buzzer", "Single Action", "Righty", "Lefty"];
const ctrlrDescs = [
    "The standard Unus controller has a round frame with a big button on top. It works well for any Unus game. The wired version is $8.99, and wireless is $9.99.",
    "This is a smaller version of the standard controller. It is perfect for children old enough not to swallow things. It is only available in wireless at $9.49.",
    "This tall, thin controller with a button on top is perfect for games that test your reaction time. Wired is $8.99, and wireless is $9.99.",
    "This controller is modeled after the grip of a pistol with a trigger instead of a button. It has a switch that adds resistance to the first half of the trigger pull, adding a satisfying click when the trigger is fully pulled. It is only available in wired at $14.99.",
    "This resembles the right half of a standard console controller and has a comfortable grip. Wired is $9.99, and wireless is $10.99.",
    "This resembles the left half of a controller. Dual wield this with Righty to play against yourself. Wired is $9.99, and wireless is $10.99."
];

const getElement = (selector:string) => document.querySelector(selector);
const getElements = (selector:string) => document.querySelectorAll(selector);

document.addEventListener("DOMContentLoaded", () => {
    const images = getElements("#carousel div img") as NodeListOf<HTMLImageElement>;
    const names = getElements("#carousel div h3");
    const descriptions = getElements("#carousel div p");
    const nextButton = getElement("#next");
    const prevButton = getElement("#previous");
    let unseen = "";

    if (nextButton !== null) {
        nextButton.addEventListener("click", evt => {
            let undfCheck = sources.shift();
            if (typeof undfCheck == "string") unseen = undfCheck;
            sources.push(unseen);
            undfCheck = alts.shift();
            if (typeof undfCheck == "string") unseen = undfCheck;
            alts.push(unseen);
            undfCheck = ctrlrNames.shift();
            if (typeof undfCheck == "string") unseen = undfCheck;
            ctrlrNames.push(unseen);
            undfCheck = ctrlrDescs.shift();
            if (typeof undfCheck == "string") unseen = undfCheck;
            ctrlrDescs.push(unseen);
            
            images[0].src = sources[0];
            images[1].src = sources[1];
            images[2].src = sources[2];
            images[0].alt = alts[0];
            images[1].alt = alts[1];
            images[2].alt = alts[2];
            names[0].textContent = ctrlrNames[0];
            names[1].textContent = ctrlrNames[1];
            names[2].textContent = ctrlrNames[2];
            descriptions[0].textContent = ctrlrDescs[0];
            descriptions[1].textContent = ctrlrDescs[1];
            descriptions[2].textContent = ctrlrDescs[2];
        });
    }

    if (prevButton !== null) {
        prevButton.addEventListener("click", evt => {
            let undfCheck = sources.pop();
            if (typeof undfCheck == "string") unseen = undfCheck;
            sources.unshift(unseen);
            undfCheck = alts.pop();
            if (typeof undfCheck == "string") unseen = undfCheck;
            alts.unshift(unseen);
            undfCheck = ctrlrNames.pop();
            if (typeof undfCheck == "string") unseen = undfCheck;
            ctrlrNames.unshift(unseen);
            undfCheck = ctrlrDescs.pop();
            if (typeof undfCheck == "string") unseen = undfCheck;
            ctrlrDescs.unshift(unseen);
            
            images[0].src = sources[0];
            images[1].src = sources[1];
            images[2].src = sources[2];
            images[0].alt = alts[0];
            images[1].alt = alts[1];
            images[2].alt = alts[2];
            names[0].textContent = ctrlrNames[0];
            names[1].textContent = ctrlrNames[1];
            names[2].textContent = ctrlrNames[2];
            descriptions[0].textContent = ctrlrDescs[0];
            descriptions[1].textContent = ctrlrDescs[1];
            descriptions[2].textContent = ctrlrDescs[2];
        });
    }
});