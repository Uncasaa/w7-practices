/* 
function functionName(parameter) {

    parameter === "Argument as a string"
}
functionName("Argument as a string");

const argument = "Argument saved in a variable";
const functionName = function (parameter) {

    parameter === "Argument saved in a variable"
};

functionName(argument);

const functionName = (parameter1, parameter2) => {

    parameter1 === 1;    
    parameter2 === 2;
};

functionName(1,2);

*/

const inputElement = (type,name, title) =>{
    return `
    <div>
        
        <label>${title}</label><br><br>
        <input type="${type}" name="${name}">
    </div>
    `;
}

/*
const formElement = "<form>" + inputElement("text", "firstName") +         inputElement("file", "profilePicture")
+         inputElement("email", "personalEmail")
+         inputElement("radio", "newsletter")
+         inputElement("checkbox", "terms")
+ "</form>"
*/ 

//const test = "valami" "valami2"

const formElement = `
    <form id="form">
        ${inputElement("text","firstName", "Keresztneved")}
        ${inputElement("file", "profilePicture", "Profilképed")}
        ${inputElement("email", "personalEmail", "Email címed")}
        ${inputElement("radio", "newsletter", "Hírlevelet szeretnék kapni")}
        ${inputElement("checkbox", "terms", "Elfogadom a felhasználási feltételeket")}
        <button>OK</button>
    </form>
`;

const formSubmit = (event) =>{
    event.preventDefault();
    console.log(event.target);
    event.target.classList.add("submitted");
}

const inputUpdate = (event) =>{
    document.getElementById("inputValue").innerHTML = event.target.value;
}

function loadEvent() {
    const root = document.getElementById("root");
    root.insertAdjacentHTML("afterbegin", formElement)
    root.insertAdjacentHTML("afterbegin", `
        <div id="inputValue"></div>
    `);

    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit)
    
    const inputList = form.querySelectorAll("input");

    for (const input of inputList) {
        input.addEventListener("input", inputUpdate)
    }
}

window.addEventListener("load", loadEvent);