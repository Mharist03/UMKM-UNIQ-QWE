let products =
JSON.parse(
localStorage.getItem("products")
) || [];

let editId = null;

function renderProduk(data = products){

const tbody =
document.getElementById(
"productTable"
);

tbody.innerHTML="";

let totalStok = 0;

data.forEach((p)=>{

totalStok += Number(p.stok);

tbody.innerHTML += `

<tr>

<td>${p.id}</td>

<td>${p.nama}</td>

<td>${p.kategori}</td>

<td>
Rp ${p.harga.toLocaleString()}
</td>

<td>${p.stok}</td>

<td>

<button
onclick="editProduk(${p.id})">

Edit

</button>

<button
onclick="hapusProduk(${p.id})">

Hapus

</button>

</td>

</tr>

`;

});

document.getElementById(
"totalProduk"
).innerText =
products.length;

document.getElementById(
"totalStok"
).innerText =
totalStok;

}

function simpanProduk(){

const nama =
document.getElementById("nama").value;

const kategori =
document.getElementById("kategori").value;

const harga =
Number(
document.getElementById("harga").value
);

const stok =
Number(
document.getElementById("stok").value
);

if(
!nama ||
!harga ||
!stok
){
alert("Lengkapi data");
return;
}

if(editId){

const index =
products.findIndex(
p => p.id === editId
);

products[index] = {

...products[index],

nama,
kategori,
harga,
stok

};

editId = null;

}else{

products.push({

id:Date.now(),

nama,
kategori,
harga,
stok

});

}

localStorage.setItem(
"products",
JSON.stringify(products)
);

resetForm();
renderProduk();

}

function editProduk(id){

const produk =
products.find(
p => p.id === id
);

document.getElementById(
"nama"
).value = produk.nama;

document.getElementById(
"kategori"
).value = produk.kategori;

document.getElementById(
"harga"
).value = produk.harga;

document.getElementById(
"stok"
).value = produk.stok;

editId = id;

}

function hapusProduk(id){

if(
confirm("Hapus produk?")
){

products =
products.filter(
p => p.id !== id
);

localStorage.setItem(
"products",
JSON.stringify(products)
);

renderProduk();

}

}

function cariProduk(){

const keyword =
document.getElementById(
"search"
).value.toLowerCase();

const hasil =
products.filter(p =>

p.nama
.toLowerCase()
.includes(keyword)

);

renderProduk(hasil);

}

function resetForm(){

document.getElementById(
"nama"
).value="";

document.getElementById(
"harga"
).value="";

document.getElementById(
"stok"
).value="";

}

function logout(){

localStorage.removeItem(
"currentUser"
);

location.href="../index.html";

}
function cekStokMenipis(){

const rendah =
products.filter(
p => p.stok <= 10
);

document.getElementById(
"stokMenipis"
).innerText =
rendah.length;

}

renderProduk();
cekStokMenipis();