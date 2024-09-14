import { Logo } from "../../features/Logo/Logo";
import { addContainer } from "../addContainer";

export class Footer { 
    static instance = null;

    constructor() {
        if (!Footer.instance) {
          Footer.instance = this;

            this.element = document.createElement('footer');
            this.element.classList.add('footer');
            this.containerElement = addContainer(this.element, "footer__container");
            this.isMounted = false;

        }

        return Footer.instance;
    }

    mount() {
        if (this.isMounted) {
            return;
        }

        const logo = new Logo('footer').create();

        this.containerElement.append(logo);

        this.containerElement.insertAdjacentHTML('beforeend', this.getHTML())
        
        document.body.append(this.element);
        this.isMounted = true;
        
    }

    unmount() {
        this.element.remove();
        this.isMounted = false
    }


    
    getHTML() {
      return `


      <ul class="footer__developer-list">
        
        <li class="footer__developer-item">
          Developer:
          <a href="#" class="footer__developer-link" target="_blank">Mariam B.</a>
        </li>
      </ul>

      <p class="footer__copyright">©Sparkle 2024. All rights reserved.</p>
      
      `
    }
    
}
