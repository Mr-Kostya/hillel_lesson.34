class Controller {
    #rootEl;

    constructor($rootEl) {
        this.#rootEl = $rootEl;
        this.studentC = new Collection();
        this.listView = new ListView({
            onDelete: id => this.deleteStudent(id),
            onMarksEdit: (id, marks) => this.studentC.update(id, { marks }),
        });
        this.listView.addEventListeners();
        this.formView = new FormView({
            onSubmit: student => this.saveStudent(student),
        });
        this.listView.appendTo(this.#rootEl);
        this.formView.appendTo(this.#rootEl);

        this.studentC.fetch().then((list) => {
            console.log('LIST: ', list)
            this.listView.renderList(list);
        });
    }


    saveStudent(student) {
        if (student.id) {
            this.studentC.update(student.id, student)
                .then((res) => {
                    this.listView.updateElement(student);
                    this.studentFormView.restForm();
                });
        } else {
            this.studentC.create(student).then((res) => {
                this.listView.addElement(res.item);
                this.formView.restForm();
                res.loading.then(() => this.listView.updateElement(res.item, true));
            });
        }
    }

    deleteStudent(id) {
        this.studentC.delete(id).then(() => this.listView.removeElement(id));
    }
}
