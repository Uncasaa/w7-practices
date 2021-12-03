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

const inputElement = (type, name, title, req = "") => {
    return `
    <div class="${type}">
        <label>${title}</label>
        <input type="${type}" name="${name}" ${req}>
    </div>
    `;
}

const selectElement = (type, name, title, options) => {
    let optionsToSelect = "";
    for (const o of options) {
        optionsToSelect += `
            <option>
                ${o}
            </option>
        `;
    }

    return `
        <div>
            <label>${title}</label>
            <${type} name="${name}">
                ${optionsToSelect}
            </${type}>
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

/*
const nameData = {
    type: "text",
    name: "firstName",
    label: "Keresztneved"
};
*/

const anotherFormFields = [
    {
        type: "text",
        name: "street",
        label: "Közterület neve"
    },
    {
        type: "number",
        name: "houseNumber",
        label: "Házszám"
    },
    {
        type: "number",
        name: "zipCode",
        label: "Irányítószám"
    },
    {
        type: "text",
        name: "city",
        label: "Település neve"
    }
];


const formFields = [
    {
        type: "text",
        name: "firstName",
        label: "Keresztneved"
    },
    {
        type: "email",
        name: "personalEmail",
        label: "Email címed",
        req: "required"
    },
    {
        type: "file",
        name: "profilePicture",
        label: "Profilképed"
    },
    {
        type: "checkbox",
        name: "newsletter",
        label: "Hírlevet szeretnék kapni"
    },
    {
        type: "checkbox",
        name: "terms",
        label: "Elfogadom a felhasználási feltételeket"
    }
];
/*
const formElement = `
    <form id="form">
        ${inputElement("text", "firstName", "Keresztneved")}
        ${inputElement("email", "personalEmail", "Email címed", "required")}
        ${inputElement("file", "profilePicture", "Profilképed")}
        ${inputElement("checkbox", "newsletter", "Hírlevelet szeretnék kapni")}
        ${inputElement("checkbox", "terms", "Elfogadom a felhasználási feltételeket")}
        ${selectElement("select", "where", "Hol hallottál rólunk?", ["interneten", "ismerőstől", "egyéb"])}
        <button>OK</button>
    </form>
`;
*/

const selectFields = {
    type: "select",
    name: "where",
    label: "Hol hallottál rólunk?",
    options: [
        "interneten", 
        "ismerőstől", 
        "egyéb"]
}

const processCountries = async () =>{
    const countryRes = await fetch("https://restcountries.com/v3.1/all");
    const countryArr = await countryRes.json();

    //console.log(contryArr[0].name.official);
    
    /*
    üres tömböt létrehozni
    for of ciklus countryArrt
    [i].name.official  push
    return
    */

    let countries = [];
    for (const c of countryArr) {
        countries.push(c.name.official)
    //    console.log(c());
    }
    return countries;
}
processCountries();

const anotherSelectFields = async () => {
    return {
        type: "select",
        name: "countries",
        label: "ország?",
        //   options: ["Hollandia", "Serbia" ,"egyéb"]
        options: processCountries()
    }
}

const formElement = (ffs, id, sel) => {
    let inputs = "";
    for (const ff of ffs) {
        inputs += inputElement(ff.type, ff.name, ff.label, ff.req)
    }
    return `
    <form id="${id}">
    ${inputs}
    ${selectElement(sel.select, sel.where, sel.label, sel.options)}
    <button>OK</button>
</form>

    `
}


const formSubmit = (event) => {
    event.preventDefault();

    const et = event.target;
    console.log(et);
    et.classList.add("submitted");

    let selectValue = et.querySelector(`select[name="where"]`).value;
    console.log(selectValue);

}

const inputUpdate = (event) => {
    if (event.target.getAttribute("name") === "firstName") {
        document.getElementById("inputValue").innerHTML = event.target.value;

    }
    if (event.target.getAttribute("name") === "profilePicture") {
        console.log(event.target.files[0]);

        const image = URL.createObjectURL(event.target.files[0]);
        document.getElementById("inputValue").insertAdjacentHTML("beforeend", `
        <img src="${image}>
        `);
        document.getElementById("inputValue").innerHTML = event.target.value;

    }

    console.log(event.target.closest("#form"));
}

async function loadEvent() {
    const root = document.getElementById("root");

    const waitForAnotherSelectFields = await anotherSelectFields();
    root.insertAdjacentHTML("afterbegin", formElement(formFields, "form", selectFields))
    root.insertAdjacentHTML("afterbegin", formElement(anotherFormFields, "form2", waitForAnotherSelectFields));
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