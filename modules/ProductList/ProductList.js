// import { Card } from "../../features/Card/Card";
// import { addContainer } from "../addContainer";

// export class ProductList {
//     static instance = null;

//     constructor() {
//         if (!ProductList.instance) {
//             ProductList.instance = this;
//             this.element = document.createElement('section');
//             this.element.classList.add('goods');
//             this.containerElement = addContainer(this.element, 'goods__container');
//             this.isMounted = false;
//             this.addEvents();
//         }
//         return ProductList.instance;
//     }

//     mount(parent, data, title, emptyText) {
//         this.containerElement.textContent = '';

//         const titleElem = document.createElement("h2");
//         titleElem.textContent = title ? title : 'Список товаров';
//         titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';

//         this.containerElement.append(titleElem);

//         console.log('Data received in mount:', data);  // Логирование данных

//         if (data && data.length > 0) {
//             this.updateListElem(data);
//         } else {
//             this.containerElement.insertAdjacentHTML(
//                 'beforeend', `
//                 <p class="goods__empty">${emptyText || "Произошла ошибка. Попробуйте снова"}</p>`
//             );
//         }

//         if (this.isMounted) {
//             return;
//         }

//         parent.append(this.element);
//         this.isMounted = true;
//     }

//     unmount() {
//         this.element.remove();
//         this.isMounted = false;
//     }

//     addEvents() {
//         // Add any required event listeners
//     }
    

//     updateListElem(data = []) {
//         console.log('Data in updateListElem:', data);  // Логирование данных

//         if (!Array.isArray(data)) {
//             console.error('Expected data to be an array but got:', data);
//             return;
//         }

//         const listElem = document.createElement('ul');
//         listElem.classList.add('goods__list');
//         const listItems = data.map(({ id, images: [image], name: title, price, category }) => {
//             const listItemElem = document.createElement('li');
//             listItemElem.append(new Card({ id, image, title, price, category }).create());
//             return listItemElem;
//         });

//         listElem.append(...listItems);
//         this.containerElement.append(listElem);
//     }
// }

// import { Card } from "../../features/Card/Card";
// import { addContainer } from "../addContainer";

// export class ProductList {
//     static instance = null;

//     constructor() {
//         if (!ProductList.instance) {
//             ProductList.instance = this;
//             this.element = document.createElement('section');
//             this.element.classList.add('goods');
//             this.containerElement = addContainer(this.element, 'goods__container');
//             this.isMounted = false;
//             this.addEvents();
//         }
//         return ProductList.instance;
//     }

//     mount(parent, data, title, emptyText) {
//         this.containerElement.textContent = '';

//         const titleElem = document.createElement("h2");
//         titleElem.textContent = title ? title : 'Список товаров';
//         titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';

//         this.containerElement.append(titleElem);

//         console.log('Data received in mount:', data);  // Логирование данных

//         if (data && data.length > 0) {
//             this.updateListElem(data);
//         } else {
//             this.containerElement.insertAdjacentHTML(
//                 'beforeend', `
//                 <p class="goods__empty">${emptyText || "Произошла ошибка. Попробуйте снова"}</p>`
//             );
//         }

//         if (this.isMounted) {
//             return;
//         }

//         parent.append(this.element);
//         this.isMounted = true;
//     }

//     unmount() {
//         this.element.remove();
//         this.isMounted = false;
//     }

//     addEvents() {
//         // Add any required event listeners
//     }

//     updateListElem(data = []) {
//         console.log('Data in updateListElem:', data);  // Логирование данных

//         if (!Array.isArray(data)) {
//             console.error('Expected data to be an array but got:', data);
//             return;
//         }

//         const listElem = document.createElement('ul');
//         listElem.classList.add('goods__list');
//         const listItems = data.map(({ id, images: [image], name: title, price, category }) => {
//             const listItemElem = document.createElement('li');
//             listItemElem.append(new Card({ id, image, title, price, category }).create());
//             return listItemElem;
//         });

//         listElem.append(...listItems);
//         this.containerElement.append(listElem);
//     }
// }

// import { Card } from "../../features/Card/Card";
// import { addContainer } from "../addContainer";

// export class ProductList {
//     static instance = null;

//     constructor() {
//         if (!ProductList.instance) {
//             ProductList.instance = this; 

//             this.element = document.createElement("section");
//             this.element.classList.add("goods");
//             this.containerElement = addContainer(this.element, "goods__container");
//             this.isMounted = false;

//             this.addEvents();
//         }

//         return ProductList.instance;
//     }

//     mount(parent, data, title, emptyText) {

//         this.containerElement.textContent = '';
//         console.log('Data received in mount:', data); // Логирование данных

