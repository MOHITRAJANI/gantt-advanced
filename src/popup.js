export default class Popup {
    constructor(parent, custom_html) {
        this.parent = parent;
        this.custom_html = custom_html;
        this.make();
    }

    make() {
        this.parent.innerHTML = `
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="pointer"></div>
        `;

        this.hide();

        this.title = this.parent.querySelector('.title');
        this.subtitle = this.parent.querySelector('.subtitle');
        this.pointer = this.parent.querySelector('.pointer');
    }

    show(options) {
        if (!options.target_element) {
            throw new Error('target_element is required to show popup');
        }
        const target_element = options.target_element;
        const elem = document.getElementById('gantt')

        if (this.custom_html) {
            let html = this.custom_html(options.task);
            html += '<div class="pointer"></div>';
            this.parent.innerHTML = html;
            this.pointer = this.parent.querySelector('.pointer');
        } else {
            // set data
            this.title.innerHTML = options.title;
            this.subtitle.innerHTML = options.subtitle;
            this.parent.style.width = this.parent.clientWidth + 'px';
        }

        // set position
        let position_meta;
        if (target_element instanceof HTMLElement) {
            position_meta = target_element.getBoundingClientRect();
        } else if (target_element instanceof SVGElement && options.target_element) {
            position_meta = options.target_element.getBBox();
        }

        if ((Math.abs(elem.getBoundingClientRect().x) + window.innerWidth) > (position_meta.x + position_meta.width)) {
            this.parent.style.left =
                position_meta.x + (position_meta.width + 25) + 'px';
            this.parent.style.top = position_meta.y + 'px';

            this.pointer.style.transform = 'rotateZ(90deg)';
            this.pointer.style.left = '-9px';
            this.pointer.style.top = '2px';
        }
        else if ((Math.abs(elem.getBoundingClientRect().x) + window.innerWidth) <= (position_meta.x + position_meta.width)) {
            if(options.title.length > 31 )
            {
                this.parent.style.left = position_meta.x - ( options.title.length * 7.03) + 'px';
            }
            else
            {
                this.parent.style.left = position_meta.x - ( 221.47 ) + 'px';
            }
            this.parent.style.top = position_meta.y + 'px';
            this.pointer.style.transform = 'rotateZ(270deg)';
            this.pointer.style.right = '-14px';
            this.pointer.style.top = '2px';   
        }

        // show
        this.parent.style.opacity = 1;
    }

    hide() {
        this.parent.style.opacity = 0;
        this.parent.style.left = 0;
    }
}
