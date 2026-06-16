let products =
JSON.parse(
localStorage.getItem("products")
) || [];

let transactions =
JSON.parse(
localStorage.getItem("transactions")
) || [];

let currentUser =
JSON.parse(
localStorage.getItem("currentUser")
);

let cart = [];

let lastInvoice = null;

function renderProduk(){

const productList =
document.getElementById(
"productList"
);

productList.innerHTML = "";

products.forEach(product=>{

productList.innerHTML += `

<div class="product-card">

<h4>${product.nama}</h4>

<p>${product.kategori}</p>

<p>
Rp ${product.harga.toLocaleString()}
</p>

<p>
Stok : ${product.stok}
</p>

<button
onclick="tambahKeranjang(${product.id})">

Tambah

</button>

</div>

`;

});

}

function tambahKeranjang(id){

const product =
products.find(
p => p.id === id
);

if(product.stok <= 0){

alert("Stok habis");

return;

}

const item =
cart.find(
c => c.id === id
);

if(item){

if(item.qty >= product.stok){

alert("Stok tidak cukup");

return;

}

item.qty++;

}else{

cart.push({

id:product.id,
nama:product.nama,
harga:product.harga,
qty:1

});

}

renderCart();

}

function tambahQty(id){

const item =
cart.find(
i => i.id === id
);

const product =
products.find(
p => p.id === id
);

if(item.qty < product.stok){

item.qty++;

}

renderCart();

}

function kurangQty(id){

const item =
cart.find(
i => i.id === id
);

item.qty--;

if(item.qty <= 0){

cart =
cart.filter(
i => i.id !== id
);

}

renderCart();

}

function hapusItem(id){

cart =
cart.filter(
i => i.id !== id
);

renderCart();

}

function renderCart(){

const tbody =
document.getElementById(
"cartTable"
);

tbody.innerHTML="";

let total = 0;

cart.forEach(item=>{

const subtotal =
item.harga * item.qty;

total += subtotal;

tbody.innerHTML += `

<tr>

<td>${item.nama}</td>

<td>${item.qty}</td>

<td>
Rp ${item.harga.toLocaleString()}
</td>

<td>
Rp ${subtotal.toLocaleString()}
</td>

<td>

<button
onclick="tambahQty(${item.id})">

+

</button>

<button
onclick="kurangQty(${item.id})">

-

</button>

<button
onclick="hapusItem(${item.id})">

X

</button>

</td>

</tr>

`;

});

document.getElementById(
"totalBelanja"
).innerText =
"Total : Rp " +
total.toLocaleString();

}

function checkout(){

if(cart.length === 0){

alert("Keranjang kosong");

return;

}

let total = 0;

cart.forEach(item=>{

total += item.harga * item.qty;

});

const invoice =
"INV-" +
Date.now();

lastInvoice = invoice;

cart.forEach(item=>{

const product =
products.find(
p => p.id === item.id
);

product.stok -= item.qty;

});

localStorage.setItem(
"products",
JSON.stringify(products)
);

const transaksi = {

invoice,

tanggal:
new Date()
.toLocaleDateString("id-ID"),

waktu:
new Date()
.toLocaleTimeString("id-ID"),

kasir:
currentUser.username,

items:[...cart],

total

};

transactions.push(
transaksi
);

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

document.getElementById(
"invoiceNumber"
).innerText =
"Invoice : " + invoice;

alert(
"Checkout berhasil"
);

cart = [];

renderCart();
renderProduk();

}

function cetakStruk(){

if(!lastInvoice){

alert(
"Belum ada transaksi"
);

return;

}

window.print();

}

function logout(){

localStorage.removeItem(
"currentUser"
);

location.href="../index.html";

}

renderProduk();