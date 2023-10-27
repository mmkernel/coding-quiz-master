'use strict';
const dom = {
    create({
        content = '',
        type = 'div',
        parent = false,
        classes = [],
        attr = {},
        listeners = {},
        styles = {},
        amEnde = true,
    } = {}) {
        let neu = document.createElement(type);
        if (content) neu.innerHTML = content;
        if (classes.length) neu.className = classes.join(' ');
    
        Object.entries(attr).forEach(el => neu.setAttribute(...el));
        Object.entries(listeners).forEach(el => neu.addEventListener(...el));
        Object.entries(styles).forEach(style => neu.style[style[0]] = style[1]);
    
        if (parent) {
            if (!amEnde) parent.prepend(neu);
            else parent.append(neu);
        }
    
        return neu;
    },
    $(selector) {
        return document.querySelector(selector);
    },
    $$(selector) {
        return [...document.querySelectorAll(selector)];
    },
}

const elements = {};
const timePQ = [10,20,30,40,50,60];

const renderTime = () =>{
    elements.timeParent = dom.$('#time');
    timePQ.forEach(content => {
        dom.create({
            type: 'option',
            parent: elements.timeParent,
            content: content

        })
    })
}

renderTime();