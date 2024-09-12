// import { ApiService } from "../../services/ApiService";
// import { addContainer } from "../addContainer";

// export class Catalog { 
//     static instance = null;

//     constructor() {
//         if (!Catalog.instance) {
//             Catalog.instance = this;
//             this.element = document.createElement('nav');
//             this.element.classList.add("catalog");
//             this.containerElement = addContainer(this.element, 'catalog__container');
//             this.isMounted = false;
//             this.linksList = []

//         }

//         return Catalog.instance;
//     }

//     async getData() {
//         this.catalogData = await new ApiService().getProductCategories();
//     }

//     async mount(parent) {
//         if (this.isMounted) {
//             return this;
//         }

//         if(!this.catalogData) {
//             await this.getData();
//             this.renderListElem(this.catalogData);
//         }
        
//         parent.prepend(this.element);
//         this.isMounted = true;
//         return this;

//     }

//     unmount() {
//         this.element.remove();
//         this.isMounted = false
//     }

//     renderListElem({products}) {
//         const listElem = document.createElement('ul');
//         listElem.classList.add("catalog__list");

//         const uniqueCategories = [...new Set(products.map(({ category }) => category))];

//         const listItems = uniqueCategories.map((category) => {
//             const listItemElem = document.createElement("li");
//             listItemElem.classList.add("catalog__item");

//             const link = document.createElement("a");
//             this.linksList.push(link);
            
//             link.classList.add("catalog__link");
//             link.href = `/category?slug=${category}`;
//             link.textContent = category;

//             listItemElem.append( link);
//             return listItemElem;
//         }); 
//         listElem.append(...listItems);

//         this.containerElement.append(listElem);
//     }

//     setActiveLink(slug) {
//         const encodedSlug = encodeURIComponent(slug);
//         this.linksList.forEach(link => {
//             const linkSlug = new URL(link.href).searchParams.get('slug');
//             if (encodeURIComponent(linkSlug) === encodedSlug) {
//                 link.classList.add('catalog__link_active')
//             }
//             else {
//                 link.classList.remove('catalog__link_active')

//             }
//         })
//     }
    
// }

import { ApiService } from "../../services/ApiService";
import { addContainer } from "../addContainer";

export class Catalog { 
    static instance = null;

    constructor() {
        if (!Catalog.instance) {
            Catalog.instance = this;
            this.element = document.createElement('nav');
            this.element.classList.add("catalog");
            this.containerElement = addContainer(this.element, 'catalog__container');
            this.isMounted = false;
            this.linksList = [];
            this.catalogData = null; // Перемещаем catalogData сюда

        }

        return Catalog.instance;
    }

    async getData() {
        try {
            if (!this.catalogData) {
                this.catalogData = await new ApiService().getProductCategories();
            }
        } catch (error) {
            console.error('Error loading categories:', error);
            this.catalogData = { products: [] }; // или любое сообщение об ошибке
        }
        // if (!this.catalogData) {
        //     this.catalogData = await new ApiService().getProductCategories();
        // }
    }

    // async mount(parent) {
    //     if (this.isMounted) {
    //         return;
    //     }

    //     if (!this.catalogData) {
    //         await this.getData();
    //         this.renderListElem(this.catalogData);
    //     }

    //     parent.prepend(this.element);
    //     this.isMounted = true;
    // }

    // unmount() {
    //     this.element.remove();
    //     this.isMounted = false;
    // }

    // async mount(parent) {

    //     if (this.isMounted) {
    //         return this;
    //     }
    //     this.isMounted = true; // Ставим флаг сразу, чтобы избежать повторного вызова
    
    //     if(!this.catalogData) {
    //         await this.getData();

    //         this.renderListElem(this.catalogData);
    //     }
        
    //     parent.prepend(this.element);
    //     return this;
    // }
    async mount(parent) {
        if (this.isMounted) {
            return this;
        }
        this.isMounted = true;
    
        await this.getData();
        this.renderListElem(this.catalogData);
    
        parent.prepend(this.element);
        return this;
    }
    
    unmount() {
        // if (!this.isMounted) return;
    
        // this.element.innerHTML = ''; // Очистим контент
        // this.element.remove(); // Удалим сам элемент
        // this.isMounted = false;  
        if (!this.isMounted) return;

        this.containerElement.innerHTML = ''; // Очистка контейнера при демонтировании
        this.element.remove(); // Удаление элемента
        this.isMounted = false;
    }

    renderListElem({products}) {
        this.containerElement.innerHTML = ''; // Очистка контейнера перед отрисовкой


        if (this.element.querySelector(".catalog__list")) return; // Проверяем, если список уже есть, не рендерим его снова

        const listElem = document.createElement('ul');
        listElem.classList.add("catalog__list");

        const uniqueCategories = [...new Set(products.map(({ category }) => category))];

        const listItems = uniqueCategories.map((category) => {
            const listItemElem = document.createElement("li");
            listItemElem.classList.add("catalog__item");

            const link = document.createElement("a");
            this.linksList.push(link);
            
            link.classList.add("catalog__link");
            link.href = `/category?slug=${category}`;
            link.textContent = category;

            listItemElem.append(link);
            return listItemElem;
        }); 
        listElem.append(...listItems);

        this.containerElement.append(listElem);
    }

    setActiveLink(slug) {
        const encodedSlug = encodeURIComponent(slug);
        this.linksList.forEach(link => {
            const linkSlug = new URL(link.href).searchParams.get('slug');
            if (encodeURIComponent(linkSlug) === encodedSlug) {
                link.classList.add('catalog__link_active');
            } else {
                link.classList.remove('catalog__link_active');
            }
        });
    }
}
