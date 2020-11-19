class Product
{
    constructor(name,imgURL,price,quantity)
    {
        this.name=name;
        this.imgURL=imgURL;
        this.quantity=quantity;
        this.price=price;
    }

}

const apple = new Product('apple','https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png',50,0)
const orange = new Product('orange','https://5.imimg.com/data5/VN/YP/MY-33296037/orange-600x600-500x500.jpg',100,0)
const watermelon = new Product('watermelon','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH5STHPSBI40JERnUJSA8FpKfKH9sd_QNpvg&usqp=CAU',75,0)
const mango = new Product('mango','https://solidstarts.com/wp-content/uploads/Mango_edited-scaled.jpg',60,0)
const strawberry = new Product('strawberry',"https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/20/19/istock-1143163513.jpg?width=1200",80,0)



var displayTotal = document.getElementById("total")
displayTotal.textContent = "No items in cart"
var addedToCart=[]
var prices=[]
let total=0;
let cartCount = 0;

class UI
{
    //Function to add products to display  
    static addProducts()
    {
        const products=[apple,orange,watermelon,mango,strawberry]
        products.forEach((product)=> UI.showProduct(product) )
    }


    static showProduct(product)
    {
        const row=document.getElementsByClassName('row')[0]
        const column=document.createElement('div')
        column.classList.add("col-md-4", "mt-5", "d-flex","justify-content-center")  
        column.innerHTML=`
        <div class="card" style="width: 18rem;">
        <img src="${product.imgURL}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column">
        <h5 class="card-title">${product.name.toUpperCase()}</h5>
        <p class="card-text">Price: Rs <span class="price">${product.price}</span></p>
        <button id=${product.name} class="btn btn-primary btn-sm add-to-cart">+</button>
        <button class="btn btn-primary btn-sm remove-from-cart">-</button>
        
        </div>
        `    
        row.appendChild(column)
    }

    static addProductToCart(product)
    {   
        if(!addedToCart.includes(product.name))
        {   UI.calculatePrice(product,"increment")
            const list=document.getElementById("cart-list")
            const listItem=document.createElement('li')
            listItem.classList.add("list-group-item")
            listItem.id=`${product.name}-list`
            listItem.innerHTML=`
            <h5>${product.name.toUpperCase()}</h5>Quantity:  <div class="d-inline" id="${product.name}quantity">${++product.quantity}</div><div id="${product.name}price">Rs ${product.price}</div><img src="${product.imgURL}" class="img-fluid float-right">

            `
            list.appendChild(listItem)
            
            addedToCart.push(product.name)
            console.log(addedToCart)
        }
        else
        {   
            let updatedQuantity=document.getElementById(`${product.name}quantity`)
            updatedQuantity.innerHTML=++product.quantity
            let updatedPrice=document.getElementById(`${product.name}price`)
            updatedPrice.innerHTML=`Rs ${product.quantity*product.price}`
            UI.calculatePrice(product,"increment")
            console.log("Total Price "+ total )
            
        }
        displayTotal.innerHTML = `Total : Rs ${total}`
    
    }

    static removeProduct(product)
    {
        if(product.quantity>=1)
        {   --product.quantity
            UI.decrementCartCount()      
            let updatedQuantity=document.getElementById(`${product.name}quantity`)
            updatedQuantity.innerHTML=product.quantity
            let updatedPrice=document.getElementById(`${product.name}price`)
            updatedPrice.innerHTML=`Rs ${product.quantity*product.price}`
            UI.calculatePrice(product,"decrement")           
            displayTotal.innerHTML=`Total : Rs ${total}`
            if(product.quantity==0)
            {   
                document.getElementById(`${product.name}-list`).remove();;
                let itemIndex=addedToCart.indexOf(product.name)
                addedToCart.splice(itemIndex, 1);
            }

        }
        else
        {
            alert("Product not present in the cart")
        }
       
        
    }

    //function to display added products
    


    static calculatePrice(product,mode)
    {   
        if(mode=="increment")
        {
            total+=product.price
        }
        else if(mode=="decrement")
        {
            total-=product.price
        }
    }


    static incrementCartCount()
    {
    var cartCountDisplay = document.getElementById("product-count")
    cartCountDisplay.innerHTML = `${++cartCount}`
    }

    static decrementCartCount()
    {   var cartCountDisplay = document.getElementById("product-count")
        cartCountDisplay.innerHTML=`${--cartCount}`
    }


}



UI.addProducts()



let addButtons=document.getElementsByClassName("add-to-cart")
Array.from(addButtons).forEach(button=>
    {
        button.addEventListener('click',function(event)
        {   
            let input=event.target.id
            UI.addProductToCart(eval(input))
            UI.incrementCartCount()
        })
    })


let removeButtons=document.getElementsByClassName("remove-from-cart")

function removeProductNew(event)
         {  if(cartCount>0)
            {   let input=event.target.previousElementSibling.id
                
                UI.removeProduct(eval(input))
            } 
            else
            {
                alert("Cart is already empty")
            }

        }



Array.from(removeButtons).forEach(button =>
    {
        button.addEventListener('click',removeProductNew)
    })
