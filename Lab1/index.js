const btn = document.querySelector("button");

btn.addEventListener("click", function (event) {
  event.preventDefault();
  mainLogic();
});

const mainLogic = () => {
  const inputs = document.querySelectorAll("input");
  const valuesBox = document.querySelector("#valuesBox");
  const displayedValues = document.querySelector("#displayedValues");
  valuesBox.removeChild(displayedValues);

  let values = mapValues(inputs);

  createElement(valuesBox, "SUM", getSum(values));
  createElement(valuesBox, "AVG", getAverage(values));
  createElement(valuesBox, "MIN", Math.min(...values));
  createElement(valuesBox, "MAX", Math.max(...values));
};

const createElement = (valuesBox, operation, value) => {
  const element = document.createElement("p");
  element.textContent = `${operation}: ${value}`;
  valuesBox.appendChild(element);
};

const getSum = (inputs) => {
  let sum = 0;

  inputs.forEach((input) => {
    if (input) {
      sum += input;
    }
  });

  return sum;
};

const getAverage = (inputs) => getSum(inputs) / inputs.length;

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
