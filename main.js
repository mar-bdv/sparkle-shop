import 'normalize.css';

import './style.scss';
import Navigo from 'navigo';
import { Header } from './modules/Header/Header';
import { Footer } from './modules/Footer/Footer';
import { Main } from './modules/Main/Main';
import { ProductList } from './modules/ProductList/ProductList';
import { ApiService } from './services/ApiService';
import { Catalog } from './modules/Catalog/Catalog';
import { FavoriteService } from './services/StorageService';
import { Pagination } from './features/Pagination/Pagination';




const productSlider = () => {
    Promise.all([
        import("swiper/modules"),
        import("swiper"),
        import("swiper/css")
    ]).then(([{Navigation, Thumbs}, Swiper]) => {
        const swiperThumbnails = new Swiper.default(".product__slider-thumbnails", {
            spaceBetween: 10,
            slidesPerView: 4, 
            freeMode: true,
            watchSlidesProgress: true,
        });
    
        new Swiper.default(".product__slider-main", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".product__arrow_next",
                prevEl: ".product__arrow_prev",
            },
            modules: [Navigation, Thumbs],
            thumbs: {
                swiper: swiperThumbnails,
            }
        })
    })

}


const init = () => {
    const api = new ApiService();
    const router = new Navigo("/", { linksSelector: 'a[href^="/"]' })


    new Header().mount();
    new Main().mount();
    new Footer().mount();
    
    api.getProductCategories().then((data) => {
        new Catalog().mount(new Main().element, data);
        router.updatePageLinks();

    });

    productSlider();


    // router
    //     .on("/", 
    //     async () => {
    //         const products = await api.getProducts();
    //         new ProductList().mount(new Main().element, products);
    //         console.log(products)
    //         router.updatePageLinks();
    //     }, 
    //     {
    //         leave(done) {
    //             new ProductList().unmount();
    //             done()
    //         },
    //         already() {
    //             console.log("already")
    //         }
    //     }
    //     )
    //     .on("/category", 
    //         async ({params: {slug}}) => {
    //             const product = await api.getProducts({category: slug});
    //             new ProductList().mount(new Main().element, product, slug);
    //             router.updatePageLinks();
            
    //         },

    //         {
    //             leave(done) {
    //                 new ProductList().unmount();
    //                 done()
    //             }
    //         }
    //     )
    //     .on("/favorite", 
    //         async () => {
    //             const favorite = new FavoriteService().get();
    //             const id = await api.getProducts({id: favorite});
   

    //             // const id = await api.getProducts({id: favorite.join('&')});
    //             console.log(favorite)
    //             new ProductList().mount(new Main().element, id, 'Избранное', 'ошибка');
    //             router.updatePageLinks();
    //             // const favorite = new FavoriteService().get();
    //             // const products = [];
            
    //             // for (const id of favorite) {
    //             //     const product = await api.getProductById(id);
    //             //     products.push(product);
    //             // }
            
    //             // console.log(products);
            
    //             // new ProductList().mount(new Main().element, products, 'Избранное');
    //             // router.updatePageLinks();
    //         },

    //         {
    //             leave(done) {
    //                 new ProductList().unmount();
    //                 done()
    //             },
    //             already (match) {
    //                 match.route.handler(match)
    //             }
    //         }

    //     )
    router
    .on("/", async () => {
        const  products = await api.getProducts();
        new ProductList().mount(new Main().element, products);
        console.log(products);
        router.updatePageLinks();
    }, {
        leave(done) {
            new ProductList().unmount();
            done();
        },
        already() {
            console.log("already");
        }
    })
    .on("/category", async ({ params: { slug } }) => {
        const product = await api.getProducts({ category: slug });
        new ProductList().mount(new Main().element, product, slug);
        new Pagination()
        .mount(new ProductList().containerElement)
        .update(pagination);
        router.updatePageLinks();
    }, {
        leave(done) {
            new ProductList().unmount();
            done();
        }
    })
    .on("/favorite", async () => {
        const favorite = new FavoriteService().get();
        console.log('Favorite IDs:', favorite); // Логируем идентификаторы избранных товаров
        const displayEmptyMessage = () => new ProductList().mount(new Main().element, [], 'Избранное', 'Вы ничего не добавили в избранное, пожалуйста, добавьте что-нибудь');

        // Проверка, что favorite - массив
        if (!Array.isArray(favorite) || favorite.length === 0) {
            console.log('No favorites, displaying empty message');
            displayEmptyMessage();
        } else {
            try {
                const products = await api.getProducts({ id: favorite });
                console.log('Products:', products); // Логируем полученные товары
        
                // Проверка, что products - массив
                if (!Array.isArray(products)) {
                    throw new Error('Expected products to be an array but got:', products);
                }
        
                new ProductList().mount(new Main().element, products, 'Избранное', 'Вы ничего не добавили в избранное, пожалуйста, добавьте что-нибудь');
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        router.updatePageLinks();
    }, {
        leave(done) {
            new ProductList().unmount();
            done();
        },
        already(match) {
            match.route.handler(match);
        }
    })
        .on("/search", () => {
            console.log("search")
        })
        .on("/product/:id", (obj) => {
            console.log('obj:', obj)
        })
        .on("/cart", () => {
            console.log("cart")
        })
        .on("/order", () => {
            console.log("order")
        })
        .notFound(() => {
            
            new Main().element.innerHTML = `
                <div class="not-found">
                    <h2>Страница не найдена</h2> 
                    <p> <a href="/"> Кликните, чтобы перейти на главную страницу</a> </p>
                </div>`;
            }, {
                leave(done) {
                    const notFoundElement = document.querySelector('.not-found');
                    if (notFoundElement) {
                        notFoundElement.remove();
                    }
                    done();
                }
        });

    router.resolve();
};

init();


// // Get the video
// let video = document.getElementById("myVideo");

// // Get the button
// let btn = document.getElementById("myBtn");

// btn.addEventListener("click", myFunction)

// // Pause and play the video, and change the button text
// function myFunction() {
//     if (video.paused) {
//         video.play();
//         btn.innerHTML = "остановить видео";
//     } else {
//         video.pause();
//         btn.innerHTML = "включить видео";
//     }
// }