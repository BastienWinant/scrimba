import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import accounts from "./accounts.json" assert { type: 'json' }

// DOM ELEMENTS
const accountsContainer = document.getElementById("account-balances");
const spendingContainer = document.getElementById("spending");

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

  if (a > b) return 1;
  else if (a < b) return -1;
  else return 0;
}

function displayBarGraph(entries) {
  // keep the 5 biggest spending amounts only
  entries = entries.toSorted(sortSpendingEntries).slice(0,5);

  const width = 530;
  const height = 370;
  const barHeight = 50;

  // create scales for X and Y axes
  const x = d3.scaleLinear()
            .domain([0, d3.max(entries, d => d.spent)])
            .range([0, width]);

  console.log(x(300));

  const y = d3.scaleBand()
              .domain(d3.sort(entries, d => -parseFloat(d.spent)).map(d => d.category))
              .rangeRound([0, height])
              .paddingInner(0.16)
              .paddingOuter(0);
  
  // height of the bar: y.bandwidth()
  // innerpadding: 1 - barHeight / y.bandwidth()

  console.log(y('Rent'));
  console.log(y('Groceries'));
  console.log(y('Restaurants'));

  console.log(y.bandwidth());

  // Create the SVG container and append to DOM container.
  const svg = d3.select("#spending")
                .append("svg")
                .attr("height", height)
                .attr("viewBox", `0 0 ${width} ${height}`)
                // .attr("style", "background-color: blue;")
                .classed("svg-content", true);
}

function displayAccountSpending() {
  // retieve the data for the target account
  const accountIndex = this.getAttribute("data-index");
  const accountObject = getAccountObject(accountIndex);
  const accountSpendings = accountObject.spendings;

  spendingContainer.innerHTML = "";
  displayBarGraph(accountSpendings);
}


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


accounts.forEach((account) => {
  accountsContainer.appendChild(accountBalance(account));
})