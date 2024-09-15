
import axios from "axios";
import { API_URL } from "../const";
import { AccessKeyService } from "./StorageService";

export class ApiService {
    #apiUrl = API_URL;

    constructor() {
        this.accessKeyService = new AccessKeyService();
        this.accessKey = this.accessKeyService.getAccessKey();
    }

    async getAccessKey() {
        try {
            if (!this.accessKey) {
                const response = await axios.get(`${this.#apiUrl}/api/users/accessKey`);
                this.accessKey = response.data.accessKey;
                this.accessKeyService.set(this.accessKey);
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }

    async getData(pathname, params = {}, useSearch = false) {
        if (!this.accessKey) {
            await this.getAccessKey();
        }

        const endpoint = useSearch ? '/search' : '/api/products';
        
        try {
            const response = await axios.get(`${this.#apiUrl}${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${this.accessKey}`,
                },
                params
            });
    
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                this.accessKey = null;
                this.accessKeyService.clear();
                return this.getData(pathname, params, useSearch);
            } else {
                console.log("Ошибка при получении данных:");
            }
        }
    }
    
    async getProducts(params) {
        return await this.getData('api/products', params, false);
    }
    
    async getSearchProducts(params) {
        return await this.getData('/search', params, true);
    }

    async getProductCategories(category) {
        return await this.getData('api/products');
    }

    async getProductById(id) {
        return await this.getData(`/products/${id}`);
    }

    async postProductToCart(productId, quantity = 1) {
        if (!this.accessKey) {
            await this.getAccessKey();
        }

        try {
            const response = await axios.post(
                `${this.#apiUrl}/api/cart/products`,
                {
                    productId,
                    quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.accessKey}`,
                    },
                },
            );

            return response.data;
        } catch (err) {
            if (err.response && err.response.status === 401) {
                this.accessKey = null;
                this.accessKeyService.clear();
            }
            console.error(err);
        }
    }

    async updateQuantityProductToCart(productId, quantity) {
        try {
            const response = await axios.put(
                `${this.#apiUrl}/api/cart/products/${productId}`, 
                {
                    productId,
                    quantity
                }, {
                    headers: {
                        Authorization: `Bearer ${this.accessKey}`,
                    }
                });

            return response.data;
        } catch (error) {
            console.log("apiService err:", error);
        }
    }

    async getCart() {
        return await this.getData('api/cart');
    }
    async getCartData(accessKey) {
        try {
        const response = await fetch(`/api/cart/products`, {
            headers: {
            'Authorization': `Bearer ${accessKey}`
            }
        });
    
        const textResponse = await response.text();
        console.log("Ответ сервера:", textResponse);
    
        if (!response.ok) {
            throw new Error('Failed to fetch cart data');
        }
    
        return JSON.parse(textResponse);
        } catch (error) {
        console.error("Ошибка при загрузке данных корзины:", error);
        return null;
        }
    }
    async deleteProductFromCart(id) {
        try {
            const response = await axios.delete(
                `${this.#apiUrl}/api/cart/products/${id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${this.accessKey}`,
                    }
                });

            if (response.status === 200) {
                alert("Товар успешно удален из корзины");
            }

            return response.data;
        } catch (error) {
            console.log("apiService err:", error);
        }
    }

    async postOrder(data) {
        try {
            const response = await axios.post(`${this.#apiUrl}/api/orders`,
                data, 
                {
                    headers: {
                        Authorization: `Bearer ${this.accessKey}`,
                    }
                });

            return response.data;
        } catch (error) {
            console.log("apiService err:", error);
        }
    }

    async getOrder(id) {
        return await this.getData(`api/orders/${id}`);
    }
}
