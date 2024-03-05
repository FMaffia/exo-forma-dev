export class MenuItem {

    id;
    label;
    path;
    icon;
    children

    constructor(id,
                label,
                path,
                icon = "bi bi-diamond me-2 font-small",
                children) {
        this.id = id;
        this.label = label;
        this.path = path;
        this.icon = icon;
        this.children = children;

    }

    isActive(currentPath) {
        return this.path === currentPath
    }

    hasChildren() {
        return this.children !== undefined
    }

}
