document.getElementById("btn").onclick = function (event) {
  document.getElementById("wrapp").style.display = "none";
  document.getElementById("main_two").style.display = "block";
};

let number = document.getElementById("number");
let inv_date = document.getElementById("inv_inp_date");
let sup_date = document.querySelector(".sup_date_inp");
let comment = document.getElementById("textarea");
let button = document.getElementById("save_btn");
let blockInvoices = document.getElementById("blinv");

number.oninput = function (event) {
  event.target.style.color = event.target.value.length >= 3 ? "#090" : "#f00";
  button.disabled = event.target.value.length < 3;
};

comment.oninput = function (event) {
  event.target.style.color = event.target.value.length < 160 ? "#090" : "#f00";
  button.disabled = event.target.value.length > 160;
};

function setJson() {
  localStorage.set(number.value, {
    number: number.value,
    date_created: inv_date.value,
    date_supplied: sup_date.value,
    comment: comment.value,
  });

  const inv = Object.assign({}, localStorage.get(number.value));

  fetch("http://localhost:3000/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inv),
  });
}

button.addEventListener("click", function (event) {
  setJson();

  event.preventDefault();
  if ((!number.value, !inv_date.value, !sup_date.value, !comment.value)) {
    alert("Заполните все поля");
    return;
  }

  let invoice_obj = {
    no: number.value,
    create: inv_date.value,
    supply: sup_date.value,
    comments: comment.value,
  };

  number.value = "";
  inv_date.value = "";
  sup_date.value = "";
  comment.value = "";

  displayInvoices(invoice_obj);
});

function displayInvoices(item) {
  let displayInv = `
    <li>
        ${item.create}
    </li>
    <li style="color:#1E90FF; text-transform:uppercase;">
        ${item.no}
        </li>
     <li>
        ${item.supply}
        </li>
       <li>
        ${item.comments}
        </li>
    `;

  let ul = document.createElement("ul");
  ul.id = "ul_inv";
  ul.innerHTML = displayInv;

  blockInvoices.appendChild(ul);
  document.getElementById("main_two").style.display = "none";
  document.getElementById("wrapp").style.display = "block";
}
