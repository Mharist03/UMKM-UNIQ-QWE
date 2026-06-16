// Users are created manually at first login.
if(!localStorage.getItem("users")){
  localStorage.setItem("users", JSON.stringify([]));
}

if(!localStorage.getItem("products")){

const products = [

{
id:1,
nama:"Nasi Goreng",
kategori:"Makanan",
harga:15000,
stok:100
},

{
id:2,
nama:"Ayam Geprek",
kategori:"Makanan",
harga:18000,
stok:100
},

{
id:3,
nama:"Es Teh",
kategori:"Minuman",
harga:5000,
stok:200
}

];
localStorage.setItem(
"products",
JSON.stringify(products)
);

}

if(!localStorage.getItem("transactions")){

localStorage.setItem(
"transactions",
JSON.stringify([])
);

}