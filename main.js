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
import { BreadCrumbs } from './features/BreadCrumbs/BreadCrumbs';
import { ProductCard } from './modules/ProductCard/ProductCard';
import { productSlider } from './features/ProductSlider/productSlider';
import { Cart } from './modules/Cart/Cart';
import { Order } from './features/Order/Order';
import { HomePage } from './modules/HomePage/HomePage';



export const router = new Navigo("/", { linksSelector: 'a[href^="/"]' })

const init = () => {
    const api = new ApiService();


    new Header().mount();
    new Main().mount();
    // new HomePage().mount() // изменения
    new Footer().mount();

    router
        // .on(
        //     "/", 
        //     async () => {
        //         // new Catalog().mount(new Main().element);

        //         // const { products } = await api.getProducts();
        //         // new ProductList().mount(new Main().element, products);
        //         // router.updatePageLinks(); 
        //         new HomePage().mount(new Main().element)
        //         console.log("home page")
        //     }, {

        //     leave(done) {
        //         // new ProductList().unmount();
        //         // new Catalog().unmount();
        //         new HomePage().unmount();

        //         done()
        //     },

        //     already(match) {
        //         match.route.handler(match);
        //     },
        // })
        // .on(
        //     "/catalog", 
        //     async () => {
        //         new Catalog().mount(new Main().element);

        //         const { products } = await api.getProducts();
        //         new ProductList().mount(new Main().element, products);
        //         router.updatePageLinks(); 
        //     }, {

        //     leave(done) {
        //         new ProductList().unmount();
        //         new Catalog().unmount();

        //         done()
        //     },

        //     already(match) {
        //         match.route.handler(match);
        //     },
        // })        


        .on(
            "/", 
            async () => {
                // Создаем и монтируем экземпляр HomePage
                new HomePage().mount(new Main().element);
                console.log("Home page loaded");
            }, {
    
            leave(done) {
                // Демонтируем HomePage при уходе со страницы
                new HomePage().unmount();
                done();
            },
    
            already(match) {
                // Обрабатываем, если страница уже загружена
                match.route.handler(match);
            },
        })
        .on(
            "/catalog", 
            async () => {
                // Создаем и монтируем экземпляр Catalog
                new Catalog().mount(new Main().element);
    
                // Загружаем продукты и монтируем ProductList
                const { products } = await api.getProducts();
                new ProductList().mount(new Main().element, products);
    
                router.updatePageLinks(); 
            }, {
    
            leave(done) {
                // Демонтируем Catalog и ProductList при уходе со страницы
                new ProductList().unmount();
                new Catalog().unmount();
                done();
            },
    
            already(match) {
                match.route.handler(match);
            },
        })

        .on("/category", async ({ params: { slug, page = 1 } }) => {
            (await new Catalog().mount(new Main().element)).setActiveLink(slug);
                const response = await api.getProducts({
                    category: slug,
                    page: page,
                });

                const { products, pagination } = response;

                const filteredProducts = products.filter(product => product.category === slug);

                new BreadCrumbs().mount(new Main().element, [{ text: slug }]);
                new ProductList().mount(new Main().element, filteredProducts, slug);
            
                //  КОД ДЛЯ ТОГО, ЧТОБЫ ПАГИНАЦИЯ ОТОБРАЖАЛАСЬ ТОЛЬКО КОГДА totalProducts больше, чем limit
                console.log("MAIN JS", pagination[slug].totalProducts, pagination[slug].limit)

                if (pagination[slug].totalProducts > pagination[slug].limit) {
                    
                    new Pagination()
                    .mount(new ProductList().containerElement)
                    .update(pagination[slug]);
                    
                }
            
                //     new Pagination()
                //     .mount(new ProductList().containerElement)
                //     .update(pagination[slug]);
                // }
                
                // new Pagination()
                // .mount(new ProductList().containerElement)
                // .update(pagination[slug]);
        

                router.updatePageLinks();
        
        }, {

            leave(done) {
                new BreadCrumbs().unmount();
                new ProductList().unmount();
                new Catalog().unmount();
                done();
            },
            already(match) {
                match.route.handler(match);
            }
        })
        
        // // Endpoint для получения продуктов по категории с пагинацией
        // .on("/category", async ({ params: { slug, page = 1 } }) => {
        //     new Catalog().mount(new Main().element);
        //     try {
        //         const response = await api.getProducts({
        //             category: slug,
        //             page: page,
        //         });
        
        //         const { products, pagination } = response;
        //         console.log("productS", products);
        //         console.log("pagination", pagination);
        
        //         const filteredProducts = products.filter(product => product.category === slug);
        
        //         new BreadCrumbs().mount(new Main().element, [{ text: slug }]);
        //         new ProductList().mount(new Main().element, filteredProducts, slug);
        //         if (pagination && pagination[slug]) {
        //             new Pagination()
        //                 .mount(new ProductList().containerElement)
        //                 .update(pagination[slug]);
        //         }
        
        //         router.updatePageLinks();
        //     } catch (error) {
        //         console.error("Failed to fetch products:", error);
        //     }
        // }, {
        //     leave(done) {
        //         new BreadCrumbs().unmount();
        //         new ProductList().unmount();
        //         new Catalog().unmount();
        //         done();
        //     }
        // })
        

        .on("/favorite", async ({ params }) => {
            new Catalog().mount(new Main().element);
            const favorite = new FavoriteService().get();
            const displayEmptyMessage = () => new ProductList().mount(new Main().element, [], 'Избранное', 'Вы ничего не добавили в избранное, пожалуйста, добавьте что-нибудь');

            // Проверка, что favorite - массив
            if (!Array.isArray(favorite) || favorite.length === 0) {
                displayEmptyMessage();
            } else {
                try {
                    const { products, pagination } = await api.getProducts({ 
                        id: favorite ,
                        page: params?.page || 1
                    });
                    
                    console.log('Products:', products); // Логируем полученные товары
            
                    // Проверка, что products - массив
                    if (!Array.isArray(products)) {
                        throw new Error('Expected products to be an array but got:', products);
                    }
                    new BreadCrumbs().mount(new Main().element, [{ text: 'Избранное' }]);
                    new ProductList().mount(new Main().element, products, 
                    'Избранное', 'Вы ничего не добавили в избранное, пожалуйста, добавьте что-нибудь');

                /*  КОД ДЛЯ ТОГО, ЧТОБЫ ПАГИНАЦИЯ ОТОБРАЖАЛАСЬ ТОЛЬКО КОГДА totalProducts больше, чем limit
                // console.log(pagination[slug]?.totalProducts, pagination[slug]?.limit)
                // if (pagination[slug].totalProducts > pagination[slug].limit) {
                //     new Pagination()
                //     .mount(new ProductList().containerElement)
                //     .update(pagination[slug]);
                // }
                */

                    if (favorite.length > 0) {
                        new Pagination()
                        .mount(new ProductList().containerElement)
                        .update(pagination)
                    };
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }

        router.updatePageLinks();
        }, {
            leave(done) {
                new ProductList().unmount();
                new Catalog().unmount();
                new BreadCrumbs().unmount();
                done();
            },
            already(match) {
                match.route.handler(match);
            }
        })

        // .on("/search", async ({ params }) => {
        //     console.log("Search")
        //     console.log("PARAMS:", params)
        //     new Catalog().mount(new Main().element);
        //     // const displayEmptyMessage = () => new ProductList().mount(new Main().element, [], 'Избранное', 'Вы ничего не добавили в избранное, пожалуйста, добавьте что-нибудь');

        //     try {
        //         const { products, pagination } = await api.getProducts({ 
        //             q: params.q,
        //         });
                
        //         console.log('Products:', products); // Логируем полученные товары
        
        //         // Проверка, что products - массив
        //         if (!Array.isArray(products)) {
        //             throw new Error('Expected products to be an array but got:', products);
        //         }
        //         new BreadCrumbs().mount(new Main().element, [{ text: 'Избранное' }]);
        //         new ProductList().mount(new Main().element, products, 
        //         'Избранное', 'Вы ничего не добавили в избранное, пожалуйста, добавьте что-нибудь');
                
        //         new Pagination()
        //         .mount(new ProductList().containerElement).update(pagination);
        //     } catch (error) {
        //         console.error('Error fetching products:', error);
        //     }
    

        // router.updatePageLinks();
        // }, {
        //     leave(done) {
        //         new ProductList().unmount();
        //         new Catalog().unmount();
        //         new BreadCrumbs().unmount();
        //         done();
        //     },
        //     already(match) {
        //         match.route.handler(match);
        //     }
        // })
        .on("/search", async ({ params: { q } }) => {
            try {
                new Catalog().mount(new Main().element);
                const { products, pagination } = await api.getSearchProducts(
                    { q }
                );
                console.log("/search PRODUCTS", { q })
                new BreadCrumbs().mount(new Main().element, [{ text: "Поиск" }]);
                new ProductList().mount(
                    new Main().element,
                    products,
                    `Поиск: ${q}`,
                    `Ничего не найдено по вашему запросу "${q}"`
                );
                if (pagination?.totalProducts > pagination?.limit) {
                    new Pagination()
                        .mount(new ProductList().containerElement)
                        .update(pagination);
                }
                router.updatePageLinks();
            } catch (error) {
                console.error("Ошибка при поиске товаров:", error);
            }
        }, {
            leave(done) {
                new BreadCrumbs().unmount();
                new ProductList().unmount();
                new Catalog().unmount();
                done();
            },
            already(match) {
                match.route.handler(match);
            }
        })

        
        .on("/product/:id", async (obj) => {
            console.log("Route object:", obj);
            console.log("Product ID:", obj.data.id);
            new Catalog().mount(new Main().element);
        
            // Исправляем вызов API для получения данных о продукте
            const data = await api.getProductById(obj.data.id);
            console.log("API response data:", data);
        
            const product = data.products.find(p => p.id === parseInt(obj.data.id, 10));
            if (!product) {
                console.error("Product not found");
                return;
            }
        
            console.log("Product data:", product);
        
            new BreadCrumbs().mount(new Main().element, [
                {
                    text: product.category,
                    href: `/category?slug=${product.category}`
                },
                {
                    text: product.name
                }
            ]);
            new ProductCard().mount(new Main().element, product);
            productSlider();
        }, {
            leave(done) {
                new Catalog().unmount();
                new BreadCrumbs().unmount();
                new ProductCard().unmount();
                done();
            }
        })
        

        .on("/cart", async () => {
            const cartItems = await api.getCart();
            new Cart().mount(
                new Main().element, cartItems, 'Корзина пуста, добавьте товары'
            )
        }, {
            leave(done) {
                new Cart().unmount();
                done();
            }
        })
        // .on("/order/:id", ({data: { id }}) => {
        //     console.log(`order: ${id}`);

        //     api.getOrder(id).then(data => {
        //         console.log(data)
        //     })
        // })

        // .on("/api/orders/:id", async ({ data: { id } }) => { //ПОМЕНЯЛА НА api/orders CHAT GPT
        //     try {
        //         console.log("api/orders/id -", id)
        //         // Показываем индикатор загрузки, пока данные загружаются
        //         const mainElement = new Main().element;
        //         mainElement.innerHTML = '<div class="loading">Загрузка заказа...</div>';
        
        //         // Получаем данные заказа по ID
        //         const orderData = await api.getOrder(id);
        
        //         if (!orderData) {
        //             // Если заказ не найден, показываем сообщение об ошибке
        //             mainElement.innerHTML = `
        //                 <div class="not-found">
        //                     <h2>Заказ не найден</h2>
        //                     <p>Проверьте правильность номера заказа или <a href="/">вернитесь на главную страницу</a>.</p>
        //                 </div>
        //             `;
        //             return;
        //         }
        
        //         // Монтируем компонент Order с полученными данными
        //         new Order().mount(mainElement, orderData);
        
        //         // Обновляем ссылки маршрутизатора, если это необходимо
        //         router.updatePageLinks();
        //     } catch (error) {
        //         console.error('Ошибка при получении данных заказа:', error);
        //         mainElement.innerHTML = `
        //             <div class="error">
        //                 <h2>Произошла ошибка</h2>
        //                 <p>Не удалось загрузить данные заказа. Пожалуйста, попробуйте позже.</p>
        //             </div>
        //         `;
        //     }
        // }, {
        //     leave(done) {
        //         // Размонтируем компонент Order при уходе с маршрута
        //         new Order().unmount();
        //         done();
        //     },
        //     already(match) {
        //         match.route.handler(match);
        //     }
        // })
        .on("/api/orders/:id", async ({ data: { id } }) => {
            try {
                console.log("api/orders/id -", id);
                // Показываем индикатор загрузки, пока данные загружаются
                const mainElement = new Main().element;
                mainElement.innerHTML = '<div class="loading">Загрузка заказа...</div>';
                
                // Получаем данные заказа по ID
                const orderData = await api.getOrder(id);

                if (!orderData) {
                    // Если заказ не найден, показываем сообщение об ошибке
                    mainElement.innerHTML = `
                        <div class="not-found">
                            <h2>Заказ не найден</h2>
                            <p>Проверьте правильность номера заказа или <a href="/">вернитесь на главную страницу</a>.</p>
                        </div>
                    `;
                    return;
                }

                // Монтируем компонент Order с полученными данными
                // new Order().mount(mainElement, orderData);

                new Order().mount(mainElement, orderData, id);


                // Обновляем ссылки маршрутизатора, если это необходимо
                router.updatePageLinks();
            } catch (error) {
                console.error('Ошибка при получении данных заказа:', error);
                mainElement.innerHTML = `
                    <div class="error">
                        <h2>Произошла ошибка</h2>
                        <p>Не удалось загрузить данные заказа. Пожалуйста, попробуйте позже.</p>
                    </div>
                `;
            }
            }, {
                leave(done) {
                    // Размонтируем компонент Order при уходе с маршрута
                    new Order().unmount();
                    done();
                },
                already(match) {
                    match.route.handler(match);
                }
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

    api.getCart().then(data => {
        new Header().changeCount(data.cart.totalQuantity)
    })
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