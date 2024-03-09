import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import accounts from "./accounts.json" assert { type: 'json' }

// DOM ELEMENTS
const accountsContainer = document.getElementById("account-balances");
const spendingContainer = document.getElementById("spending");

// GLOBAL VARIABLES
let currentAccountIndex = 1;

// HELPERS
// return the account data for a given index
function getAccountObject(index) {
  for (const account of accounts) {
    if (account.id == index) return account;
  }
}

// sort an array of spending entries by amount
function sortSpendingEntries(s1, s2) {
  const a = parseFloat(s1.spent);
  const b = parseFloat(s2.spent);

  if (a > b) return -1;
  else if (a < b) return 1;
  else return 0;
}

// SPENDINGS BAR CHART
function displayBarGraph() {
  // clear the bar graph container
  spendingContainer.innerHTML = "";

  // retrieve the account data and keep the 5 biggest spendings
  const accountObject = getAccountObject(currentAccountIndex);
  let entries = accountObject.spendings.toSorted(sortSpendingEntries).slice(0,5);

  // set the dimensions of the SVG canvas
  const width = spendingContainer.clientWidth;
  const barHeight = 65;
  const height = entries.length * barHeight;

  // create the scales
  const x = d3.scaleLinear()
      .domain([0, d3.max(entries, d => parseFloat(d.spent))])
      .range([180, width]);
  
  const y = d3.scaleBand()
      .domain(d3.sort(entries, d => -parseFloat(d.spent)).map(d => d.category))
      .rangeRound([0, height])
      .paddingInner(0.3);

  // create the SVG container and append to DOM container.
  const svg = d3.select("#spending")
                .append("svg")
                .attr("height", height)
                .attr("width", width)
                .classed("svg-container", true);
  
  // Append a rect for each letter.
  svg.append("g")
      .attr("fill", "var(--orange)")
    .selectAll()
    .data(entries)
    .join("rect")
      .attr("x", 0)
      .attr("y", (d) => y(d.category))
      .attr("width", (d) => x(parseFloat(d.spent)))
      .attr("height", y.bandwidth())
      .attr("rx", 15);

  // Create a value format.
  const format = x.tickFormat();

  // Append a label for each letter.
  svg.append("g")
      .attr("fill", "black")
      .attr("text-anchor", "end")
    .selectAll()
    .data(entries)
    .join("text")
      .attr("x", (d) => x(parseFloat(d.spent)))
      .attr("y", (d) => y(d.category) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -10)
      .text((d) => "$" + format(d.spent));

  // Append a label for each letter.
  svg.append("g")
      .attr("fill", "black")
      .attr("text-anchor", "start")
    .selectAll()
    .data(entries)
    .join("text")
      .attr("x", 0)
      .attr("y", (d) => y(d.category) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", 10)
      // .text((d) => "$" + format(d.spent));
      .text((d) => d.category)
}

function displayAccountSpending() {
  // retieve the data for the target account
  currentAccountIndex = parseInt(this.getAttribute("data-index"));
  displayBarGraph();
}

// ACCOUNT BALANCES DISPLAY
function accountBalance(accountObject) {
  // create the container for the account balance display
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("account-total", "border-box");
  sectionEl.setAttribute("data-index", accountObject["id"]);

  // display the account name in the container
  const nameEl = document.createElement("p");
  nameEl.classList.add("no-margin", "account-name", "black-border");
  nameEl.innerText = accountObject["title"];
  sectionEl.appendChild(nameEl);

  // display the account balance in the container
  const balanceEl = document.createElement("p");
  balanceEl.classList.add("no-margin", "account-amount", "black-border");
  balanceEl.innerText = parseFloat(accountObject["balance"]).toLocaleString();
  sectionEl.appendChild(balanceEl);

  sectionEl.addEventListener("click", displayAccountSpending);

  return sectionEl;
}

// DOCUMENT EVENTS CALLBACKS
window.addEventListener("resize", () => {
  displayBarGraph();
});

document.addEventListener("DOMContentLoaded", () => {
  accounts.forEach((account) => {
    accountsContainer.appendChild(accountBalance(account));
  });

  displayBarGraph();
})

