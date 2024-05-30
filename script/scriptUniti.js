const idurl = document.URL;

const id = idurl.slice(36);
console.log(id);

const url = `https://fakestoreapi.com/products/${id}`;

let dataBase = [];

async function show() {
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dataBase = res;
    });

  let priceLength = dataBase.price.toFixed(2).length;
  priceLength -= 2;

  let priceDecimal = dataBase.price.toFixed(2).toString().slice(priceLength);

  let title = dataBase.title;
  let price = dataBase.price.toFixed();
  let description = dataBase.description;
  let category = dataBase.category;
  let img = dataBase.image;

  document.querySelector("h4").innerHTML = title;
  document.querySelector("img").src = img;
  document.querySelector(
    "h5"
  ).innerHTML = `R$${price}<sup>${priceDecimal}</sup>`;
  document.querySelector("p").innerHTML = description;
}
show();
