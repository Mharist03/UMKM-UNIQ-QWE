const user =
JSON.parse(
localStorage.getItem("currentUser")
);

if(
!user ||
user.role !== "kasir"
){
location.href =
"../index.html";
}