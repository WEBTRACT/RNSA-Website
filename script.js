const SUPABASE_URL = "https://rbabiowcirxgwxuhughx.supabase.co";

const SUPABASE_KEY = "sb_publishable_2xLI0qxaaVze-w4raM3-Pw_JH9hMlUD";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
// ==========================================
// RNSA - RACING NATION SOUTH AFRICA
// Website JavaScript
// ==========================================


// ---------- NEXT EVENT COUNTDOWN ----------

// We don't have the real RNSA event date yet.
// This is a temporary date that we will replace
// once RNSA gives us the next event details.

const eventDate = new Date("November 14, 2026 19:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = eventDate - now;


    // If the event has already started
    if (difference <= 0) {

        document.getElementById("countdown").innerHTML =
            "EVENT DAY";

        return;
    }


    // Calculate time remaining

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    // Display countdown

    const countdown = document.getElementById("countdown");


    if (countdown) {

        countdown.innerHTML = `
            <div class="countdown-box">
                <strong>${days}</strong>
                <span>DAYS</span>
            </div>

            <div class="countdown-box">
                <strong>${hours}</strong>
                <span>HOURS</span>
            </div>

            <div class="countdown-box">
                <strong>${minutes}</strong>
                <span>MINUTES</span>
            </div>

            <div class="countdown-box">
                <strong>${seconds}</strong>
                <span>SECONDS</span>
            </div>
        `;
    }
}


// Update immediately
updateCountdown();


// Update every second
setInterval(updateCountdown, 1000);
// ---------- MOBILE MENU ----------

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});
// ==========================================
// RNSA MERCH ORDER
// ==========================================

function orderProduct(product, price) {

    const phoneNumber = "27762138198";

    const message =
        `Hi RNSA! 👋%0A%0A` +
        `I'd like to order RNSA merchandise.%0A%0A` +
        `Product: ${product}%0A` +
        `Price: ${price}%0A%0A` +
        `Please send me the available sizes, ` +
        `colours and payment information.`;

   const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

window.open(whatsappURL, "_blank");

}
// ==========================================
// RNSA SHOPPING CART
// ==========================================

let cart = [];


// ADD PRODUCT TO CART

