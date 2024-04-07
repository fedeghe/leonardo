var dom = {
    create : function(tag, attrs, children){
        var t = document.createElement(tag);
        if (attrs) {
            for(a in attrs) {
                t.setAttribute(a, attrs[a])
            }
        }
        if (children) {
            if (Array.isArray(children))
                children.forEach(child => t.appendChild(child))
            else 
                t.appendChild(children)
        }
        return t;
    },
}