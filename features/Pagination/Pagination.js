export class Pagination {
    static instance = null;

    constructor() {
        if (!Pagination.instance) {
            Pagination.instance = this;
            this.pagination = this.createPagination();
            
        } 
        return Pagination.instance;
    }

    update({currentPage, totalPages, totalProducts, limit}) {
        this.paginationCurrent.textContent = currentPage;
        this.paginationTotal.textContent = totalPages;

        return this;
    }

    createPagination() {
        const pagination = document.createElement('div');
        pagination.classList.add('pagination');

        this.paginationBar = document.createElement('div');
        this.paginationBar.classList.add('pagination__bar');

        const paginationArrays = document.createElement('div');
        paginationArrays.classList.add('pagination__arrays');

        this.paginationLeft = document.createElement('a');
        this.paginationLeft.classList.add('pagination__left');
        this.paginationLeft.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" 
            fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.86395 8.0001L8.52528 2.1821C8.5719 2.13522 8.60874 2.07955 8.6337 2.01833C8.65866 1.95711 8.67122 1.89155 8.67068 1.82544C8.67013 1.75933 8.65647 1.69398 8.6305 1.63318C8.60453 1.57239 8.56676 1.51734 8.51938 1.47124C8.472 1.42513 8.41594 1.38888 8.35445 1.36458C8.29297 1.34028 8.22727 1.32842 8.16117 1.32968C8.09507 1.33094 8.02988 1.34529 7.96936 1.37191C7.90885 1.39854 7.85421 1.43689 7.80862 1.48477L1.80862 7.65143C1.7178 7.74478 1.66699 7.86987 1.66699 8.0001C1.66699 8.13033 1.7178 8.25542 1.80862 8.34877L7.80862 14.5154C7.85421 14.5633 7.90885 14.6017 7.96936 14.6283C8.02988 14.6549 8.09507 14.6693 8.16117 14.6705C8.22727 14.6718 8.29297 14.6599 8.35445 14.6356C8.41594 14.6113 8.472 14.5751 8.51938 14.529C8.56676 14.4829 8.60453 14.4278 8.6305 14.367C8.65647 14.3062 8.67013 14.2409 8.67068 14.1748C8.67122 14.1087 8.65866 14.0431 8.6337 13.9819C8.60874 13.9207 8.5719 13.865 8.52528 13.8181L2.86395 8.0001Z" fill="#1C1C1C"/>
            </svg>
        `;

        this.paginationRight = document.createElement('a');
        this.paginationRight.classList.add('pagination__right');
        this.paginationRight.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" 
            fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.136 8.0001L7.47472 2.1821C7.4281 2.13522 7.39126 2.07955 7.3663 2.01833C7.34134 1.95711 7.32878 1.89155 7.32932 1.82544C7.32987 1.75933 7.34353 1.69398 7.3695 1.63318C7.39547 1.57239 7.43324 1.51734 7.48062 1.47124C7.528 1.42513 7.58406 1.38888 7.64555 1.36458C7.70703 1.34028 7.77273 1.32842 7.83883 1.32968C7.90493 1.33094 7.97012 1.34529 8.03064 1.37191C8.09115 1.39854 8.14579 1.43689 8.19138 1.48477L14.1914 7.65143C14.2822 7.74478 14.333 7.86987 14.333 8.0001C14.333 8.13033 14.2822 8.25542 14.1914 8.34877L8.19138 14.5154C8.14579 14.5633 8.09115 14.6017 8.03064 14.6283C7.97012 14.6549 7.90493 14.6693 7.83883 14.6705C7.77273 14.6718 7.70703 14.6599 7.64555 14.6356C7.58406 14.6113 7.528 14.5751 7.48062 14.529C7.43324 14.4829 7.39547 14.4278 7.3695 14.367C7.34353 14.3062 7.32987 14.2409 7.32932 14.1748C7.32878 14.1087 7.34134 14.0431 7.3663 13.9819C7.39126 13.9207 7.4281 13.865 7.47472 13.8181L13.136 8.0001Z" fill="#1C1C1C"/>
            </svg>
        `;

        const paginationInfo = document.createElement('p');
        paginationInfo.classList.add('pagination__info');

        this.paginationCurrent = document.createElement('span');
        this.paginationCurrent.classList.add('pagination__current');

        const paginationSeparator = document.createTextNode('из');

        this.paginationTotal = document.createElement('span');
        this.paginationTotal.classList.add('pagination__total');

        paginationInfo.append(
            this.paginationCurrent,
            paginationSeparator,   
            this.paginationTotal
        )

        paginationArrays.append(
            this.paginationLeft,
            paginationInfo,
            this.paginationRight
        )

        pagination.append(this.paginationBar, paginationArrays);

        return pagination;
    }

    mount(parent) {
        // if (position) {
        //     parent.insertAjacmentElement(position, this.pagination);
        // } else {
        //     parent.append(this.pagination);
        // }

        parent.append(this.pagination);
        return this;
    }
}