function addToCart(productName, price) {

    const existingProduct = cart.find(
        item => item.name === productName
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    // Take customer to cart
    document
        .getElementById("cart")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// UPDATE CART

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    // Calculate quantity

    const totalQuantity = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    // Calculate price

    const totalPrice = cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        "R" + totalPrice.toLocaleString();


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    YOUR CART IS EMPTY
                </h3>

                <p>
                    Add some official RNSA merchandise
                    to your cart.
                </p>

                <a
                    href="#merch"
                    class="btn primary"
                >
                    VIEW MERCH
                </a>

            </div>

        `;

        return;

    }


    // Display products

    cartItems.innerHTML = cart.map(
        (item, index) => `

        <div class="cart-item">

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    R${item.price.toLocaleString()}
                    each
                </p>

            </div>


            <div class="cart-controls">

                <button
                    onclick="changeQuantity(${index}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)"
                >
                    +
                </button>

            </div>


            <strong class="cart-item-total">

                R${(
                    item.price *
                    item.quantity
                ).toLocaleString()}

            </strong>


            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >
                REMOVE
            </button>

        </div>

    `).join("");

}


// CHANGE QUANTITY

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// REMOVE PRODUCT

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// START WITH EMPTY CART

updateCart();
// RNSA SUPABASE TEST

async function testSupabaseConnection() {
    const { data, error } = await supabaseClient
        .from("events")
        .select("*")
        .limit(1);

    if (error) {
        console.error("RNSA Supabase error:", error);
    } else {
        console.log("RNSA Supabase connected successfully!");
    }
}

testSupabaseConnection();
// ==========================================
// RNSA DEVELOPER LOGIN
// ==========================================

const developerLoginButton =
    document.getElementById("developer-login-button");

const developerLogin =
    document.getElementById("developer-login");

const closeDeveloperLogin =
    document.getElementById("close-developer-login");


if (developerLoginButton && developerLogin) {
    developerLoginButton.addEventListener("click", () => {
        developerLogin.style.setProperty("display", "flex", "important");
    });
}


if (closeDeveloperLogin && developerLogin) {

    closeDeveloperLogin.addEventListener("click", () => {

        developerLogin.style.display = "none";

    });

}
// ==========================================
// RNSA DEVELOPER LOGOUT
// ==========================================
const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        const dashboard = document.getElementById("developer-dashboard");
        const login = document.getElementById("developer-login");

        if (dashboard) {
            dashboard.style.display = "none";
        }

        if (login) {
            login.style.display = "flex";
        }
    });
}
// ==========================================
// RNSA ADD PRODUCT FORM
// ==========================================
const addProductButton = document.getElementById("add-product-button");
const addProductForm = document.getElementById("add-product-form");
const cancelProductButton = document.getElementById("cancel-product-button");

if (addProductButton && addProductForm) {
    addProductButton.addEventListener("click", () => {
        addProductForm.style.display = "block";
        addProductButton.style.display = "none";
    });
}

if (cancelProductButton && addProductForm) {
    cancelProductButton.addEventListener("click", () => {
        addProductForm.style.display = "none";

        if (addProductButton) {
            addProductButton.style.display = "inline-block";
        }
    });
}
// ==========================================
// SAVE PRODUCT TO SUPABASE
// ==========================================

const saveProductButton = document.getElementById("save-product-button");

if (saveProductButton) {

    saveProductButton.addEventListener("click", async function () {

        const name = document.getElementById("product-name").value.trim();
        const description = document.getElementById("product-description").value.trim();
        const price = document.getElementById("product-price").value;
        const imageFile = document.getElementById("product-image").files[0];
        const message = document.getElementById("product-form-message");

        if (!name || !price) {
            message.textContent = "Please enter a product name and price.";
            return;
        }

        message.textContent = "Saving product...";

        let imageUrl = null;

// Upload image to Supabase Storage
if (imageFile) {

    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabaseClient
        .storage
        .from("product-images")
        .upload(fileName, imageFile);

    if (uploadError) {
        console.error("Image upload error:", uploadError);
        message.textContent = "Could not upload image.";
        return;
    }

    const { data: imageData } = supabaseClient
        .storage
        .from("product-images")
        .getPublicUrl(fileName);

    imageUrl = imageData.publicUrl;
}

const { error } = await supabaseClient
    .from("products")
    .insert({
        name: name,
        description: description,
        price: Number(price),
        image_url: imageUrl
    });

        if (error) {
            console.error("Product save error:", error);
            message.textContent = "Could not save product.";
            return;
        }

        message.textContent = "Product saved successfully!";

        document.getElementById("product-name").value = "";
        document.getElementById("product-description").value = "";
        document.getElementById("product-price").value = "";
        document.getElementById("product-image-url").value = "";

    });

}

// ==========================================
// SHOW DEVELOPER DASHBOARD AFTER LOGIN
// ==========================================

const rnsaRole = localStorage.getItem("rnsa_role");

if (rnsaRole === "developer") {
    const dashboard = document.getElementById("developer-dashboard");

    if (dashboard) {
        dashboard.style.display = "block";
    }
}
// ==========================================
// LOAD PRODUCTS INTO DEVELOPER DASHBOARD
// ==========================================

async function loadAdminProducts() {

    const list = document.getElementById("products-admin-list");

    if (!list) return;

    list.innerHTML = "Loading products...";

    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Load products error:", error);
        list.innerHTML = "Could not load products.";
        return;
    }

    if (!data || data.length === 0) {
        list.innerHTML = "No products added yet.";
        return;
    }

    list.innerHTML = "";

    data.forEach(product => {

        const productItem = document.createElement("div");

        productItem.className = "admin-product-item";

      productItem.innerHTML = `
    <strong>${product.name}</strong>
    <span>R${Number(product.price).toFixed(2)}</span>

    <button type="button" class="edit-product-button" data-id="${product.id}">
        EDIT
    </button>
    <button type="button" class="variants-product-button" data-id="${product.id}">
    VARIANTS
</button>

    <button type="button" class="delete-product-button" data-id="${product.id}">
        DELETE
    </button>
`;
        // ==========================================
// EDIT PRODUCT
// ==========================================

document.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("edit-product-button")) {
        return;
    }

    const productId = event.target.dataset.id;

    const newName = prompt("Enter the new product name:");

    if (newName === null || newName.trim() === "") {
        return;
    }

    const newPrice = prompt("Enter the new price:");

    if (newPrice === null || newPrice.trim() === "") {
        return;
    }

    const { error } = await supabaseClient
        .from("products")
        .update({
            name: newName.trim(),
            price: Number(newPrice)
        })
        .eq("id", productId);

    if (error) {
        console.error("Edit product error:", error);
        alert("Could not update product.");
        return;
    }

    alert("Product updated successfully!");

    loadAdminProducts();
});

        list.appendChild(productItem);
    });
}

loadAdminProducts();
// ==========================================
// DELETE PRODUCT
// ==========================================

document.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("delete-product-button")) {
        return;
    }

    const productId = event.target.dataset.id;

    const confirmDelete = confirm("Delete this product?");

    if (!confirmDelete) {
        return;
    }

    const { error } = await supabaseClient
        .from("products")
        .delete()
        .eq("id", productId);

    if (error) {
        console.error("Delete product error:", error);
        alert("Could not delete product.");
        return;
    }

    alert("Product deleted successfully!");

    loadAdminProducts();
});
// ==========================================
// PRODUCT VARIANTS
// ==========================================

let selectedProductId = null;

const variantsForm = document.getElementById("variants-admin-form");
const cancelVariantButton = document.getElementById("cancel-variant-button");

document.addEventListener("click", function (event) {

    if (!event.target.classList.contains("variants-product-button")) {
        return;
    }

   selectedProductId = event.target.dataset.id;

if (variantsForm) {
    variantsForm.style.display = "block";
}

loadProductVariants(selectedProductId);

});

if (cancelVariantButton && variantsForm) {

    cancelVariantButton.addEventListener("click", function () {

        variantsForm.style.display = "none";
        selectedProductId = null;

    });

}
// ==========================================
// SAVE PRODUCT VARIANT
// ==========================================

const saveVariantButton = document.getElementById("save-variant-button");

if (saveVariantButton) {

    saveVariantButton.addEventListener("click", async function () {

        const colour = document.getElementById("variant-colour").value.trim();
        const size = document.getElementById("variant-size").value.trim();
        const stock = document.getElementById("variant-stock").value;
        const message = document.getElementById("variant-form-message");

        if (!selectedProductId) {
            message.textContent = "Please select a product first.";
            return;
        }

        if (!colour || !size || stock === "") {
            message.textContent = "Please fill in colour, size and stock.";
            return;
        }

        message.textContent = "Saving variant...";

        const { error } = await supabaseClient
            .from("product_variants")
            .insert({
                product_id: selectedProductId,
                colour: colour,
                size: size,
                stock: Number(stock)
            });

        if (error) {
            console.error("Variant save error:", error);
            message.textContent = "Could not save variant.";
            return;
        }

        message.textContent = "Variant saved successfully!";

        document.getElementById("variant-colour").value = "";
        document.getElementById("variant-size").value = "";
        document.getElementById("variant-stock").value = "";

    });

}
// ==========================================
// LOAD PRODUCT VARIANTS
// ==========================================

async function loadProductVariants(productId) {

    const list = document.getElementById("variants-admin-list");

    if (!list) return;

    list.innerHTML = "Loading variants...";

    const { data, error } = await supabaseClient
        .from("product_variants")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Load variants error:", error);
        list.innerHTML = "Could not load variants.";
        return;
    }

    if (!data || data.length === 0) {
        list.innerHTML = "No variants added yet.";
        return;
    }

    list.innerHTML = "";

    data.forEach(variant => {

        const variantItem = document.createElement("div");

        variantItem.className = "admin-variant-item";

 variantItem.innerHTML = `
    <strong>${variant.colour}</strong>
    <span>Size: ${variant.size}</span>
    <span>Stock: ${variant.stock}</span>

    <button
        type="button"
        class="edit-variant-button"
        data-id="${variant.id}"
        data-colour="${variant.colour}"
        data-size="${variant.size}"
        data-stock="${variant.stock}"
    >
        EDIT
    </button>

    <button
        type="button"
        class="delete-variant-button"
        data-id="${variant.id}"
    >
        DELETE
    </button>
`;

        list.appendChild(variantItem);

    });

}
// ==========================================
// DELETE PRODUCT VARIANT
// ==========================================

document.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("delete-variant-button")) {
        return;
    }

    const variantId = event.target.dataset.id;

    const confirmDelete = confirm("Delete this variant?");

    if (!confirmDelete) {
        return;
    }

    const { error } = await supabaseClient
        .from("product_variants")
        .delete()
        .eq("id", variantId);

    if (error) {
        console.error("Delete variant error:", error);
        alert("Could not delete variant.");
        return;
    }

    alert("Variant deleted successfully!");

    loadProductVariants(selectedProductId);

});
// ==========================================
// EDIT PRODUCT VARIANT
// ==========================================

document.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("edit-variant-button")) {
        return;
    }

    const variantId = event.target.dataset.id;

    const newColour = prompt(
        "Enter the colour:",
        event.target.dataset.colour
    );

    if (newColour === null || newColour.trim() === "") {
        return;
    }

    const newSize = prompt(
        "Enter the size:",
        event.target.dataset.size
    );

    if (newSize === null || newSize.trim() === "") {
        return;
    }

    const newStock = prompt(
        "Enter the stock quantity:",
        event.target.dataset.stock
    );

    if (newStock === null || newStock.trim() === "") {
        return;
    }

    const { error } = await supabaseClient
        .from("product_variants")
        .update({
            colour: newColour.trim(),
            size: newSize.trim(),
            stock: Number(newStock)
        })
        .eq("id", variantId);

    if (error) {
        console.error("Edit variant error:", error);
        alert("Could not update variant.");
        return;
    }

    alert("Variant updated successfully!");

    loadProductVariants(selectedProductId);

});
// ==========================================
// LOAD PRODUCTS ON PUBLIC MERCH PAGE
// ==========================================

async function loadPublicProducts() {

    const productsList = document.getElementById("products-list");

    // Only run this on pages with the products list
    if (!productsList) return;

    productsList.innerHTML = "Loading products...";

    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Load public products error:", error);
        productsList.innerHTML = "Could not load products.";
        return;
    }

    if (!data || data.length === 0) {
        productsList.innerHTML = "No products available yet.";
        return;
    }

    productsList.innerHTML = "";

    data.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image_url}" alt="${product.name}">
            </div>

           <div class="product-info">
    <h3>${product.name}</h3>
    <p>${product.description || ""}</p>
    <strong>R${product.price}</strong>

   <button
    type="button"
    class="add-to-cart-button"
    onclick="addToCart('${product.name}', ${product.price})">
    ADD TO CART
</button>
</div>
        `;

        productsList.appendChild(productCard);

    });

}

