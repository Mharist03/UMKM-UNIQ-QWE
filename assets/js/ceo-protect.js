const user =
JSON.parse(
localStorage.getItem("currentUser")
);

if(
!user ||
user.role !== "ceo"
){
location.href =
"../index.html";
}