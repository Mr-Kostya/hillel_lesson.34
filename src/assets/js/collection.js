class Collection {
    #list = [];

    fetch() {
        return StudentAPI
            .getList()
            .then((list) => {
                this.setList(list);

                return list;
            });
    }

    create(data) {
        const item = {
            marks: this.getDefaultMarcs(),
            ...data,
        };

        this.#list.push(item);

        const loading = StudentAPI.create(item).then((res) => {
            item.id = res.id;

            return item;
        });
        return Promise.resolve({ item, loading });
    }

    update(id, data) {
        const item = this.get(id);

        Object.keys(data).forEach(key => item[key] = data[key]);

        const loading = StudentAPI.update(id, item);

        return Promise.resolve({item, loading});
    }

    delete(id) {
        StudentAPI.delete(id);

        return Promise.resolve(this.getList());
    }

    setList() {
        return this.#list;
    }

    getList() {
        return this.#list;
    }

    get(id) {
        return this.#list.find(item => +item.id ===+id);
    }

    getDefaultMarcs() {
        return (new Array(10)).fill(0);
    }
}
