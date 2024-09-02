import { Logo } from "../../features/Logo/Logo";
import { likeSvg } from "../../features/likeSvg/likeSvg";
import { router } from "../../main";
import { addContainer } from "../addContainer";

export class Header { 
    static instance = null;

    constructor() {
        if (!Header.instance) {
            Header.instance = this;

            this.element = document.createElement('header');
            this.element.classList.add('header');
            this.containerElement = addContainer(this.element, "header__container");
            this.isMounted = false;

        }
        return Header.instance;
    }

    mount() {
        if (this.isMounted) {
            return;
        }

        const logo = new Logo('header').create();
        const searchForm = this.getSearchForm();
        const navigation = this.getNavigation();

        this.containerElement.append(logo, searchForm, navigation)
        
        document.body.append(this.element);
        this.isMounted = true;
        
    }

    unmount() {
        this.element.remove();
        this.isMounted = false
    }



    getSearchForm() {
        const searchForm = document.createElement("form");
        searchForm.classList.add("header__search");
        searchForm.method = "get";

        const input = document.createElement("input");
        input.classList.add("header__input");
        input.type="search";
        input.name="search";
        input.placeholder="Введите запрос или артикул";

        const button = document.createElement("button");
        button.classList.add("header__btn"),
        button.type = "submit";
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.66671 13.9999C11.1645 13.9999 14 11.1644 14 7.66659C14 4.16878 11.1645 1.33325 7.66671 1.33325C4.1689 1.33325 1.33337 4.16878 1.33337 7.66659C1.33337 11.1644 4.1689 13.9999 7.66671 13.9999Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M14.6667 14.6666L13.3334 13.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        
        searchForm.addEventListener('submit', e => {
            e.preventDefault();
            router.navigate(`/search?q=${encodeURIComponent(input.value)}`);
        })
        
        searchForm.append(input, button);
        return searchForm;
    }

    getNavigation() {
        const navigation = document.createElement("nav");
        navigation.classList.add("header__control");

        const favoriteLink = document.createElement("a");
        favoriteLink.classList.add("header__link");
        favoriteLink.href="/favorite";

        favoriteLink.innerHTML = `
        <span class="header__link-text"></span>
            <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.29383L10.9249 3.14271C8.39835 0.437604 3.77122 1.3714 2.10054 4.77006C1.3148 6.36848 1.13813 8.67573 2.57144
                    11.6212C3.95186 14.458 6.82151 17.8538 12 21.554C17.1785 17.8538 20.0481 14.458 21.4286 11.6212C22.8619 8.67573 22.6852 6.36848 21.8995 
                    4.77006C20.2288 1.3714 15.6016 0.437604 13.0751 3.14271L12 4.29383ZM12 23.4375C-10.9997 7.60689 4.91814 -4.75136 11.7365 1.78607C11.8259 
                    1.87183 11.9138 1.96084 12 2.05313C12.0862 1.96084 12.1741 1.87183 12.2635 1.78608C19.0818 -4.75137 34.9997 7.60688 12 23.4375Z"
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
            </svg>
        `;
        
        const cartLink = document.createElement("a");
        cartLink.classList.add("header__link");
        cartLink.href="/cart";

        const linkText = document.createElement("span");
        linkText.classList.add("header__link-text");

        const countElement = document.createElement("span");
        countElement.classList.add("header__count");
        countElement.textContent = "(0)";

        cartLink.append(linkText, countElement);
        cartLink.insertAdjacentHTML(
            "beforeend",
            `
            <svg width="25" height="25" viewBox="0 0 25 25" 
                fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 1.5625C14.6574 1.5625 16.4062 3.31139 16.4062 5.46875V6.25H8.59375V5.46875C8.59375 3.31139 10.3426 1.5625 
                    12.5 1.5625ZM17.9688 6.25V5.46875C17.9688 2.44844 15.5203 0 12.5 0C9.47969 0 7.03125 2.44844 7.03125 5.46875V6.25H1.5625V21.875C1.5625 
                    23.6009 2.96161 25 4.6875 25H20.3125C22.0384 25 23.4375 23.6009 23.4375 21.875V6.25H17.9688ZM3.125 7.8125H21.875V21.875C21.875 22.7379 
                    21.1754 23.4375 20.3125 23.4375H4.6875C3.82455 23.4375 3.125 22.7379 3.125 21.875V7.8125Z" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"/>
            `);


        navigation.append(favoriteLink, cartLink);

        this.countElement = countElement;
        return navigation;
    }

    changeCount(n) {
        this.countElement.textContent = `(${n})`;
    }
}



