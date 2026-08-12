const url = 'https://dummyjson.com/products/category/beauty';

const fetchData = {
    method:"GET",
    headers:{
       " Content-Type": "application/json",
       "Accept": "application/json",
    },
    }
    function getStars(rating){
        let stars ="";
        for  (let i = 1; i <= 5; i++){
            if(i <= Math.floor(rating)){
                stars += '<i class="fa-solid fa-star"></i>'
            }else if (i - rating <= 0.5) {
                stars += '<i class="fa-solid fa-star-half"></i>'
            }
        }
        return stars;
    }


   const featuredProducts =
    document.getElementById("featuredProducts");
    let products = [];
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

       products = data.products;
        console.log(products);
        const searchInput = document.getElementById("checkInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {

    const searchValue = searchInput.value.toLowerCase().trim();

    const searchResults = products.filter(function(item) {
        return item.title.toLowerCase().includes(searchValue);
    });

    if (featuredProducts) {

        featuredProducts.innerHTML = searchResults.map(function(value) {
            return `
                <div class="bg-[#F1E3CC] p-8 shadow rounded-lg relative overflow-hidden mt-8 flex flex-col">

                    <img 
                        src="${value.thumbnail}"
                        alt="${value.title}"
                        class="h-40 w-40 object-contain rounded-full mb-3 transition duration-500 hover:scale-110 bg-[#F1E3CC] border border-[#482C2E]/50"
                    >

                    <span class="absolute left-30 top-8 bg-[#482C2E] font-bold text-[#F1E3CC] px-2 py-1 rounded">
                        -${value.discountPercentage}%
                    </span>

                    <h4 class="text-lg mt-3 relative left-6 text-[#482C2E]">
                        ${value.title}
                    </h4>

                    <p class="text-yellow-400 relative left-5">
                        ${getStars(value.rating)}
                        <span class="text-[#482C2E]">${value.rating}</span>
                    </p>

                    <p class="text-[#482C2E] font-bold relative left-10 mt-2">
                        $${value.price}
                    </p>

                    <div id="cartBtn-${value.id}" class="mt-auto">
                        <button 
                            onclick="event.stopPropagation(); addToCart(${value.id})"
                            class="bg-[#482C2E] text-[#F1E3CC] font-bold text-sm px-2 py-1 rounded mt-2 relative justify-center w-full"
                        >
                            <i class="fa-solid fa-cart-arrow-down"></i>
                            Add to Cart
                        </button>
                    </div>

                </div>
            `;
        }).join("");

    
        if (searchResults.length === 0) {
            featuredProducts.innerHTML = `
                <p class="col-span-full text-center text-[#482C2E] text-lg font-semibold">
                    No product found.
                </p>
            `;
        }
    }
});


       
        if (featuredProducts){
   
    featuredProducts.innerHTML = products.map (function(value,index,array){
     return `
   <div class ="bg-[#F1E3CC] p-8 shadow rounded-lg relative overflow-hidden mt-8 flex flex-col"
   >
     <img src ="${value.thumbnail}"
      alt="${value.title}" 
      class ="h-40 w-40 object-contain rounded-full mb-3 transition duration-500 
      hover:scale-110 bg-[#F1E3CC] border border-[#482C2E]/50">
     <span class = "absolute left-30 top-8 bg-[#482C2E] font-bold text-[#F1E3CC] px-2 py-1 rounded">
     -${value.discountPercentage}%</span>
     <h4 class ="text-lg mt-3 relative left-6 text-[#482C2E]">${value.title}</h4>
     <p class = "text-yellow-400 relative left-5"> ${getStars(value.rating)}
     <span class = "text-[#482C2E]">${value.rating}</span></p>
     <p class ="text-[#482C2E] font-bold relative left-10 mt-2 ">$${value.price}</p>
     <div id="cartBtn-${value.id}" class="mt-auto">
      <button onclick=" event.stopPropagation();addToCart(${value.id})" 
      class ="bg-[#482C2E] text-[#F1E3CC] font-bold text-sm px-2 py-1 rounded mt-2 relative justify-center w-full"><i class="fa-solid fa-cart-arrow-down"></i> 
      Add to Cart 
      </button>
     </div>

    </div>
    `
  
}).join('');
}

 });

let cart =
JSON.parse(localStorage.getItem("cart"))  || [];
function addToCart(id) {
    const product = products.find(item => item.id == id);
    if(!product) return;
    const existing = cart.find(item => item.id == id);

    if (existing){

        existing.quantity++
    
    }else{
       
        cart.push({...product,
             quantity:1});
    }

   localStorage.setItem("cart", JSON.stringify(cart));
   updateCartNo();

   cartBtn(id);
   alert("product added to cart")
}





function updateCartNo(){
    const cartNo = document.getElementById("cartNo");
    if (cartNo){
        const allQty = 
        cart.reduce(function(total, item){
            return total + item.quantity;
        }, 0);
        cartNo.textContent = allQty;
    }
}




