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
import { BreadCrumbs } from './features/BreadCrumbs/BreadCrumbs';
import { ProductCard } from './modules/ProductCard/ProductCard';
import { productSlider } from './features/productSlider/productSlider';
import { Cart } from './modules/Cart/Cart';
import { Order } from './features/Order/Order';
import { HomePage } from './modules/HomePage/HomePage';



export const router = new Navigo("/", { linksSelector: 'a[href^="/"]' })

const init = () => {
    const api = new ApiService();

    new Header().mount();

    new Main().mount();

    new Footer().mount();

    router
        .on(
            "/", 
            async () => {
                new HomePage().mount(new Main().element);
                router.updatePageLinks();
                
            }, 
            {
            leave(done) {
                new HomePage().unmount();
                done();
            },
    
            already(match) {
                match.route.handler(match);
            },
        })
        .on(
            "/catalog",
            async () => {
                history.replaceState(null, null, window.location.href);
            
                const catalogInstance = new Catalog();
                if (!catalogInstance.isMounted) {
                    await catalogInstance.mount(new Main().element);
                }
            
                const { products } = await new ApiService().getProducts();
            
                new ProductList().mount(new Main().element, products);
            
                router.updatePageLinks();
        }, {
            leave(done) {
                new ProductList().unmount();
                new Catalog().unmount();
                done();
            }
        })

        
        .on("/category", async ({ params: { slug, page = 1 } }) => {
            (await new Catalog().mount(new Main().element)).setActiveLink(slug);
                
                const { products } = await api.getProducts({
                    category: slug,
                    page: page,
                    limit: 10,
                });

                const filteredProducts = products.filter(product => product.category === slug);

                new BreadCrumbs().mount(new Main().element, 
                [{ text: slug }]);

                new ProductList().mount(new Main().element, 
                filteredProducts, slug);


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
            "/favorite",
            async ({ params }) => {
                new Catalog().mount(new Main().element);
                
                const favorite = new FavoriteService().get();
                const displayEmptyMessage = () => new ProductList().mount(new Main().element, [], 'Избранное', 'Вы ничего не добавили в избранное, пожалуйста, добавьте что-нибудь');

                if (!Array.isArray(favorite) || favorite.length === 0) {
                    displayEmptyMessage();
                } else {
                    try {
                        const { products,  } = await api.getProducts({ 
                            id: favorite,
                            page: params?.page || 1
                        });
                                        
                        if (!Array.isArray(products)) {
                            throw new Error('Expected products to be an array but got:', products);
                        }
                        new BreadCrumbs().mount(new Main().element, [{ text: 'Избранное' }]);
                        new ProductList().mount(new Main().element, products, 
                        'Избранное', 'Вы ничего не добавили в избранное, пожалуйста, добавьте что-нибудь');

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
        
                    new Catalog().mount(mainElement);
        
                    const { products } = await api.getSearchProducts({ q });
        
                    new BreadCrumbs().mount(mainElement, [{ text: "Поиск" }]);
        
                    if (products.length === 0) {
                        throw new Error(`Ничего не найдено по вашему запросу "${q}"`);
                    }
        
                    new ProductList().mount(
                        mainElement,
                        products,
                        `Поиск: ${q}`,
                        `Ничего не найдено по вашему запросу "${q}"`
                    );
        
                    router.updatePageLinks();
        
                }  catch (error) {
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
            new Catalog().mount(new Main().element);
        
            const data = await api.getProductById(obj.data.id);
        
            const product = data.products.find(p => p.id === parseInt(obj.data.id, 10));
            if (!product) {
                return;
            }
                
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
                const mainElement = new Main().element;
                mainElement.innerHTML = '<div class="loading">Загрузка заказа...</div>';
                
                const orderData = await api.getOrder(id);

                if (!orderData) {
                    mainElement.innerHTML = `
                        <div class="not-found">
                            <h2>Заказ не найден</h2>
                            <p>Проверьте правильность номера заказа или <a href="/">вернитесь на главную страницу</a>.</p>
                        </div>
                    `;
                    return;
                }
                new Order().mount(mainElement, orderData, id);

                router.updatePageLinks();
            } catch (error) {
                mainElement.innerHTML = `
                    <div class="error">
                        <h2>Произошла ошибка</h2>
                        <p>Не удалось загрузить данные заказа. Пожалуйста, попробуйте позже.</p>
                    </div>
                `;
            }
            }, {
                leave(done) {
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

