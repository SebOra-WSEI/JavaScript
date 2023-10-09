const btn = document.querySelector("button");

btn.addEventListener("click", function (event) {
  event.preventDefault();

  const inputs = document.querySelectorAll("input");
  const displayedValues = document.querySelector("#displayedValues");

  let values = mapValues(inputs);

  createElement(displayedValues, "SUM", getSum(values));
  createElement(displayedValues, "AVG", getAverage(values));
  createElement(displayedValues, "MIN", Math.min(...values));
  createElement(displayedValues, "MAX", Math.max(...values));
});

const getSum = (inputs) => {
  let sum = 0;

  inputs.forEach((input) => (sum += input));

  return sum;
};

const getAverage = (inputs) => getSum(inputs) / inputs.length;

const mapValues = (inputs) => {
  let values = [];
  inputs.forEach((input) => values.push(parseInt(input.value)));
  return values;
};

const createElement = (displayedValues, operation, value) => {
  const element = document.createElement("p");
  element.textContent = `${operation}: ${value}`;
  displayedValues.appendChild(element);
};
