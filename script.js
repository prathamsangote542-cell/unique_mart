const products=[
{id:1,name:"Multi-Purpose Manual Chopper",price:229,category:"home",image:"images/product1.jpg",desc:"Handy manual kitchen chopper."},
{id:2,name:"Laptop Backpack",price:199,category:"fashion",image:"images/product2.jpg",desc:"Useful everyday backpack."},
{id:3,name:"Myxes TWS Earbuds",price:499,category:"electronics",image:"images/product3.jpg",desc:"Wireless earbuds for everyday use."},
{id:4,name:"Gym Duffle Bag",price:399,category:"fashion",image:"images/product4.jpg",desc:"Practical duffle bag for gym and travel."},
{id:5,name:"Pink Organizer",price:249,category:"home",image:"images/product5.jpg",desc:"Compact organizer for everyday items."},
{id:6,name:"Toy Car",price:299,category:"other",image:"images/product6.jpg",desc:"Fun 1:32 scale toy car."}
];

let cart=JSON.parse(localStorage.getItem("uniqueMartCart")||"[]");

function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase();
 const cat=document.getElementById("category").value;
 const list=products.filter(p=>(p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q))&&(cat==="all"||p.category===cat));
 const el=document.getElementById("products");
 el.innerHTML=list.length?list.map(p=>`<article class="card">
 <img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/600x450?text=Unique+Mart'">
 <div class="card-body"><div class="tag">${p.category.toUpperCase()}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="price">₹${p.price}</div><button class="add" onclick="addToCart(${p.id})">Add to Cart</button></div></article>`).join(""):`<div class="empty">No products found.</div>`;
}
function addToCart(id){const x=cart.find(i=>i.id===id);if(x)x.qty++;else cart.push({id,qty:1});save();renderCart();toggleCart(true)}
function save(){localStorage.setItem("uniqueMartCart",JSON.stringify(cart))}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((a,i)=>a+i.qty,0);
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<div class="empty">Your cart is empty.</div>';document.getElementById("cartTotal").textContent="0";return}
 box.innerHTML=cart.map(i=>{const p=products.find(x=>x.id===i.id);return `<div class="cart-item"><img src="${p.image}" onerror="this.src='https://placehold.co/100x100?text=Product'"><div style="flex:1"><b>${p.name}</b><div>₹${p.price} × ${i.qty}</div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button> ${i.qty} <button onclick="changeQty(${p.id},1)">+</button></div></div></div>`}).join("");
 document.getElementById("cartTotal").textContent=cart.reduce((a,i)=>a+products.find(p=>p.id===i.id).price*i.qty,0);
}
function changeQty(id,n){const x=cart.find(i=>i.id===id);x.qty+=n;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save();renderCart()}
function clearCart(){cart=[];save();renderCart()}
function toggleCart(force){const p=document.getElementById("cartPanel"),o=document.getElementById("overlay");const open=force??!p.classList.contains("open");p.classList.toggle("open",open);o.classList.toggle("open",open)}
function orderOnInstagram(){if(!cart.length)return alert("Add a product first.");alert("Please open Instagram and message @unique_mart_14 with your cart items.")}
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
