// show cart

(() => {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");

  cartInfo.addEventListener("click", () => {
    cart.classList.toggle("show-cart");
  });
})();

// add items to the cart
(() => {
  const cartBtn = document.querySelectorAll(".store-item-icon");

  cartBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // console.log(event.target);

      if (event.target.parentElement.classList.contains("store-item-icon")) {
        // get src of image, path
        // console.log(event.target.parentElement.previousElementSibling.src);
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let position = fullPath.indexOf("img") + 3;
        let partPath = fullPath.slice(position);

        const item = {};
        item.img = `../../src/img-cart${partPath}`;

        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;
        item.name = name;
        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;
        // eliminar signo de dolar y espacios
        let finalPrice = price.slice(1).trim();
        item.price = finalPrice;
        // console.log(finalPrice);
        // console.log(name);
        // console.log(item);

        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );

        cartItem.innerHTML = `
        <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
          <div class="item-text">
            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
            <span>$</span>
            <span id="cart-item-price" class="cart-item-price mb-0">${item.price}</span>
          </div>
          <a href="#" id="cart-item-remove" class="cart-item-remove">
            <img src="./src/img/trash.svg" alt="" width="30px">
          </a>
        </div>`;

        // select cart
        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");

        cart.insertBefore(cartItem, total);
        alert("item added to the cart");
        showTotals();
      }
    });
  });

  // show totals
  function showTotals() {
    // console.log('hello');
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");

    items.forEach((item) => {
      total.push(parseFloat(item.textContent));
    });
    // console.log(total);

    const totalMoney = total.reduce((total, item) => {
      total += item;
      return total;
    }, 0);
    const fixedTotal = totalMoney.toFixed(2);

    document.getElementById("cart-total").textContent = fixedTotal;
    document.querySelector(".item-total").textContent = fixedTotal;
    document.getElementById("item-count").textContent = total.length;
    // console.log(fixedTotal);
  }
})();
