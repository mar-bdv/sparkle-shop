export const likeSvg = () => {
    return ( 
        ` <svg 
        width="18" 
        height="17" 
        viewBox="0 0 18 17" 
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.314C13.4384 -2.24799 24.5343 5.7355 9 16C-6.53427 5.7355 4.56164 -2.24799 9 2.314Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.314C13.4384 -2.24799 24.5343 5.7355 9 16C-6.53427 5.7355 4.56164 -2.24799 9 2.314Z" stroke="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.314C13.4384 -2.24799 24.5343 5.7355 9 16C-6.53427 5.7355 4.56164 -2.24799 9 2.314Z" stroke="#F2F2F2" stroke-opacity="0.2"/>
        </svg> `
    )
}

// ВОТ ПРАВИЛЬНЫЙ ВАРИАНТ! нужно скачать likeSVG и сделать данный код
// let like = null;

// export const likeSvg = async () => {
//     if (!like) {
//         const response = await fetch("/img/like.svg");
//         const svg = await response.text();
//         like = new DOMParser()
//             .parseFromString(svg, 'image/svg+xml')
//             .querySelector('svg');
//     }
//     return like.cloneNode(true);

// }


/*


export const likeSvg = async () => {
    if (!like) {
        const response = await fetch("/img/like.svg");
        const svg = await response.text();
        like = new DOMParser()
            .parseFromString(svg, 'image/svg+xml')
            .querySelector('svg');
    }
    return like.cloneNode(true);

}*/