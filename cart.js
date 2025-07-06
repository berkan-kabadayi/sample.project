// Ürünler her zaman dış JSON dosyasından yüklenecek
let products = [];

const SHIPPING_COST = 3.00;
let appliedCoupon = '';

const COUPONS = {
    'MEYVE10': {
        type: 'percent',
        value: 10,
        desc: '%10 indirim'
    },
    'KARGOBEDAVA': {
        type: 'freeship',
        desc: 'Kargo bedava'
    },
    '5TLINDIRIM': {
        type: 'fixed',
        value: 5,
        desc: '5₺ indirim'
    }
};

async function loadProductsFromJson() {
    const response = await fetch('vegetablesData.json.json');
    const data = await response.json();
    if (Array.isArray(data.products)) {
        products = data.products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.discountPrice !== null && p.discountPrice !== undefined ? p.discountPrice : p.price,
            image: p.image,
            quantity: 1
        }));
    } else {
        products = [];
    }
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTable = document.querySelector('.cart-table');
    const cartActions = document.querySelector('.cart-actions');
    const cartSummary = document.querySelector('.cart-summary');
    const cartEmpty = document.getElementById('cart-empty');
    cartItems.innerHTML = '';
    if (products.length === 0) {
        cartTable.style.display = 'none';
        cartActions.style.display = 'none';
        cartSummary.style.display = 'none';
        cartEmpty.style.display = 'block';
        return;
    } else {
        cartTable.style.display = '';
        cartActions.style.display = '';
        cartSummary.style.display = '';
        cartEmpty.style.display = 'none';
    }
    let subtotal = 0;
    products.forEach((product, idx) => {
        const total = product.price * product.quantity;
        subtotal += total;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>₺${product.price.toFixed(2)}</td>
            <td>
                <button class="qty-btn" data-idx="${idx}" data-action="decrease">-</button>
                <span class="qty">${product.quantity}</span>
                <button class="qty-btn" data-idx="${idx}" data-action="increase">+</button>
            </td>
            <td>₺${total.toFixed(2)}</td>
            <td><button class="remove-btn" data-idx="${idx}">Kaldır</button></td>
        `;
        cartItems.appendChild(tr);
    });
    let shipping = SHIPPING_COST;
    let discount = 0;
    if (appliedCoupon && COUPONS[appliedCoupon]) {
        const c = COUPONS[appliedCoupon];
        if (c.type === 'percent') {
            discount = subtotal * (c.value / 100);
        } else if (c.type === 'fixed') {
            discount = c.value;
        } else if (c.type === 'freeship') {
            shipping = 0;
        }
    }
    document.getElementById('subtotal').textContent = `₺${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `₺${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `₺${(subtotal - discount + shipping).toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadProductsFromJson();
    renderCart();
    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('qty-btn')) {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            const action = e.target.getAttribute('data-action');
            if (action === 'increase') {
                products[idx].quantity++;
            } else if (action === 'decrease' && products[idx].quantity > 1) {
                products[idx].quantity--;
            }
            renderCart();
        } else if (e.target.classList.contains('remove-btn')) {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            products.splice(idx, 1);
            renderCart();
        }
    });
    document.getElementById('apply-coupon').addEventListener('click', () => {
        const coupon = document.getElementById('coupon').value.trim().toUpperCase();
        if (COUPONS[coupon]) {
            appliedCoupon = coupon;
            alert('Kupon uygulandı! ' + COUPONS[coupon].desc);
        } else {
            appliedCoupon = '';
            if (coupon) alert('Geçersiz kupon!');
        }
        renderCart();
    });
}); 