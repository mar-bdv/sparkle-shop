// import { addContainer } from "../addContainer";

// export class HomePage {
//     static instance = null;

//     constructor() {
//         if (!HomePage.instance) {
//             HomePage.instance = this;
//             this.element = document.createElement('div');
//             this.element.classList.add("homepage");
//             this.containerElement = addContainer(this.element);
//             this.isMounted = false;
//         }
        
//         return HomePage.instance;
//     }

//     mount(parentElement) {
//         if (this.isMounted) {
//             this.addHTML();
//             return;
//         }

//         console.log(parentElement)
//         this.containerElement.innerHTML = "";

//         this.containerElement.insertAdjacentHTML("beforeend", this.addHTML());

//         parentElement.innerHTML = ""; 
//         parentElement.append(this.element);

//         this.isMounted = true;


//         this.addCatalogEvent();
//     }

//     unmount() {
//         if (!this.isMounted) return;
//         this.element.remove();
//         this.isMounted = false;
//     }

//     addHTML() {
//         console.log("homepage.js")
        
//         // return `
//         //     <div class="container"> 

//         //         <video autoplay muted loop id="myVideo">
//         //         <source src="/imgs/for-portfolio2.mp4" type="video/mp4">
//         //         </video>

//         //         <div class="content">
//         //             <h1 class="content__heading">sparkle</h1>
//         //             <p class="content__quote">Украшения — это не просто детали, это история.</p>
                
//         //             <div class="content__buttons">
//         //                 <button class="content__pause" id="myBtn">остановить видео</button>
//         //                 <button class="content__btn"><a href="catalog.html">перейти в каталог</a></button>
//         //             </div>
//         //         </div>
//         //     </div>
//         // `
    
        
//         // const main = document.createElement('main');
//         // main.classList.add('main');

//         document.body.append(this.element);
//         this.isMounted = true;
        
//         const container = document.createElement('div');
//         container.classList.add('container');
        
//         const video = document.createElement('video');
//         video.autoplay = true;
//         video.muted = true;
//         video.loop = true;
//         video.id = 'myVideo';
        
//         const source = document.createElement('source');
//         source.src = '/imgs/for-portfolio2.mp4';
//         source.type = 'video/mp4';
        
//         video.appendChild(source);
        
//         const contentDiv = document.createElement('div');
//         contentDiv.classList.add('content');
        
//         const heading = document.createElement('h1');
//         heading.classList.add('content__heading');
//         heading.textContent = 'sparkle';
        
//         const quote = document.createElement('p');
//         quote.classList.add('content__quote');
//         quote.textContent = 'Украшения — это не просто детали, это история.';
        
//         const buttonsDiv = document.createElement('div');
//         buttonsDiv.classList.add('content__buttons');
        
//         const pauseButton = document.createElement('button');
//         pauseButton.classList.add('content__pause');
//         pauseButton.id = 'myBtn';
//         pauseButton.textContent = 'остановить видео';
        
//         const catalogButton = document.createElement('button');
//         catalogButton.classList.add('content__btn');
        
//         const catalogLink = document.createElement('a');
//         catalogLink.href = 'catalog.html';
//         catalogLink.textContent = 'перейти в каталог';
        
//         catalogButton.appendChild(catalogLink);
//         buttonsDiv.appendChild(pauseButton);
//         buttonsDiv.appendChild(catalogButton);
        
//         contentDiv.appendChild(heading);
//         contentDiv.appendChild(quote);
//         contentDiv.appendChild(buttonsDiv);
        
//         container.appendChild(video);
//         container.appendChild(contentDiv);
//         // main.appendChild(container);

//         this.containerElement.append(container);

//         // document.body.appendChild(main);
//     }

    
//     addCatalogEvent() {
//         const homeButton = document.querySelector('.content__btn');
//         if (homeButton) {
//             homeButton.addEventListener('click', () => {
//                 router.navigate('/catalog');
//             });
//         }
//     }
// }

import { router } from "../../main";
import { addContainer } from "../addContainer";

export class HomePage {
    static instance = null;

    constructor() {
        if (!HomePage.instance) {
            HomePage.instance = this;
            this.element = document.createElement('div');
            this.element.classList.add("homepage");
            this.isMounted = false;
        }
        
        return HomePage.instance;
    }

    mount(parentElement) {
        if (this.isMounted) return;
        
        // Очистка содержимого родительского элемента перед монтированием
        parentElement.innerHTML = ""; 
        parentElement.append(this.element);

        this.renderHTML(); // Рендерим HTML только один раз при монтировании
        
        this.isMounted = true;

        this.addCatalogEvent();  // Добавляем событие на кнопку
    }

    unmount() {
        if (!this.isMounted) return;
        this.element.remove(); // Удаляем элемент из DOM
        this.isMounted = false;
    }

