document.addEventListener("DOMContentLoaded", function () {
    let citySelector = document.getElementById("city-selector");
    let cityDisplay = document.getElementById("city");
    let categoriesDiv = document.getElementById("categories");
    let table = document.querySelector("table");
    let totalDiv = document.getElementById("total");
    let cleanerButton = document.getElementById("cleaner");
    
    cityDisplay.textContent = citySelector.value;
    citySelector.addEventListener("change", function () {
        cityDisplay.textContent = citySelector.value;
    });
    
    pageSwap = function () {
        location.href = "other/svyaz.html";
    };
    
    toggleCategories = function () {
        categoriesDiv.style.display = categoriesDiv.style.display === "block" ? "none" : "block";
    };
    
    function filterProducts() {
        let selectedCategories = [];
        let checkboxes = document.querySelectorAll(".category-filter");
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedCategories.push(checkboxes[i].value);
            }
        }
        
        let products = document.querySelectorAll(".card");
        for (let i = 0; i < products.length; i++) {
            let category = products[i].getAttribute("data-category");
            products[i].style.display = selectedCategories.length === 0 || selectedCategories.includes(category) ? "block" : "none";
        }
    }
    
    let checkboxes = document.querySelectorAll(".categories input[type='checkbox']");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].classList.add("category-filter");
        checkboxes[i].addEventListener("change", filterProducts);
    }
    
    function addToCart(event) {
        let card = event.target.closest(".card");
        let name = card.querySelector("h3").textContent;
        let price = parseFloat(card.querySelector(".cena:last-child").textContent.replace("₽", ""));
        let imgSrc = card.querySelector("img").src;
        let category = card.getAttribute("data-category") || "Не указано";
        
        let existingRow;
        let rows = table.rows;
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].cells[2].textContent === name) {
                existingRow = rows[i];
                break;
            }
        }
        
        if (existingRow) {
            let quantitySpan = existingRow.cells[5].querySelector("span");
            quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
        } else {
            let row = table.insertRow(-1);
            row.innerHTML = `
                <td>${table.rows.length - 1}</td>
                <td>${category}</td>
                <td>${name}</td>
                <td><img src="${imgSrc}" width="50"></td>
                <td class="price">${price}₽</td>
                <td>
                    <button class="decrease">-</button>
                    <span>1</span>
                    <button class="increase">+</button>
                </td>
                <td><button class="remove">🗑</button></td>
            `;
            
            row.querySelector(".increase").addEventListener("click", function () {
                let quantitySpan = row.cells[5].querySelector("span");
                quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
                updateTotal();
            });
            
            row.querySelector(".decrease").addEventListener("click", function () {
                let quantitySpan = row.cells[5].querySelector("span");
                let currentQuantity = parseInt(quantitySpan.textContent);
                if (currentQuantity > 1) {
                    quantitySpan.textContent = currentQuantity - 1;
                    updateTotal();
                }
            });
            
            row.querySelector(".remove").addEventListener("click", function () {
                row.remove();
                updateTotal();
            });
        }
        updateTotal();
    }
    
    function updateTotal() {
        let total = 0;
        let rows = table.rows;
        for (let i = 1; i < rows.length; i++) {
            let price = parseFloat(rows[i].cells[4].textContent.replace("₽", ""));
            let quantity = parseInt(rows[i].cells[5].querySelector("span").textContent);
            total += price * quantity;
        }
        
        totalDiv.innerHTML = `Итоговая сумма: ${total}₽`;
        totalDiv.style.display = total > 0 ? "block" : "none";
        cleanerButton.style.display = total > 0 ? "block" : "none";
    }
    
    clearCart = function () {
        table.innerHTML = `
            <tr>
                <td>№</td>
                <td>Категория</td>
                <td>Наименование</td>
                <td>Фото</td>
                <td>Цена</td>
                <td>Кол-во</td>
                <td>Удалить</td>
            </tr>
        `;
        updateTotal();
    };
    
    let buttons = document.querySelectorAll(".card button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", addToCart);
    }
});