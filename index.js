// selectors

const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");

// global variable

let allProductsData = [];

const filters = {
  searchItems: "",
};

// functions

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((product) =>
    product.title.toLowerCase().includes(_filters.searchItems.toLowerCase())
  );

  productsDOM.innerHTML = "";

  // render to DOM :
  filteredProducts.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
    <div class="img-container">
      <img src=${item.image} class="product-img" alt="p-${item.id}" />
    </div>
    <div class="product-desc">
      <p class="product-price">${item.price} $</p>
      <p class="product-title">${item.title}</p>
    </div>`;

    productsDOM.appendChild(productDiv);
  });
}

// event listeners

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;

      // render products on DOM :
      renderProducts(res.data, filters);
    })
    .catch((error) => console.log(error));
});

searchInput.addEventListener("input", (e) => {
  btns.forEach((btn) => {
    if (btn.classList.contains("active")) btn.classList.remove("active");
  });

  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

// filter based on groups :
btns.forEach((btnClickEv, _, buttons) => {
  btnClickEv.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;

    buttons.forEach((btn) =>
      btn.classList.toggle("active", btn === btnClickEv)
    );

    filters.searchItems = filter;
    renderProducts(allProductsData, filters);
    searchInput.value = "";
  });
});