//         const titleElem = document.createElement("h2");
//         titleElem.textContent = title ? title : 'Список товаров';
//         titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';

//         this.containerElement.append(titleElem);

//         if (data && data.length) {
//             this.updateListElem(data)
//         } else {
//             this.containerElement.insertAdjacentHTML(
//                 'beforeend', `
//                 <p class="goods__empty"> ${emptyText || "Произошла ошибка. Попробуйте снова"} </p>`)
//         }

//         if (this.isMounted) {
//             return;
//         }

//         parent.append(this.element);
        
//         this.isMounted = true;
//     }

//     unmount() {
//         this.element.remove();
//         this.isMounted = false;
//     }

//     addEvents() {

//     } 

//     updateListElem(data = []) {
//         const listElem = document.createElement('ul');
//         listElem.classList.add('goods__list');

//         const listItems = data.map(
//             ({id, images: [image], name: title, price}) => {
//             const listItemElem = document.createElement("li");
//             listItemElem.append(new Card({id, image, title, price}).create())

//             return listItemElem;
//         });

//         listElem.append(...listItems);
//         this.containerElement.append(listElem)
//     }
    
    

// }

// МОЯ ВЕРСИЯ 1
import { Card } from "../../features/Card/Card";
import { addContainer } from "../addContainer";

export class ProductList {
    static instance = null;

    constructor() {
        if (!ProductList.instance) {
            ProductList.instance = this;
            this.element = document.createElement('section');
            this.element.classList.add('goods');
            this.containerElement = addContainer(this.element, 'goods__container');
            this.isMounted = false;
            this.addEvents();
        }
        return ProductList.instance;
    }
    
        
    mount(parent, data, title, emptyText) {
        this.containerElement.textContent = '';

        const titleElem = document.createElement("h2");
        titleElem.textContent = title ? title : 'Список товаров';
        titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';

        this.containerElement.append(titleElem);

        console.log('Data received in mount:', data)

        
        if (data && data.length > 0) {
            this.updateListElem(data);
        } else {
            this.containerElement.insertAdjacentHTML(
                'beforeend', `
                <p class="goods__empty">${emptyText || "Произошла ошибка. Попробуйте снова"}</p>`
            );
        }

        if (this.isMounted) {
            return;
        }

        parent.append(this.element);
        this.isMounted = true;
    }

    

    unmount() {
        this.element.remove();
        this.isMounted = false;
    }

    addEvents() {
        }

    updateListElem(data = []) {
        if (!Array.isArray(data)) {
            console.error('Expected data to be an array but got:', data);
            return;
        }

        const listElem = document.createElement('ul');
        listElem.classList.add('goods__list');
        const listItems = data.map(({ id, images: [image], name: title, price, category }) => {
            const listItemElem = document.createElement('li');
            listItemElem.append(new Card({ id, image, title, price, category }).create());
            return listItemElem;
        });

        listElem.append(...listItems);
        this.containerElement.append(listElem);
    }
}


// import { Card } from "../../features/Card/Card";
// import { addContainer } from "../addContainer";

// export class ProductList {
//     static instance = null;

//     constructor() {
//         if (!ProductList.instance) {
//             ProductList.instance = this;
//             this.element = document.createElement('section');
//             this.element.classList.add('goods');
//             this.containerElement = addContainer(this.element, 'goods__container')
//             this.isMounted = false;

//             this.addEvents();

//         }

//         return ProductList.instance;
//     }

//     mount(parent, data, title, emptyText) {

//         this.containerElement.textContent = '';

//         const titleElem = document.createElement("h2");
//         titleElem.textContent = title ? title : 'Список товаров';
//         titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';

//         this.containerElement.append(titleElem);
//         console.log('Data received in mount:', data); // Логирование данных

//         if (data && data.length) {
//             this.updateListElem(data);
//             console.log(data)
//         } else {
//             this.containerElement.insertAdjacentHTML(
//                 'beforeend', `
//                 <p class="goods__empty"> ${emptyText || "Произошла ошибка. Попробуйте снова"} </p>`)
//         }

//         if (this.isMounted) {
//             return;
//         }

//         parent.append(this.element);
        
//         this.isMounted = true;
//     }

//     unmount() {
//         this.element.remove();
//         this.isMounted = false;
//     }



//     addEvents() {

//     }

//     updateListElem(data = []) {
//         const listElem = document.createElement('ul');
//         listElem.classList.add('goods__list');

//         const listItems = data.map(({id, images: [image], name: title, price, category}) => {
//             const listItemElem = document.createElement('li');
//             listItemElem.append(new Card({id, image, title, price, category}).create());

//             return listItemElem;
//         })
        
//         listElem.append(...listItems);
//         this.containerElement.append(listElem);

//     }

    
// }