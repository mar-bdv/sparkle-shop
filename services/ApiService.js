import axios from "axios";
import { API_URL } from "../const";
import { AccessKeyService } from "./StorageService";

export class ApiService  {
    #apiUrl = API_URL;

    constructor() {
        this.accessKeyService = new AccessKeyService('accessKey');
        this.accessKey = this.accessKeyService.get();
    }

    async getAccessKey() {
        try {
            if (!this.accessKey) {
                const url = new URL(this.#apiUrl);
                const response = await axios.get(url)
            }
        } catch (error) {
            console.log(error, "error")
        }
    }

    async getData(pathname, params = {}, useSearch = false) {
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
                this.accessKeyService.delete();
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
        try {
            const response = await axios.post(`${this.#apiUrl}/api/cart/products`, {
                productId,
                quantity
            }, {
                header: {
                    Authorization: `Bearer ${this.accessKey}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("apiService err:", error)
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
                header: {
                    Authorization: `Bearer ${this.accessKey}`,
                }
            });

        

            return response.data;
        } catch (error) {
        
            console.log("apiService err:", error)
        }
    }


    async getCart() {
        return await this.getData('api/cart');
    }

    async deleteProductFromCart(id) {
        try {
            const response = await axios.delete(
                `${this.#apiUrl}/api/cart/products/${id}`, 
                {
                header: {
                    Authorization: `Bearer ${this.accessKey}`,
                }
            });

            if (response.status === 200) {
                alert("Товар успешно удален из корзины");
            }

            return response.data;
        } catch (error) {
            
            console.log("apiService err:", error)
        }
    }

    async postOrder(data) {
        try {
            const response = await axios.post(`${this.#apiUrl}/api/orders`,
            data, 
            {
                header: {
                    Authorization: `Bearer ${this.accessKey}`,
                }
            });

            return response.data;
        } catch (error) {

            console.log("apiService err:", error)
        }
    }

    async getOrder(id) {
        return await this.getData(`api/orders/${id}`)
    }
}
