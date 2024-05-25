import { cartSvg } from "../cartSvg/cartSvg";

export class CartButton {
    constructor(className) {
        this.className = className
    }

    create(id) {
        const button = document.createElement('button');
        button.classList.add(this.className);
        button.dataset.id = id;

        button.addEventListener('click', () => {
            console.log("добавить товар в корзину")
        })

        button.innerHTML = cartSvg();


        return button
    }
}