loadPublicProducts();




document.getElementById("checkout-button").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = "Hi RNSA! 👋\n\nI'd like to place an order:\n\n";

    cart.forEach(item => {
        message += `${item.name} x${item.quantity} - R${item.price * item.quantity}\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    message += `\nTotal: R${total}\n\nPlease let me know how to proceed with payment.`;

    const phoneNumber = "27762138198";
    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
});


// ==========================================
// GALLERY MANAGEMENT
// ==========================================

async function loadGalleryAdmin() {

    const galleryList = document.getElementById("gallery-admin-list");

    if (!galleryList) return;

    galleryList.innerHTML = "Loading gallery...";

    const { data, error } = await supabaseClient
        .storage
        .from("gallery-images")
        .list("", {
            sortBy: {
                column: "created_at",
                order: "desc"
            }
        });

    if (error) {
        console.error("Gallery load error:", error);
        galleryList.innerHTML = "Could not load gallery.";
        return;
    }

    galleryList.innerHTML = "";

    if (!data || data.length === 0) {
        galleryList.innerHTML = "No gallery pictures yet.";
        return;
    }

    data.forEach(file => {

        const { data: publicData } = supabaseClient
            .storage
            .from("gallery-images")
            .getPublicUrl(file.name);

        const item = document.createElement("div");

        item.className = "gallery-admin-item";

        item.innerHTML = `
            <img
                src="${publicData.publicUrl}"
                alt="RNSA Gallery"
            >

            <button
                type="button"
                class="dashboard-secondary"
                onclick="deleteGalleryImage('${file.name}')"
            >
                REMOVE
            </button>
        `;

        galleryList.appendChild(item);
    });
}


// ==========================================
// ADD GALLERY PICTURE
// ==========================================

document.getElementById("add-photo-button")?.addEventListener("click", function () {

    const fileInput = document.createElement("input");

    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async function () {

        const file = fileInput.files[0];

        if (!file) return;

        const fileName = `${Date.now()}-${file.name}`;

        const { error } = await supabaseClient
            .storage
            .from("gallery-images")
            .upload(fileName, file);

        if (error) {
            console.error("Gallery upload error:", error);
            alert("Could not upload picture.");
            return;
        }

        alert("Picture added successfully.");

        loadGalleryAdmin();
    };

    fileInput.click();

});


// ==========================================
// REMOVE GALLERY PICTURE
// ==========================================

async function deleteGalleryImage(fileName) {

    const confirmDelete = confirm(
        "Are you sure you want to remove this picture?"
    );

    if (!confirmDelete) return;

    const { error } = await supabaseClient
        .storage
        .from("gallery-images")
        .remove([fileName]);

    if (error) {
        console.error("Gallery delete error:", error);
        alert("Could not remove picture.");
        return;
    }

    alert("Picture removed.");

    loadGalleryAdmin();
}


// ==========================================
// LOAD GALLERY ADMIN
// ==========================================

loadGalleryAdmin();
