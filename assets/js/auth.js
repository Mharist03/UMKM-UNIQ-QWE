function login(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;

if(!username || !password){
  alert("Masukkan username dan password");
  return;
}

const role =
document.getElementById("role").value;

const users =
JSON.parse(
localStorage.getItem("users")
) || [];

const user =
users.find(u =>
u.username === username &&
u.password === password &&
u.role === role
);

if(user){

  localStorage.setItem(
  "currentUser",
  JSON.stringify(user)
  );
  redirectToRole(role);

  return;
}

const sameRoleUser =
users.find(u => u.username === username && u.role === role);

if(sameRoleUser){
  alert(
    "Username atau Password salah"
  );
  return;
}

const newUser = {
  username,
  password,
  role
};

users.push(newUser);
localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("currentUser", JSON.stringify(newUser));

alert("Akun baru dibuat dan berhasil login.");
redirectToRole(role);

}

function redirectToRole(role){
  if(role === "admin"){
    location.href="pages/admin.html";
  }
  if(role === "kasir"){
    location.href="pages/kasir.html";
  }
  if(role === "ceo"){
    location.href="pages/ceo.html";
  }
}

function togglePassword(){
  const input = document.getElementById('password');
  const button = document.querySelector('.toggle-password');
  if(input.type === 'password'){
    input.type = 'text';
    button.textContent = '🙈';
  } else {
    input.type = 'password';
    button.textContent = '👁️';
  }
}
