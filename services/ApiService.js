import axios from "axios";
import { API_URL } from "../const";
import { AccessKeyService } from "./StorageService";

export class ApiService  {
    #apiUrl = API_URL;

    constructor() {
        this.accessKeyService = new AccessKeyService('accessKey');
        this.accessKey = this.accessKeyService.get();
        console.log(this.accessKey)
    }

    async getAccessKey() {
        try {
            if (!this.accessKey) {
                const url = new URL(this.#apiUrl);
                // url.pathname = 'api/users/accessKey';
                const response = await axios.get(url)
                // this.accessKey = response.data.accessKey;
                // this.accessKeyService.set(this.accessKey);
            }
        } catch (error) {
            console.log(error, "error")
        }
    }


    async getData(pathname, params = {}) {
        // if (!this.accessKey) {
        //     await this.getAccessKey();
        // }

        try {
            const response = await axios.get(`${this.#apiUrl}/api/products`, {
                headers: {
                    Authorization: `Bearer ${this.accessKey}`,
                },
                params
            });

            return response.data
        } catch (error) {
            if (error.response && error.response.status === 401) {
                this.accessKey = null;
                this.accessKeyService.delete()

                return this.getData(url, params);
            } else {
                console.log(error, "error")
            }
        }
    } 

    async getProducts(params) { // page = 1, limit = 12, list, category, q
        console.log(params)
        return await this.getData('api/products', params)
    }

    async getProductCategories(category) {
        // return await this.getData(`api/productCategories`);
        console.log("getProductCategories getProductCategories")
        return await this.getData('api/products', { category });

    }

    async getProductById(id) {
        return await this.getData(`api/products/${id}`);

    }
}

// import axios from "axios";
// import { API_URL } from "../const";
// import { AccessKeyService } from "./StorageService";

// export class ApiService {
//     #apiUrl = API_URL;

//     constructor() {
//         this.accessKeyService = new AccessKeyService('accessKey');
//         this.accessKey = this.accessKeyService.get();
//         console.log(this.accessKey);
//     }

//     async getAccessKey() {
//         try {
//             if (!this.accessKey) {
//                 const url = new URL(this.#apiUrl);
//                 const response = await axios.get(url);
//             }
//         } catch (error) {
//             console.log(error, "error");
//         }
//     }

//     async getData(pathname, params = {}) {
//         try {
//             const response = await axios.get(`${this.#apiUrl}`, {
//                 headers: {
//                     Authorization: `Bearer ${this.accessKey}`,
//                 },
//                 params
//             });
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 this.accessKey = null;
//                 this.accessKeyService.delete();
//                 return this.getData(url, params);
//             } else {
//                 console.log(error, "error");
//             }
//         }
//     }

//     async getProducts(params) {
    
//         return await this.getData(`api/products`, params);
//     }

//     async getProductCategories(category) {
//         return await this.getData(`api/products`, { category });
//     }

//     async getProductById(id) {
//         return await this.getData(`api/products/${id}`);
//     }
// }