

// import { router } from "../../main";
// import { addContainer } from "../addContainer";

// export class HomePage {
//     static instance = null;

//     constructor() {
//         if (!HomePage.instance) {
//             HomePage.instance = this;
//             this.element = document.createElement('div');
//             this.element.classList.add("homepage");
//             this.isMounted = false;
//         }
        
//         return HomePage.instance;
//     }

//     mount(parentElement) {
//         if (this.isMounted) return;
        
//         // Очистка содержимого родительского элемента перед монтированием
//         parentElement.innerHTML = ""; 
//         parentElement.append(this.element);

//         this.renderHTML(); // Рендерим HTML только один раз при монтировании
        
//         this.isMounted = true;

//         this.addCatalogEvent();  // Добавляем событие на кнопку
//         this.pauseVideo();
//     }

//     unmount() {
//         if (!this.isMounted) return;
//         this.element.remove(); // Удаляем элемент из DOM
//         this.isMounted = false;
//     }

//     renderHTML() {
//         // Проверка, чтобы не рендерить HTML повторно, если он уже был создан
//         if (this.element.innerHTML !== "") return;

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

//         // const heading = document.createElement('h1');
//         // heading.classList.add('content__heading');
//         // heading.textContent = 'sparkle';

//         const heading_img = document.createElement('img');
//         heading_img.src = '/imgs/sparkle-logo.png'; // Укажите путь к вашему изображению
//         heading_img.alt = 'Логотип Sparkle'; // Альтернативный текст
//         heading_img.classList.add('content__image'); // Добавляем класс для стилизации


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

//         contentDiv.appendChild(heading_img);
//         contentDiv.appendChild(quote);
//         contentDiv.appendChild(buttonsDiv);

//         container.appendChild(video);
//         container.appendChild(contentDiv);

//         this.element.appendChild(container);  // Присоединяем к this.element
//     }

//     addCatalogEvent() {
//         const homeButton = this.element.querySelector('.content__btn a');
//         if (homeButton) {
//             homeButton.addEventListener('click', (event) => {
//                 event.preventDefault();
//                 router.navigate('/catalog');
//             });
//         }
//     }

//     pauseVideo() {
//         const video = document.querySelector('#myVideo');
//         const stopButton = document.querySelector('.content__pause');

//         stopButton.addEventListener('click', () => {
//             if (video.paused || video.ended) {
//                 video.play(); // Воспроизвести видео
//                 stopButton.textContent = 'Остановить видео'; // Изменить текст на кнопке
//             } else {
//                 video.pause(); // Остановить видео
//                 stopButton.textContent = 'Возобновить видео'; // Изменить текст на кнопке
//             }        
//         });
//     }
// }


// В HomePage.js

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

        parentElement.innerHTML = ""; 
        parentElement.append(this.element);

        this.renderHTML(); 
        
        this.isMounted = true;

        this.addCatalogEvent();
        this.setupVideoState();
        this.pauseVideo();
        return this;
    }

    unmount() {
        //if (!this.isMounted) return;
        this.saveVideoState(); // Сохраняем состояние перед размонтированием
        this.element.remove(); 
        this.isMounted = false;
    }

    renderHTML() {
        if (this.element.innerHTML !== "") return;

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

        const heading_img = document.createElement('img');
        heading_img.src = '/imgs/sparkle-logo.png';
        heading_img.alt = 'Логотип Sparkle';
        heading_img.classList.add('content__image');

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

        contentDiv.appendChild(heading_img);
        contentDiv.appendChild(quote);
        contentDiv.appendChild(buttonsDiv);

        container.appendChild(video);
        container.appendChild(contentDiv);

        this.element.appendChild(container);  
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

    pauseVideo() {
        const video = document.querySelector('#myVideo');
        const stopButton = document.querySelector('.content__pause');

        stopButton.addEventListener('click', () => {
            if (video.paused || video.ended) {
                video.play(); 
                stopButton.textContent = 'Остановить видео';
            } else {
                video.pause(); 
                stopButton.textContent = 'Возобновить видео';
            }        
        });
    }

    saveVideoState() {
        const video = document.querySelector('#myVideo');
        if (video) {
            localStorage.setItem('videoTime', video.currentTime);
        }
    }

    setupVideoState() {
        const video = document.querySelector('#myVideo');
        const savedTime = localStorage.getItem('videoTime');
        if (video && savedTime !== null) {
            video.currentTime = savedTime;
            video.play();
        }
    }
}
