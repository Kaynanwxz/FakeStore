const url = "https://fakestoreapi.com/products/";

let direction = "largest";

let dataBase = [];
let backupDataBase = [];

let key = "";

async function pegar() {
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dataBase = res;
      backupDataBase = res;
    });
  show();
}

document.querySelector("input").addEventListener("keydown", (event) => {
  dataBase = backupDataBase;

  console.log(event);
  if (event.key == "Backspace") {
    key = key.slice(0, key.length - 1);
  }
  if (event.code.slice(0, 3) == "Key" || event.code.slice(0, 3) == "Dig") {
    key += event.key;
  }

  let filterDatabase = dataBase.filter((titulos) =>
    titulos.title.toLowerCase().includes(key.toLowerCase())
  );
  dataBase = filterDatabase;
  show();
});

function show() {
  let ul = document.querySelector("ul");
  ul.innerHTML = "";

  dataBase.forEach((element) => {
    let priceLength = element.price.toFixed(2).length;
    priceLength -= 2;

    let priceDecimal = element.price.toFixed(2).toString().slice(priceLength);

    let id = element.id;
    let title = element.title;
    let price = element.price.toFixed();
    // let description = element.description;
    // let category = element.category;
    let image = element.image;
    // let rating = element.rating;

    if (title.length > 20) {
      title = `${title.slice(0, 20)}...`;
    }

    ul.innerHTML += `
      <ul onclick="window.location='http://127.0.0.1:5500/src/item.html?${id}'" class='unit'>        
      <li class="img"><img src="${image}"></li>
      <li class="title">${title}</li>
      <li class="price">R$${price}<sup>${priceDecimal}</sup></li>
      </ul>`;
  });
}
function search() {
  dataBase = backupDataBase;
  let input = document.getElementById("input").value.toLowerCase();

  let filterDatabase = dataBase.filter((titulos) =>
    titulos.title.toLowerCase().includes(input)
  );
  dataBase = filterDatabase;
  show();
}

function ordenar(ordem) {
  dataBase = backupDataBase;

  if (direction == "largest") {
    if (ordem == "alfabetic") {
      dataBase.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (ordem == "price") {
      dataBase.sort((a, b) => a.price - b.price);
    }
    if (ordem == "category") {
      dataBase.sort((a, b) => a.category.localeCompare(b.category));
    }
    direction = "smallest";
  } else {
    if (ordem == "alfabetic") {
      dataBase.sort((a, b) => b.title.localeCompare(a.title));
    }
    if (ordem == "price") {
      dataBase.sort((a, b) => b.price - a.price);
    }
    if (ordem == "category") {
      dataBase.sort((a, b) => b.category.localeCompare(a.category));
    }
    direction = "largest";
  }
  show();
}

pegar();

// key = AIzaSyAchdA27Y2c5WDsFT8EHgv11hDThJRmIKc
