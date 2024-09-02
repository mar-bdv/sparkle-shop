import { router } from "../../main";
import { addContainer } from "../../modules/addContainer";

export class BreadCrumbs {
    static instance = null;

    constructor() {
        if (!BreadCrumbs.instance) {
            BreadCrumbs.instance = this;
            this.element = document.createElement('div');
            this.element.classList.add('breadcrumb');
            this.containerElement = addContainer(this.element);
            this.isMounted = false;
        }

        return BreadCrumbs.instance
    }

    checkPrevData(data) {
        let isSame = false; 
        if (!this.prevData) {
            this.prevData = data;
        }

        isSame = data.every((item, i) => {
            return item.text === this.prevData[i].text
        });

        this.prevData = data;
        return isSame;
    }   

    mount(parent, data) {
        if (this.isMounted && this.checkPrevData(data)) {
            return;
        }

        if (this.isMounted) {
            this.render(data);
            return;
        }

        this.render(data);
        parent.append(this.element);
        this.isMounted = true;
        router.updatePageLinks();
    }

    unmount() {
        this.isMounted = false;

        this.element.remove();
    }

    render(list) {
        this.containerElement.textContent = '';
        const listElem = document.createElement('ul');
        listElem.classList.add('breadcrumb__list');

        const breadCrumbList = [
            {text: 'Главная', href: '/'}, ...list
        ];

        const listItems = breadCrumbList.map(item => {
            const listItemElem = document.createElement('li');
            listItemElem.classList.add('breadcrumb__item');
            
            const link = document.createElement('a');
            link.classList.add('breadcrumb__link');

            link.textContent = item.text;

            if (item.href) {
                link.href = item.href;
            }

            const separator = document.createElement('span');
            separator.classList.add('breadcrumb__separator')
            separator.innerHTML = '&gt;';

            listItemElem.append(link, separator);

            return listItemElem
        });

        listElem.append(...listItems)

        this.containerElement.append(listElem);
    }
}