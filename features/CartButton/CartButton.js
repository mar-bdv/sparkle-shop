import { Header } from "../../modules/Header/Header";
import { ApiService } from "../../services/ApiService";
import { cartSvg } from "../cartSvg/cartSvg";

export class CartButton {
    constructor (className, text, withIcon = false) {
        this.text = text;
        this.className = className;
        this.withIcon = withIcon; // Новое свойство для иконки
    }

    create(id) {
        const button = document.createElement('button');
        button.classList.add(this.className);
        button.dataset.id = id;
        // button.textContent = this.text;

        button.addEventListener('click', async () => {
            
            const  { cart: { totalQuantity } } 
                = await new ApiService().postProductToCard(id);
            
            new Header().changeCount(totalQuantity)
        
        })

        // button.innerHTML = cartSvg();


        if (this.withIcon) {
            button.innerHTML = `${cartSvg()} ${this.text}`;
        } else {
            button.textContent = this.text;
        }
        return button
    }
}