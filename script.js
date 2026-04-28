
let cart = [];

const buttons = document.querySelectorAll(".add-btn");
const table = document.getElementById("cart-table");
const totalDisplay = document.getElementById("total");

buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);

        if (!btn.classList.contains("added")) {
            cart.push({ id: index, name, price });

            btn.classList.add("added");
            btn.innerHTML = 'Remove Item <ion-icon name="remove-circle-outline"></ion-icon>';   
            btn.style.backgroundColor = "#ff4d4d";
            btn.style.color = "white";
            btn.style.padding = "8px 14px";

        } else {
            cart = cart.filter(item => item.id !== index);

            btn.classList.remove("added");
            btn.innerHTML = 'Add Item <ion-icon name="add-circle-outline"></ion-icon>';
            btn.style.backgroundColor = "";
            btn.style.color = "";
        }

        updateTable();
    });
});

function updateTable() {
    let total = 0;

    table.innerHTML = `
        <tr>
            <th>S. No.</th>
            <th>Service Name</th>
            <th>Price</th>
        </tr>
    `;

    cart.forEach((item, i) => {
        total += item.price;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
        `;
        table.appendChild(row);
    });

    totalDisplay.textContent = total;
}





document.getElementById("booking-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;    
    const total = document.getElementById("total").textContent;

    let services = cart.map(item => item.name + " (Rs." + item.price + ")").join(", ");

    const templateParams = {
        name: name,
        email: email,
        phone: phone,
        total: total,
        services: services
    };

    if (cart.length === 0) {
    alert("Please add at least one service!");
    return;
    }
    if (!name || !email || !phone) {
    alert("Please fill all details!");
    return;
}

    emailjs.send("service_so0n3td", "template_pc2v6jo", templateParams)
    .then(function(response) {

    document.getElementById("success-msg").textContent = "Thank you for booking the service. We will get back to you soon!";

    document.getElementById("booking-form").reset();
    cart = [];
    updateTable();

    document.querySelectorAll(".add-btn").forEach(btn => {
        btn.classList.remove("added");
        btn.innerHTML = 'Add Item <ion-icon name="add-circle-outline"></ion-icon>';
        btn.style.backgroundColor = "";
        btn.style.color = "";
        btn.style.padding = "";
    });

}, function(error) {
    alert("Failed to send email. Check your setup.");
});
    
});

