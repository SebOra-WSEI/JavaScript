const btn = document.querySelector("button");
const formInputs = document.querySelector("#form-inputs");
const valuesBox = document.querySelector("#valuesBox");

const mainLogic = () => {
  const inputs = document.querySelectorAll("input");
  let values = mapValues(inputs);

  createElement(valuesBox, `SUM: ${getSum(values)}`);
  createElement(valuesBox, `AVG: ${getAverage(values)}`);
  createElement(valuesBox, `MIN: ${Math.min(...values)}`);
  createElement(valuesBox, `MAX: ${Math.max(...values)}`);
  createElement(valuesBox, "------------------");
};

// Add listener for the submit button
btn.addEventListener("click", function (event) {
  event.preventDefault();
  mainLogic();
});

const removeUnusedFields = () => {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input, index) => {
    if (!input.value) {
      formInputs.removeChild(formInputs.children[index]);
    }
  });
};

// Add additional input with provided properties
const addElement = () => {
  const div = document.createElement("div");
  div.style = "margin-top: 0.5rem;";

  const input = document.createElement("input");
  input.type = "text";
  input.oninput = () => mainLogic();

  div.appendChild(input);
  formInputs.append(div);
};

// Required functions
const getSum = (inputs) => {
  let sum = 0;

  inputs.forEach((input) => {
    if (input) {
      sum += input;
    }
  });

  return sum;
};

const getAverage = (inputs) => {
  const arrayWithValues = inputs.filter((val) => val !== 0);
  return arrayWithValues.length ? getSum(inputs) / arrayWithValues.length : 0;
};

// General functions
const mapValues = (inputs) => {
  let values = Array(inputs.length).fill(0);

  inputs.forEach((input, index) => {
    const value = parseInt(input.value);

    if (value) {
      values[index] = value;
    }
  });

  return values;
};

const createElement = (valuesBox, text) => {
  const element = document.createElement("p");
  element.textContent = text;
  valuesBox.appendChild(element);
};
