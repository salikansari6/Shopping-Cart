class Product
{
    constructor(name, imgURL, price, quantity)
    {
        this.name = name;
        this.imgURL = imgURL;
        this.quantity = quantity;
        this.price = price;
    }

}

var apple = new Product('apple','https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png',50,0)
var orange = new Product('orange','https://5.imimg.com/data5/VN/YP/MY-33296037/orange-600x600-500x500.jpg',100,0)
var watermelon = new Product('watermelon','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH5STHPSBI40JERnUJSA8FpKfKH9sd_QNpvg&usqp=CAU',75,0)
var mango = new Product('mango','https://solidstarts.com/wp-content/uploads/Mango_edited-scaled.jpg',60,0)
var strawberry = new Product('strawberry',"https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/20/19/istock-1143163513.jpg?width=1200",80,0)



var displayTotal = document.getElementById("total")
//Array to keep track which items are present in cart to avoid clustering
var addedToCart =[]
var totalPrice = 0;
var cartCount = 0;
var cartList = document.getElementById("cart-list")
var cartCountDisplay = document.getElementById("cart-count")
var row = document.getElementsByClassName('row')[0]


//function to render products on to the DOM
function showProduct(product)
{
    
    var column=document.createElement('div')
    column.classList.add("col-md-4", "mt-5", "d-flex","justify-content-center")  
    column.innerHTML=`
    <div class="card" style="width: 18rem;">
    <img src="${product.imgURL}" class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column text-center">
    <h5 class="card-title">${product.name.toUpperCase()}</h5>
    <p class="card-text">Price: &#8377; <span class="price">${product.price}</span></p>
    <div class="d-flex">
    <button id=${product.name} class="p-0 flex-fill mx-2 font-weight-bold btn btn-primary add-to-cart">+</button>
    <button class="p-0 flex-fill mx-2 font-weight-bold btn btn-primary remove-from-cart">-</button>
    </div>
    </div>
    `    
    row.appendChild(column)
}

//Function to add products to display  
function addProducts()
{
    var products=[apple,orange,watermelon,mango,strawberry]
    products.forEach((product)=> showProduct(product) )
}


function addProductToCart(product)
{   //if statement which makes sure there is no creation of new list item when adding same product
    if(!addedToCart.includes(product.name))
    {   
        
        var listItem=document.createElement('li')
        listItem.classList.add("list-group-item")
        listItem.id=`${product.name}-list`
        listItem.innerHTML=`
        <h5>${product.name.toUpperCase()}</h5>
        Quantity: <div class="d-inline" id="${product.name}quantity">${++product.quantity}</div>
        <div id="${product.name}price">&#8377; ${product.price}</div>
        <img src="${product.imgURL}" class="img-fluid float-right">
        `
        cartList.appendChild(listItem)            
        addedToCart.push(product.name)
        calculateTotalPrice(product,"increment")
    }
    else
    {   
        var updatedQuantity=document.getElementById(`${product.name}quantity`)
        updatedQuantity.innerHTML=++product.quantity
        var updatedPrice=document.getElementById(`${product.name}price`)
        updatedPrice.innerHTML=`Price: &#8377; ${product.quantity*product.price}`
        calculateTotalPrice(product,"increment")            
    }
    displayTotal.innerHTML = `Total : &#8377; ${totalPrice}`

}




function removeProduct(product)
{
    if(product.quantity>=1)
    {   
        --product.quantity;
        decrementCartCount();      
        var updatedQuantity=document.getElementById(`${product.name}quantity`);
        updatedQuantity.innerHTML=product.quantity;
        var updatedPrice=document.getElementById(`${product.name}price`);
        updatedPrice.innerHTML=`Price: &#8377; ${product.quantity*product.price}`;
        calculateTotalPrice(product,"decrement");        
        displayTotal.innerHTML=`Total : &#8377; ${totalPrice}`;
        //if statement which removes the item from list as well as from the addedToCart array
        if(product.quantity==0)
        {   
            document.getElementById(`${product.name}-list`).remove();
            var itemIndex=addedToCart.indexOf(product.name);
            addedToCart.splice(itemIndex, 1);
        }

    }
    else
    {
        alert("Product not present in the cart");
    }   
}




function calculateTotalPrice(product,mode)
{   
    if(mode=="increment")
    {
        totalPrice+=product.price
    }
    else if(mode=="decrement")
    {
        totalPrice-=product.price
    }
}


function incrementCartCount()
{
cartCountDisplay.innerHTML = `${++cartCount}`
}

function decrementCartCount()
{   
    cartCountDisplay.innerHTML=`${--cartCount}`
}
    



document.addEventListener('DOMContentLoaded',()=>
{   
    displayTotal.textContent = "No items in cart"
    
    addProducts();

    var addButtons=document.getElementsByClassName("add-to-cart")
    Array.from(addButtons).forEach(button=>
        {
            button.addEventListener('click',function(event)
            {   
                var inputProduct=event.target.id
                addProductToCart(eval(inputProduct))
                incrementCartCount()
            })
        })



    function handleRemove(event)
            {  
                if(cartCount>0)
                {   
                    var inputProduct=event.target.previousElementSibling.id                   
                    removeProduct(eval(inputProduct))

                    if(cartCount==0)
                    {
                        displayTotal.innerHTML="No items in cart"
                    }
                    
                } 
                else
                {
                    alert("Cart is already empty")
                }
            
            }


    var removeButtons=document.getElementsByClassName("remove-from-cart")
    Array.from(removeButtons).forEach(button =>
        {
            button.addEventListener('click',handleRemove)
        })


})



