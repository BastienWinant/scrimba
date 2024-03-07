import accounts from "./accounts.json" assert { type: 'json' }

const accountsContainer = document.getElementById("account-balances");


function accountBalance(accountObject) {
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("account-total", "border-box");

  const nameEl = document.createElement("p");
  nameEl.classList.add("no-margin", "account-name", "black-border");
  nameEl.innerText = accountObject["title"];
  sectionEl.appendChild(nameEl);

  const balanceEl = document.createElement("p");
  balanceEl.classList.add("no-margin", "account-amount", "black-border");
  balanceEl.innerText = parseFloat(accountObject["balance"]).toLocaleString();
  sectionEl.appendChild(balanceEl);

  return sectionEl;
}

accounts.forEach((account) => {
  accountsContainer.appendChild(accountBalance(account));
})