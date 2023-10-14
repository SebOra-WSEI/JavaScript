const countButton = document.querySelector("#countButton");
const formInputs = document.querySelector("#form-inputs");
const addFieldButton = document.querySelector("#addFieldButton");
const removeFieldButton = document.querySelector("#removeFieldButton");
const sumDiv = document.querySelector("#sumDiv");
const avgDiv = document.querySelector("#avgDiv");
const minDiv = document.querySelector("#minDiv");
const maxDiv = document.querySelector("#maxDiv");

countButton.addEventListener("click", (event) => {
  event.preventDefault();
  mainLogic();
});

addFieldButton.addEventListener("click", () => {
  const div = document.createElement("div");
  const input = document.createElement("input");

  input.type = "text";
  input.style = "margin-bottom: 0.5rem";
  input.oninput = () => mainLogic();

  div.append(input);
  formInputs.appendChild(div);
});

removeFieldButton.addEventListener("click", () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => !input.value && input.remove());
});

const mainLogic = () => {
  const inputs = document.querySelectorAll("input");
  let values = mapValues(inputs);

  sumDiv.innerHTML = `SUM: ${getSum(values)}`;
  avgDiv.innerHTML = `AVG: ${getAverage(values)}`;
  minDiv.innerHTML = `MIN: ${getMin(values)}`;
  maxDiv.innerHTML = `MAX: ${Math.max(...values)}`;
};

const getSum = (inputs) => inputs.reduce((a, b) => a + b);

const getAverage = (inputs) => {
  const arrayWithValues = inputs.filter((val) => val !== 0);
  return arrayWithValues.length ? getSum(inputs) / arrayWithValues.length : 0;
};

const getMin = (inputs) => {
  const values = inputs.filter((val) => val !== 0);
  return values.length ? Math.min(...values) : 0;
};

const mapValues = (inputs) => {
  const values = Array(inputs.length).fill(0);
  inputs.forEach((input, index) => {
    const value = parseInt(input.value);
    if (value) {
      values[index] = value;
    }
  });
  return values;
};