/*
<div class="pagination">
            <div class="pagination__bar" style="--width: calc(12 / 31 * 100%)">
            </div>

            <div class="pagination__arrays">
                <button class="pagination__left">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.86395 8.0001L8.52528 2.1821C8.5719 2.13522 8.60874 2.07955 8.6337 2.01833C8.65866 1.95711 8.67122 1.89155 8.67068 1.82544C8.67013 1.75933 8.65647 1.69398 8.6305 1.63318C8.60453 1.57239 8.56676 1.51734 8.51938 1.47124C8.472 1.42513 8.41594 1.38888 8.35445 1.36458C8.29297 1.34028 8.22727 1.32842 8.16117 1.32968C8.09507 1.33094 8.02988 1.34529 7.96936 1.37191C7.90885 1.39854 7.85421 1.43689 7.80862 1.48477L1.80862 7.65143C1.7178 7.74478 1.66699 7.86987 1.66699 8.0001C1.66699 8.13033 1.7178 8.25542 1.80862 8.34877L7.80862 14.5154C7.85421 14.5633 7.90885 14.6017 7.96936 14.6283C8.02988 14.6549 8.09507 14.6693 8.16117 14.6705C8.22727 14.6718 8.29297 14.6599 8.35445 14.6356C8.41594 14.6113 8.472 14.5751 8.51938 14.529C8.56676 14.4829 8.60453 14.4278 8.6305 14.367C8.65647 14.3062 8.67013 14.2409 8.67068 14.1748C8.67122 14.1087 8.65866 14.0431 8.6337 13.9819C8.60874 13.9207 8.5719 13.865 8.52528 13.8181L2.86395 8.0001Z" fill="#1C1C1C"/>
                    </svg>
                </button>
                <p class="pagination__info">
                    <span class="pagination__current">12</span>
                    <span>из</span>
                    <span class="pagination__total">31</span>
                </p>
                <button class="pagination__right">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.136 8.0001L7.47472 2.1821C7.4281 2.13522 7.39126 2.07955 7.3663 2.01833C7.34134 1.95711 7.32878 1.89155 7.32932 1.82544C7.32987 1.75933 7.34353 1.69398 7.3695 1.63318C7.39547 1.57239 7.43324 1.51734 7.48062 1.47124C7.528 1.42513 7.58406 1.38888 7.64555 1.36458C7.70703 1.34028 7.77273 1.32842 7.83883 1.32968C7.90493 1.33094 7.97012 1.34529 8.03064 1.37191C8.09115 1.39854 8.14579 1.43689 8.19138 1.48477L14.1914 7.65143C14.2822 7.74478 14.333 7.86987 14.333 8.0001C14.333 8.13033 14.2822 8.25542 14.1914 8.34877L8.19138 14.5154C8.14579 14.5633 8.09115 14.6017 8.03064 14.6283C7.97012 14.6549 7.90493 14.6693 7.83883 14.6705C7.77273 14.6718 7.70703 14.6599 7.64555 14.6356C7.58406 14.6113 7.528 14.5751 7.48062 14.529C7.43324 14.4829 7.39547 14.4278 7.3695 14.367C7.34353 14.3062 7.32987 14.2409 7.32932 14.1748C7.32878 14.1087 7.34134 14.0431 7.3663 13.9819C7.39126 13.9207 7.4281 13.865 7.47472 13.8181L13.136 8.0001Z" fill="#1C1C1C"/>
                    </svg>
                </button>
                </div>
        </div>


*/