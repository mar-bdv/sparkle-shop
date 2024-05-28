import { API_URL } from "../../const";
import { CartButton } from "../CartButton/CartButton";
import { LikeButton } from "../LikeButton/LikeButton";

export class Card {
    constructor({id, image, title, price, category}) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.price = price;
        this.category = category;
        this.cartButton = new CartButton('card__btn');
        this.likeButton = new LikeButton('card__favorite');
        
    }

    create() {
        // console.log(`${API_URL}`)
        // console.log(this.category)

        const article = document.createElement('article');
        article.classList.add('goods__card', 'card');

        const link = document.createElement('a');
        link.classList.add('card__link', 'card__link_img');
        link.href = `/product/${this.id}`;

        const img = document.createElement('img');
        img.classList.add('card__img');
        img.src = `${this.image}`;
        img.alt = this.title;
        link.append(img);

        const info = document.createElement('div');
        info.classList.add('card__info');

        const title = document.createElement('h3');
        title.classList.add('card__title');

        const linkTitle = document.createElement('a');
        linkTitle.classList.add('card__link');
        linkTitle.href = `/product/${this.id}`;
        linkTitle.textContent = this.title;
        title.append(linkTitle);

        const price = document.createElement('p');
        price.classList.add('card__price');
        price.innerHTML = `${this.price.toLocaleString()}&nbsp;₽`;
        info.append(title, price);

        const btnCart = this.cartButton.create(this.id);
        const btnFavorite = this.likeButton.create(this.id);

        article.append(link, info, btnCart, btnFavorite);

        return article;
    }

}

/** 
// 
    <button class="card__btn" data-id="${id}">
//                 <svg width="26" height="24" viewBox="0 0 26 24" 
//                 fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <rect width="26" height="24" rx="12" fill="none"/>
//                 <path d="M13 4.875C14.2081 4.875 15.1875 5.85438 15.1875 7.0625V7.5H10.8125V7.0625C10.8125 5.85438 11.7919 4.875 13 4.875ZM16.0625 7.5V7.0625C16.0625 5.37113 14.6914 4 13 4C11.3086 4 9.9375 5.37113 9.9375 7.0625V7.5H6.875V16.25C6.875 17.2165 7.6585 18 8.625 18H17.375C18.3415 18 19.125 17.2165 19.125 16.25V7.5H16.0625ZM7.75 8.375H18.25V16.25C18.25 16.7332 17.8582 17.125 17.375 17.125H8.625C8.14175 17.125 7.75 16.7332 7.75 16.25V8.375Z" 
//                 fill="none"
//                 stroke="currentColor" />
//                 </svg>

//             </button>

//             <button class="card__favorite" data-id="${id}">
//                 <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.314C13.4384 -2.24799 24.5343 5.7355 9 16C-6.53427 5.7355 4.56164 -2.24799 9 2.314Z" fill="white"/>
//                     <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.314C13.4384 -2.24799 24.5343 5.7355 9 16C-6.53427 5.7355 4.56164 -2.24799 9 2.314Z" stroke="black"/>
//                     <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.314C13.4384 -2.24799 24.5343 5.7355 9 16C-6.53427 5.7355 4.56164 -2.24799 9 2.314Z" stroke="#F2F2F2" stroke-opacity="0.2"/>
//                 </svg>
                
//             </button>

getHTMLTemplateListItem({id, images: [image], name: title, price, category}) {
//     return `
//         <article class="goods__card card">
//             <a href="/product/${id}" class="card__link card__link_img">
//                 <img src="${image}" 
//                 alt="${title}" 
//                 class="card__img">
//             </a>

//             <div class="card__info">
//             <h3 class="card__title">
//                 <a href="/product/${id}" class="card__link">
//                 ${title}              
//                 </a>
//             </h3>
//             </div>

//             <p class="card__price">${price.toLocaleString()}&nbsp;₽</p>


//             <button class="card__btn" data-id="${id}">
//                 <svg width="26" height="24" viewBox="0 0 26 24" 
//                 fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <rect width="26" height="24" rx="12" fill="none"/>
//                 <path d="M13 4.875C14.2081 4.875 15.1875 5.85438 15.1875 7.0625V7.5H10.8125V7.0625C10.8125 5.85438 11.7919 4.875 13 4.875ZM16.0625 7.5V7.0625C16.0625 5.37113 14.6914 4 13 4C11.3086 4 9.9375 5.37113 9.9375 7.0625V7.5H6.875V16.25C6.875 17.2165 7.6585 18 8.625 18H17.375C18.3415 18 19.125 17.2165 19.125 16.25V7.5H16.0625ZM7.75 8.375H18.25V16.25C18.25 16.7332 17.8582 17.125 17.375 17.125H8.625C8.14175 17.125 7.75 16.7332 7.75 16.25V8.375Z" 
//                 fill="none"
//                 stroke="currentColor" />
//                 </svg>

//             </button>

//             <button class="card__favorite" data-id="${id}">
//                 <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.314C13.4384 -2.24799 24.5343 5.7355 9 16C-6.53427 5.7355 4.56164 -2.24799 9 2.314Z" fill="white"/>
//                     <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.314C13.4384 -2.24799 24.5343 5.7355 9 16C-6.53427 5.7355 4.56164 -2.24799 9 2.314Z" stroke="black"/>
//                     <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.314C13.4384 -2.24799 24.5343 5.7355 9 16C-6.53427 5.7355 4.56164 -2.24799 9 2.314Z" stroke="#F2F2F2" stroke-opacity="0.2"/>
//                 </svg>
                
//             </button>
//         </article>
//     `
// }
*/