const mainSelectedImg = document.querySelector('main .selected-image'),
mainImgOptions = document.querySelectorAll('main .img-option'),
cartRemoveItem = document.querySelector('.cart-item-remove'),
cartItemsCount = document.querySelector('.cart-items-count'),
cartBtn = document.querySelector('.cart-btn'),
cartList = document.querySelector('.cart-list'),
addQuantity = document.querySelector('.add-quantity'),
reduceQuantity = document.querySelector('.reduce-quantity'),
chosenQuantity = document.querySelector('.chosen-quantity'),
addToCartBtn = document.querySelector('.add-to-cart-btn'),
closeMenu = document.querySelector('.navbar-links-container svg'),
navbarLinksContainer = document.querySelector('.navbar-links-container'),
menuIcon = document.querySelector('.header-content .menu-icon');

let quantity = 0,
totalQuantity = 0;

let imgOptionsList = [];

let totalImgs = 4,
imageIndex = 1,
layerImageIndex = 1;

mainSelectedImg.addEventListener('click', createTopLayer);

function createTopLayer() {

    const topLayer = document.createElement('div');
    topLayer.className = 'images-top-layer';
    document.body.appendChild(topLayer);
    
    const imagesGrid = document.createElement('div');
    imagesGrid.className = "images-grid";
    topLayer.appendChild(imagesGrid);

    const closeBtn = document.createElement('button');
    closeBtn.className = "close-btn";
    closeBtn.role = "button";
    closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill-rule="evenodd"/></svg>`;
    imagesGrid.appendChild(closeBtn);

    closeBtn.addEventListener('click', function () {
        topLayer.remove();
        imgOptionsList = [];
    })

    const selectedImg = document.createElement('div');
    selectedImg.className = "selected-img";
    imagesGrid.appendChild(selectedImg);

    const selectedImgElement = document.createElement('img');
    selectedImgElement.src = "imgs/image-product-1.jpg";
    selectedImg.appendChild(selectedImgElement);

    const nextSlideBtn = document.createElement('button');
    nextSlideBtn.className = "slide-next-btn";
    nextSlideBtn.role = "button";
    nextSlideBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="18"><path d="m2 1 8 8-8 8" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>`;
    selectedImg.appendChild(nextSlideBtn);

    nextSlideBtn.addEventListener('click', function () {
        imgOptionsList[layerImageIndex - 1].classList.remove('active');
        layerImageIndex = (layerImageIndex % totalImgs) + 1;
        selectedImgElement.src = `imgs/image-product-${layerImageIndex}.jpg`;
        imgOptionsList[layerImageIndex - 1].classList.add('active');
    })

    const prevSlideBtn = document.createElement('button');
    prevSlideBtn.className = "slide-prev-btn";
    prevSlideBtn.role = "button";
    prevSlideBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="18"><path d="M11 1 3 9l8 8" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>`;
    selectedImg.appendChild(prevSlideBtn);

    prevSlideBtn.addEventListener('click', function () {
        imgOptionsList[layerImageIndex - 1].classList.remove('active');
        layerImageIndex = layerImageIndex - 1 !== 0 ? layerImageIndex - 1 : totalImgs;
        selectedImgElement.src = `imgs/image-product-${layerImageIndex}.jpg`;
        imgOptionsList[layerImageIndex - 1].classList.add('active');
    })


    for (let i = 1; i <= totalImgs; i++) {
        let imgOption = document.createElement('div');
        imgOption.dataset.option = i;
        imgOption.className = 'img-option';
        imgOption.innerHTML = `<img src="imgs/image-product-${i}-thumbnail.jpg" alt="">`;
        imagesGrid.appendChild(imgOption);
        if (i == 1) {
            imgOption.classList.add('active');
        }
        imgOptionsList.push(imgOption);
        
        imgOption.addEventListener('click', function () {
            imgOptionsList[layerImageIndex - 1].classList.remove('active');
            layerImageIndex = i;
            selectedImgElement.src = `imgs/image-product-${layerImageIndex}.jpg`;
            this.classList.add('active');
        });
    }
}

mainImgOptions.forEach((item) => {
    item.addEventListener('click', function () {
        mainImgOptions[imageIndex - 1].classList.remove('active');
        imageIndex = this.dataset.option - 0;
        mainSelectedImg.querySelector('img').src = `imgs/image-product-${imageIndex}.jpg`;
        this.classList.add('active');
    })
});

cartBtn.addEventListener('click', function () {
    if (cartList.style.opacity == "1") {
        cartList.style.opacity = "0";
        cartList.style.visibility = "hidden";
    } else {
        cartList.style.visibility = "visible";
        cartList.style.opacity = "1";
    }
});

addQuantity.addEventListener('click', function () {
    chosenQuantity.textContent = ++quantity;
});

reduceQuantity.addEventListener('click', function () {
    if (quantity > 0) {
        chosenQuantity.textContent = --quantity;
    }
});

addToCartBtn.addEventListener('click', function () {
    if (quantity > 0) {
        totalQuantity += quantity;

        quantity = 0;
        chosenQuantity.textContent = 0;


        cartList.lastElementChild.classList.remove('empty');
        cartList.lastElementChild.innerHTML = ``;

        const cartItem = document.createElement('div');
        cartItem.className = "cart-item";
        cartList.lastElementChild.append(cartItem);
        
        const cartItemImg = document.createElement('div');
        cartItemImg.className = "cart-item-img";
        cartItemImg.innerHTML = `<img src="imgs/image-product-1-thumbnail.jpg">`;
        cartItem.append(cartItemImg);

        const cartItemDesc = document.createElement('div');
        cartItemDesc.className = "cart-item-desc";
        cartItemDesc.innerHTML = `<h4>Fall Limited Edition Sneaker</h4>
            <span class="price-quantity">$125.00 x ${totalQuantity}</span>
            <b class="total-price">$${125 * totalQuantity}.00</b>`;
        cartItem.append(cartItemDesc);
        
        const cartItemRemove = document.createElement('button');
        cartItemRemove.className = "cart-item-remove";
        cartItemRemove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="16"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>`;
        cartItem.append(cartItemRemove);

        cartItemsCount.textContent = totalQuantity;
        cartItemsCount.style.display = 'block';

        cartItemRemove.addEventListener('click', function () {
            cartItemsCount.textContent = '';
            cartItemsCount.style.display = "none";
            this.parentElement.parentElement.classList.add('empty');
            this.parentElement.parentElement.innerHTML = `<p>Your cart is empty</p>`;
            totalQuantity = 0;
        });


        const cartCheckout = document.createElement('div');
        cartCheckout.className = "cart-checkout";
        cartCheckout.innerHTML = `<button role="button" class="checkout-btn">Checkout</button>`;
        cartList.lastElementChild.append(cartCheckout);
    }
});

closeMenu.addEventListener('click', function () {
    navbarLinksContainer.classList.remove('menu-open');
});

menuIcon.addEventListener('click', function () {
    navbarLinksContainer.classList.add('menu-open');
});