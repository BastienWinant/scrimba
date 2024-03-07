import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import accounts from "./accounts.json" assert { type: 'json' }

// DOM ELEMENTS
const accountsContainer = document.getElementById("account-balances");
const spendingContainer = document.getElementById("spending");

function getAccountObject(index) {
  for (const account of accounts) {
    if (account.id == index) return account;
  }
}

function barGraph(entries) {
  // Specify the chart’s dimensions, based on a bar’s height.
  const barHeight = 25;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 10;
  const marginLeft = 0;
  const width = 928;
  const height = Math.ceil((entries.length + 0.1) * barHeight) + marginTop + marginBottom;

  // Create the scales.
  const x = d3.scaleLinear()
      .domain([0, d3.max(entries, d => parseFloat(d.spent))])
      .range([marginLeft, width - marginRight]);
  
  const y = d3.scaleBand()
      .domain(d3.sort(entries, d => -parseFloat(d.spent)).map(d => d.category))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1);

  // Create a value format.
  const format = x.tickFormat(20, "%");

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");
  
  // Append a rect for each category.
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll()
    .data(entries)
    .join("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.category))
      .attr("width", (d) => x(parseFloat(d.spent)) - x(0))
      .attr("height", y.bandwidth());
  
  // Append a label for each category.
  svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
    .selectAll()
    .data(entries)
    .join("text")
      .attr("x", (d) => x(parseFloat(d.spent)))
      .attr("y", (d) => y(d.category) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text((d) => format(parseFloat(d.spent)))
    .call((text) => text.filter(d => x(parseFloat(d.spent)) - x(0) < 20) // short bars
      .attr("dx", +4)
      .attr("fill", "black")
      .attr("text-anchor", "start"));

  // // Create the axes.
  // svg.append("g")
  //     .attr("transform", `translate(0,${marginTop})`)
  //     .call(d3.axisTop(x).ticks(width / 80, "%"))
  //     .call(g => g.select(".domain").remove());

  // svg.append("g")
  //     .attr("transform", `translate(${marginLeft},0)`)
  //     .call(d3.axisLeft(y).tickSizeOuter(0));

  return svg.node();
}

function displayAccountSpending() {
  // retieve the data for the target account
  const accountIndex = this.getAttribute("data-index");
  const accountObject = getAccountObject(accountIndex);
  const accountSpendings = accountObject.spendings;

  spendingContainer.innerHTML = "";
  spendingContainer.append(barGraph(accountSpendings));
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