    renderHTML() {
        // Проверка, чтобы не рендерить HTML повторно, если он уже был создан
        if (this.element.innerHTML !== "") return;

        // Создание структуры HTML
        const container = document.createElement('div');
        container.classList.add('container__homepage');

        const video = document.createElement('video');
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.id = 'myVideo';

        const source = document.createElement('source');
        source.src = '/imgs/for-portfolio2.mp4';
        source.type = 'video/mp4';

        video.appendChild(source);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        const heading = document.createElement('h1');
        heading.classList.add('content__heading');
        heading.textContent = 'sparkle';

        const quote = document.createElement('p');
        quote.classList.add('content__quote');
        quote.textContent = 'Украшения — это не просто детали, это история.';

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('content__buttons');

        const pauseButton = document.createElement('button');
        pauseButton.classList.add('content__pause');
        pauseButton.id = 'myBtn';
        pauseButton.textContent = 'остановить видео';

        const catalogButton = document.createElement('button');
        catalogButton.classList.add('content__btn');

        const catalogLink = document.createElement('a');
        catalogLink.href = 'catalog.html';
        catalogLink.textContent = 'перейти в каталог';

        catalogButton.appendChild(catalogLink);
        buttonsDiv.appendChild(pauseButton);
        buttonsDiv.appendChild(catalogButton);

        contentDiv.appendChild(heading);
        contentDiv.appendChild(quote);
        contentDiv.appendChild(buttonsDiv);

        container.appendChild(video);
        container.appendChild(contentDiv);

        this.element.appendChild(container);  // Присоединяем к this.element
    }

    addCatalogEvent() {
        const homeButton = this.element.querySelector('.content__btn a');
        if (homeButton) {
            homeButton.addEventListener('click', (event) => {
                event.preventDefault();
                router.navigate('/catalog');
            });
        }
    }
}


// /* ФИНАЛЬНАЯ ВЕРСИЯ */
// import { router } from "../../main";
// import { addContainer } from "../addContainer";

// export class HomePage {
//     static instance = null;

//     constructor() {
//         if (!HomePage.instance) {
//             HomePage.instance = this;
//             this.element = document.createElement('div');
//             this.element.classList.add("homepage");
//             // Не добавляем второй container
//             // this.containerElement = addContainer(this.element);
//             this.isMounted = false;
//         }
        
//         return HomePage.instance;
//     }

//     mount(parentElement) {
//         // if (this.isMounted) return;
//         if (this.isMounted) {
//             return this;
//         }
//         this.renderHTML();  // Рендерим HTML только один раз
//         parentElement.innerHTML = ""; 
//         parentElement.append(this.element);

//         this.isMounted = true;
//         console.log(parentElement)

//         this.addCatalogEvent();  // Добавляем событие на кнопку
//     }

//     unmount() {
//         if (!this.isMounted) return;
//         this.element.remove();
//         this.isMounted = false;
//     }

//     renderHTML() {
//         // Создание структуры HTML
//         const container = document.createElement('div');
//         container.classList.add('container__homepage');

//         const video = document.createElement('video');
//         video.autoplay = true;
//         video.muted = true;
//         video.loop = true;
//         video.id = 'myVideo';

//         const source = document.createElement('source');
//         source.src = '/imgs/for-portfolio2.mp4';
//         source.type = 'video/mp4';

//         video.appendChild(source);

//         const contentDiv = document.createElement('div');
//         contentDiv.classList.add('content');

//         const heading = document.createElement('h1');
//         heading.classList.add('content__heading');
//         heading.textContent = 'sparkle';

//         const quote = document.createElement('p');
//         quote.classList.add('content__quote');
//         quote.textContent = 'Украшения — это не просто детали, это история.';

//         const buttonsDiv = document.createElement('div');
//         buttonsDiv.classList.add('content__buttons');

//         const pauseButton = document.createElement('button');
//         pauseButton.classList.add('content__pause');
//         pauseButton.id = 'myBtn';
//         pauseButton.textContent = 'остановить видео';

//         const catalogButton = document.createElement('button');
//         catalogButton.classList.add('content__btn');

//         const catalogLink = document.createElement('a');
//         catalogLink.href = 'catalog.html';
//         catalogLink.textContent = 'перейти в каталог';

//         catalogButton.appendChild(catalogLink);
//         buttonsDiv.appendChild(pauseButton);
//         buttonsDiv.appendChild(catalogButton);

//         contentDiv.appendChild(heading);
//         contentDiv.appendChild(quote);
//         contentDiv.appendChild(buttonsDiv);

//         container.appendChild(video);
//         container.appendChild(contentDiv);

//         this.element.appendChild(container);  // Присоединяем к this.element
//     }

//     addCatalogEvent() {
//         const homeButton = document.querySelector('.content__btn a');
//         if (homeButton) {
//             homeButton.addEventListener('click', (event) => {
//                 event.preventDefault();
//                 router.navigate('/catalog');
//             });
//         }
//     }
// }