const cartPages = document.getElementById("cartPages");

function myCart() {

    if (!cartPages) return;

    if (cart.length === 0) {
        cartPages.innerHTML = `
            <p class="text-center text-gray-500">
                Your cart is empty.
            </p>
        `;
        price();
        return;
    }

    cartPages.innerHTML = cart.map(item => `
    <div class="flex item-center justify-between pb-6 "
        <div class="flex items-center">
            <img 
                src="${item.thumbnail}" 
                alt="${item.title}" 
                class="w-24 h-24 object-contain rounded bg-[#F1E3CC]"
            >
            <h3 class="text-lg font-semibold text-[#482C2E]">${item.title}</h3>
            <p class="text-[#482C2E] font-bold mt-3">$${item.price}</p>
        </div>
            
            
             
            <button 
                onclick="removeItem(${item.id})"
                class="text-gray-500 hover:text-red-500 items-center"
            >
                <i class ="fa-solid fa-trash"></i>
            </button>

           

             <div class ="flex items-center gap-4 border-b border-[#482C2E] pb-2">
              <button 
           
                onclick="decreaseQuantity(${item.id})"
                class="w-8 h-8 border border-[#482C2E] px-2 text-[#482C2E] rounded-full"
            >
                -
            </button>

            <span class="font-semibold">${item.quantity}</span>

             <button 
                onclick="increaseQuantity(${item.id})"
                class="w-8 h-8 border border-[#482C2E] px-2 text-[#482C2E] rounded-full"
            >
                +
            </button>

             </div>
            </div>
            </div>
        <br>
    `).join("");

    price();
    
}

function price(){
     let total = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    const subtotal =
    document.getElementById("subtotal");
     if(subtotal){
    subtotal.textContent = "$" + total.toFixed(2);
    }
    const totalPrice =
    document.getElementById("totalPrice");
    if (totalPrice){
        totalPrice.textContent = "$" + total.toFixed(2);
    }
    }
    updateCartNo();
    myCart();
    price();



cartPages.innerHTML = cart.map(item => `
   <div class="text-[#482C2E] flex items-center justify-between border-b border-gray-300 py-6">
   <div class ="flex items-center gap-5">
   <img src="${item.thumbnail}" alt="${item.title}" class="w-24 h-24 object-contain border">
   <div>
   <h3 class="font-semibold"> ${item.title}</h3>
    <p class="font-bold mt-2"> $${item.price}</p>
    </div>
    </div>

    <div class="flex items-center gap-4">
    <button onclick ="decreaseQuantity(${item.id})"  class="px-2 text-[#F1E3CC] bg-[#482C2E]">-</button>

    <span>${item.quantity}</span>
     
      <button onclick ="increaseQuantity(${item.id})" class="px-2 text-[#F1E3CC] bg-[#482C2E]">+</button>
      </div>
        <button onclick ="removeItem(${item.id})"  class="px-2 text-[#F1E3CC] bg-[#482C2E]">Remove</button>
        </div> <br>

    `
).join("");
    
   myCart();
   updateCartNo();
   price();

    function increaseQuantity(id){
       let item = cart.find(product => product.id == id);
        if(!item) return;
        item.quantity++;
       

        localStorage.setItem("cart", JSON.stringify(cart));
    
       
        
        cartBtn(id);
        updateCartNo();
        myCart(id);
        
         }
       
   

    function decreaseQuantity(id){
        let item = cart.find(product => product.id == id);
        if (!item) return;
        if(item.quantity > 1){
        item.quantity--;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
       
        
        updateCartNo();
        myCart();
        cartBtn(id);
       
        }

    

    function removeItem(id){
        cart = cart.filter(product => product.id !=id);

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartNo();
        myCart();
        
        
    }
    
    

         function cartBtn (id){
        const btn = document.getElementById(`cartBtn-${id}`);
        if (!btn) return;
        const item = cart.find(function(product){
            return product.id == id;
        });
        if(item){
            btn.innerHTML = `
            <div class="flex items-center justify-between gap-2 rounded bg-[#482C2E] w-full h-8">
            <button onclick="decreaseQuantity(${id})" class="bg-[#FFF7EB] text-[#482C2E] font-bold w-6 h-6 rounded-md">-</button>
            <span class="text-[#F1E3CC]">${item.quantity}</span>
             <button onclick="increaseQuantity(${id})" class="bg-[#FFF7EB] text-[#482C2E] font-bold w-6 h-6 rounded-md">+</button>
            </div>
            
            
            `;
        }else{
            btn.innerHTML= `
            <button class="bg-[#482C2E] text-[#F1E3CC] font-semibold py-2 px-4 rounded-lg w-full transition" onclick="addToCart(${id})">
            Add To Cart</button>
            
            `;
        }
    }

    


 

 
    
 
