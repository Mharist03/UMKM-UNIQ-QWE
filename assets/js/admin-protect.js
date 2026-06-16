const user =
JSON.parse(
localStorage.getItem("currentUser")
);

if(
!user ||
user.role !== "admin"
){
location.href =
"../index.html";
}