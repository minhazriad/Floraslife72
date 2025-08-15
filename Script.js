 <script>
        // Shopping cart functionality
        let cart = [];
        
        function openCart() {
            document.getElementById('cart-modal').classList.remove('hidden');
            updateCartDisplay();
        }
        
        function closeCart() {
            document.getElementById('cart-modal').classList.add('hidden');
        }
        
        function addToCart(name, price, image) {
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }
            
            // Update cart display
            updateCartCount();
            updateCartDisplay();
        }
        
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartCount();
            updateCartDisplay();
        }
        
        function updateQuantity(index, change) {
            const newQuantity = cart[index].quantity + change;
            
            if (newQuantity < 1) {
                removeFromCart(index);
            } else {
                cart[index].quantity = newQuantity;
                updateCartCount();
                updateCartDisplay();
            }
        }
        
        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cart-count').textContent = totalItems;
        }
        
        function updateCartDisplay() {
            const cartItemsContainer = document.getElementById('cart-items');
            const emptyCartDisplay = document.getElementById('empty-cart');
            const cartFooter = document.getElementById('cart-footer');
            
            if (cart.length === 0) {
                emptyCartDisplay.classList.remove('hidden');
                cartFooter.classList.add('hidden');
                cartItemsContainer.innerHTML = '';
            } else {
                emptyCartDisplay.classList.add('hidden');
                cartFooter.classList.remove('hidden');
                
                // Calculate total
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
                
                // Update cart items
                cartItemsContainer.innerHTML = '';
                cart.forEach((item, index) => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('flex');
                    itemElement.innerHTML = `
                        <div class="flex-shrink-0">
                            <img src="${item.image}" alt="${item.name}" class="h-20 w-20 rounded-md object-cover">
                        </div>
                        <div class="ml-4 flex-1 flex flex-col">
                            <div class="flex justify-between text-base font-medium text-gray-900">
                                <h3>${item.name}</h3>
                                <p class="ml-4">$${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div class="flex-1 flex items-end justify-between text-sm">
                                <div class="flex items-center border rounded-md">
                                    <button onclick="updateQuantity(${index}, -1)" class="px-2 py-1 text-gray-600">-</button>
                                    <span class="px-2">${item.quantity}</span>
                                    <button onclick="updateQuantity(${index}, 1)" class="px-2 py-1 text-gray-600">+</button>
                                </div>
                                <button onclick="removeFromCart(${index})" class="text-indigo-600 hover:text-indigo-500">Remove</button>
                            </div>
                        </div>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                });
            }
        }
        
        // Initialize cart button
        document.getElementById('cart-button').addEventListener('click', openCart);
    </script>

    