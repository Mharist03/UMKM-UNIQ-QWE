const transactions =
JSON.parse(
localStorage.getItem("transactions")
) || [];

let chartInstance;

function initTahun(){

const tahunSet = new Set();

transactions.forEach(t=>{

const tahun =
new Date()
.getFullYear();

tahunSet.add(tahun);

});

const select =
document.getElementById(
"tahunFilter"
);

tahunSet.forEach(tahun=>{

select.innerHTML += `
<option value="${tahun}">
${tahun}
</option>
`;

});

}

function dashboard(){

let totalPendapatan = 0;

transactions.forEach(t=>{

totalPendapatan += t.total;

});

document.getElementById(
"totalPendapatan"
).innerText =
"Rp " +
totalPendapatan.toLocaleString();

document.getElementById(
"totalTransaksi"
).innerText =
transactions.length;

const rataRata =
transactions.length
?
totalPendapatan /
transactions.length
:
0;

document.getElementById(
"rataRata"
).innerText =
"Rp " +
Math.round(rataRata)
.toLocaleString();

}

function hitungHariIni(){

const today =
new Date()
.toLocaleDateString("id-ID");

let total = 0;

transactions.forEach(t=>{

if(t.tanggal === today){

total += t.total;

}

});

document.getElementById(
"todaySales"
).innerText =
"Rp " +
total.toLocaleString();

}

function hitungBulanIni(){

const bulan =
new Date().getMonth()+1;

let total = 0;

transactions.forEach(t=>{

const parts =
t.tanggal.split("/");

const trxBulan =
Number(parts[1]);

if(trxBulan === bulan){

total += t.total;

}

});

document.getElementById(
"monthSales"
).innerText =
"Rp " +
total.toLocaleString();

}

function laporan(data){

const tbody =
document.getElementById(
"laporanTable"
);

tbody.innerHTML = "";

data.forEach(t=>{

tbody.innerHTML += `

<tr>

<td>${t.tanggal}</td>

<td>${t.waktu}</td>

<td>
Rp ${t.total.toLocaleString()}
</td>

</tr>

`;

});

}

function produkTerlaris(){

const result = {};

transactions.forEach(trx=>{

trx.items.forEach(item=>{

if(!result[item.nama]){

result[item.nama]=0;

}

result[item.nama]+=item.qty;

});

});

const tbody =
document.getElementById(
"bestSeller"
);

tbody.innerHTML = "";

Object.entries(result)
.sort((a,b)=>b[1]-a[1])
.forEach(item=>{

tbody.innerHTML += `

<tr>

<td>${item[0]}</td>

<td>${item[1]}</td>

</tr>

`;

});

}

function grafikBulanan(data){

const monthly = {};

data.forEach(trx=>{

const parts =
trx.tanggal.split("/");

const bulan =
parts[1];

if(!monthly[bulan]){

monthly[bulan]=0;

}

monthly[bulan]+=trx.total;

});

const labels =
Object.keys(monthly);

const values =
Object.values(monthly);

if(chartInstance){

chartInstance.destroy();

}

chartInstance =
new Chart(

document.getElementById(
"salesChart"
),

{

type:"line",

data:{

labels,

datasets:[{

label:"Penjualan",

data:values,

fill:false

}]

}

}

);

}

function filterLaporan(){

const bulan =
document.getElementById(
"bulanFilter"
).value;

const tahun =
document.getElementById(
"tahunFilter"
).value;

let hasil =
transactions.filter(trx=>{

const parts =
trx.tanggal.split("/");

const trxBulan =
parts[1];

const trxTahun =
parts[2];

const cocokBulan =
!bulan ||
trxBulan == bulan;

const cocokTahun =
!tahun ||
trxTahun == tahun;

return cocokBulan &&
cocokTahun;

});

laporan(hasil);
grafikBulanan(hasil);

}

function logout(){

localStorage.removeItem(
"currentUser"
);

location.href="../index.html";

}
function hitungLaba(){

let pendapatan = 0;

transactions.forEach(t=>{

pendapatan += t.total;

});

const biayaOperasional =
pendapatan * 0.20;

const laba =
pendapatan -
biayaOperasional;

document.getElementById(
"labaBersih"
).innerText =
"Rp " +
laba.toLocaleString();

}
function exportExcel(){

const worksheet =
XLSX.utils.json_to_sheet(
transactions
);

const workbook =
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
workbook,
worksheet,
"Penjualan"
);

XLSX.writeFile(
workbook,
"Laporan_UMKM.xlsx"
);

}
function exportPDF(){

const {
jsPDF
} = window.jspdf;

const doc =
new jsPDF();

doc.setFontSize(16);

doc.text(
"Laporan Penjualan UMKM",
20,
20
);

let y = 40;

transactions.forEach(t=>{

doc.text(

`${t.tanggal} - Rp ${t.total}`,

20,

y

);

y += 10;

});

doc.save(
"Laporan_UMKM.pdf"
);

}
function totalProdukTerjual(){

let total = 0;

transactions.forEach(t=>{

t.items.forEach(item=>{

total += item.qty;

});

});

document.getElementById(
"produkTerjual"
).innerText =
total;

}
totalProdukTerjual();
dashboard();
hitungHariIni();
hitungBulanIni();
laporan(transactions);
produkTerlaris();
grafikBulanan(transactions);
initTahun();
hitungLaba();