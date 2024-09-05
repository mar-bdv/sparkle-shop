import { addContainer } from "../../modules/addContainer";

export class Order {
    static instance = null;

    constructor() {
        if (!Order.instance) {
            Order.instance = this;

            this.element = document.createElement("section");
            this.element.classList.add("order");
            this.containerElement = addContainer(this.element, "order__container");
            this.isMounted = false;
        }
        return Order.instance;
    }

    mount(parentElement, orderData, orderId) {
        if (this.isMounted) {
            return;
        }

        console.log("Mounting order with ID:", orderId); 

        this.containerElement.innerHTML = "";

        const { orders } = orderData;
        
        const order = orders.find(order => String(order.id) === String(orderId));
        if (!order) {
            console.error(`Order with ID ${orderId} not found`);
            parentElement.innerHTML = `
                <div class="not-found">
                    <h2>Заказ не найден</h2>
                    <p>Проверьте правильность номера заказа или <a href="/">вернитесь на главную страницу</a>.</p>
                </div>
            `;
            return;
        }

        this.containerElement.insertAdjacentHTML("beforeend", this.getHTML(order));

        parentElement.innerHTML = ""; 
        parentElement.appendChild(this.element);

        this.isMounted = true;

        this.addEventListeners();
        
    }

    unmount() {
        if (!this.isMounted) return;
        this.element.remove();
        this.isMounted = false;
    }

    getHTML(order) {
        const {
            id,
            name,
            phone,
            email,
            address,
            comments,
            deliveryType,
            paymentType,
            products,
            totalPrice,
            date,
            status
        } = order;   
    

        const formattedDate = new Date(date).toLocaleString(); 

        return `
            <div class="order__header">
                <h4 class="order__header-title">Заказ успешно размещен</h4>
                <p class="order__header-price">${totalPrice} ₽</p>
            </div>
            <div class="order__number">
                <p class="order__number-ordering">№${id}</p>
                <p class="order__date">Дата заказа: ${formattedDate}</p>
            </div>
            <div class="order__info">
                <h4 class="order__info-title">Данные доставки</h4>
                <table class="order__info-table table">
                    <tr class="table__row">
                        <td class="table__field">Получатель</td>
                        <td class="table__value">${name}</td>
                    </tr>
                    <tr class="table__row">
                        <td class="table__field">Телефон</td>
                        <td class="table__value">${phone}</td>
                    </tr>
                    <tr class="table__row">
                        <td class="table__field">E-mail</td>
                        <td class="table__value">${email}</td>
                    </tr>
                    <tr class="table__row">
                        <td class="table__field">Адрес доставки</td>
                        <td class="table__value">${address || 'Не указан'}</td>
                    </tr>
                    <tr class="table__row">
                        <td class="table__field">Способ получения</td>
                        <td class="table__value">${deliveryType === 'pickup' ? 'забрать' : 'доставка'}</td>
                    </tr>
                    <tr class="table__row">
                        <td class="table__field">Способ оплаты</td>
                        <td class="table__value">${paymentType}</td>
                    </tr>
                    
                </table>
                <h4 class="order__products-title">Товары в заказе</h4>
                <ul class="order__products-list">
                    ${products.map(product => {
                        const productData = product && product.product ? product.product : null;
                
                        return `
                            <li class="order__product-item">
                                <div class="order__product-details">
                                    <p class="order__product-name">${productData ? productData.name : 'Название недоступно'}</p>
                                    <p class="order__product-quantity">Количество: ${product.quantity}</p>
                                    <p class="order__product-price">Цена: ${productData ? (productData.price * product.quantity).toLocaleString() : 'Цена недоступна'} ₽</p>
                                </div>
                            </li>
                        `;
                    }).join('')}
                </ul>
                <div class="order__buttons">
                    <button class="order__btn" type="button">На главную</button>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const homeButton = this.containerElement.querySelector('.order__btn-home');
        if (homeButton) {
            homeButton.addEventListener('click', () => {
                router.navigate('/');
            });
        }
    }
}

