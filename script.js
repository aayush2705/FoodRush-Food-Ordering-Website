let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {

    const item = cart.find(i => i.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}

function displayCart() {

    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");

    if (!container) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.innerHTML = `
${item.name} x ${item.qty} - ₹${item.price * item.qty}
<button onclick="removeItem('${item.name}')">Remove</button>
`;
        container.appendChild(div);
    });

    totalEl.textContent = total;
}

function removeItem(name) {
    cart = cart.filter(i => i.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

/* Signup */

function signupUser() {

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");

    window.location.href = "login.html";
}


/* Login */

function loginUser() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("No account found. Please signup first.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {

        alert("Login successful!");

        window.location.href = "index.html";

    } else {
        alert("Invalid email or password");
    }

}

function checkAddress() {

    const address = document.getElementById("addressInput").value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    let found = false;

    cards.forEach(card => {

        const city = card.dataset.city;

        if (address.includes(city)) {

            card.style.display = "block";
            found = true;

        } else {

            card.style.display = "none";

        }

    });

    if (found) {

        document.getElementById("noService").style.display = "none";

    } else {

        document.getElementById("noService").style.display = "block";

    }

}



