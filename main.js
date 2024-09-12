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
    console.log("Header mounted");

    new Main().mount();
    console.log("Main mounted");

    // new HomePage().mount() // изменения
    new Footer().mount();
    console.log("Footer mounted");

    router
        .on(
            "/", 
            async () => {
                // Создаем и монтируем экземпляр HomePage
                new HomePage().mount(new Main().element);
                console.log("Home page loaded");
                router.updatePageLinks();
                
            }, 
            {
            leave(done) {
                // Демонтируем HomePage при уходе со страницы
                new HomePage().unmount();
                console.log("HomePage unmounted");
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
                console.log("Переход на каталог");
                history.replaceState(null, null, window.location.href); // Заменяем текущее состояние
            
                const catalogInstance = new Catalog();
                if (!catalogInstance.isMounted) {
                    console.log("Каталог не смонтирован, монтируем.");
                    await catalogInstance.mount(new Main().element);
                }
            
                console.log("Запрашиваем товары из API.");
                const { products } = await new ApiService().getProducts();
                console.log("Получены товары:", products);
            
                new ProductList().mount(new Main().element, products);
            
                console.log("Обновление ссылок на странице");
                router.updatePageLinks();
        }, {
            leave(done) {
                console.log("Выход из маршрута /catalog, очистка элементов.");
                new ProductList().unmount();
                new Catalog().unmount();
                done();
            }
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
                console.log("MAIN JS",
                    pagination[slug],
                    pagination[slug].totalProducts, pagination[slug].limit
                )

                if (pagination[slug].totalProducts > pagination[slug].limit) {
                    new Pagination()
                    .mount(new ProductList().containerElement)
                    .update(pagination[slug]);
                    
                }
            

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
        // .on(
        //     "/category", 
        //     async ({ params: { slug, page = 1 } }) => {
        //       // Монтируем каталог
        //         const catalogInstance = await new Catalog().mount(new Main().element);
        //         catalogInstance.setActiveLink(slug);
            
        //         // Загрузка данных с сервера (продукты и пагинация)
        //         const response = await api.getProducts({ category: slug, page: page });
                
        //         const { products, currentPage, totalPages, totalProducts } = response;

        //         // Фильтруем продукты по категории, если необходимо
        //         const filteredProducts = products.filter(product => product.category === slug);
            
        //         // Монтируем хлебные крошки
        //         new BreadCrumbs().mount(new Main().element, [{ text: slug }]);
            
        //         // Обновляем список товаров
        //         const productList = new ProductList();
        //         productList.unmount(); // Удаляем предыдущий список товаров
        //         productList.mount(new Main().element, filteredProducts, slug); // Монтируем новый список
            
        //         // Отображение пагинации при необходимости
                
        //             new Pagination()
        //                 .mount(new ProductList().containerElement)
        //                 .update({
        //                 currentPage: currentPage,
        //                 totalPages: totalPages
        //             });
                
            
        //         router.updatePageLinks();
        //     },
        //     {
        //         leave(done) {
        //         new BreadCrumbs().unmount();
        //         new ProductList().unmount();
        //         new Catalog().unmount();
        //         done();
        //         },
        //         already(match) {
        //         match.route.handler(match);
        //         }
        //     }
        //    )
            
        

        .on(
            "/favorite",
            async ({ params }) => {
                new Catalog().mount(new Main().element);
                
                const favorite = new FavoriteService().get();
                const displayEmptyMessage = () => new ProductList().mount(new Main().element, [], 'Избранное', 'Вы ничего не добавили в избранное, пожалуйста, добавьте что-нибудь');

                // Проверка, что favorite - массив
                if (!Array.isArray(favorite) || favorite.length === 0) {
                    displayEmptyMessage();
                } else {
                    try {
                        const { products, pagination } = await api.getProducts({ 
                            id: favorite,
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
                new BreadCrumbs().unmount();
                new ProductList().unmount();
                new Catalog().unmount();
                done();
            },
            already(match) {
                match.route.handler(match);
            }
        })
    
        .on(
            "/search",
            async ({ params: { q } }) => {
                try {
                    const mainElement = new Main().element;
        
                    // Монтирование каталога
                    new Catalog().mount(mainElement);
        
                    // Запрос на получение товаров
                    const { products, pagination } = await api.getSearchProducts({ q });
        
                    // Монтирование хлебных крошек
                    new BreadCrumbs().mount(mainElement, [{ text: "Поиск" }]);
        
                    // Проверка, найдены ли товары
                    if (products.length === 0) {
                        throw new Error(`Ничего не найдено по вашему запросу "${q}"`);
                    }
        
                    // Монтирование списка продуктов
                    new ProductList().mount(
                        mainElement,
                        products,
                        `Поиск: ${q}`,
                        `Ничего не найдено по вашему запросу "${q}"`
                    );
        
                    // Обновление и монтирование пагинации, если нужно
                    if (pagination?.totalProducts > pagination?.limit) {
                        new Pagination()
                            .mount(new ProductList().containerElement)
                            .update(pagination);
                    }
        
                    // Обновление ссылок на странице
                    router.updatePageLinks();
        
                }  catch (error) {
                    console.error("Ошибка при выполнении поиска:", error);
                    new ProductList().mount(
                        new Main().element,
                        [],
                        `Ошибка:`,
                        error?.response?.data?.error || `Не удалось выполнить поиск по запросу "${q}"`
                    );
                }
            },
            {
                leave(done) {
                    new BreadCrumbs().unmount();
                    new ProductList().unmount();
                    new Catalog().unmount();
                    done();
                },
                already(match) {
                    match.route.handler(match);
                },
            },
        )
        

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

