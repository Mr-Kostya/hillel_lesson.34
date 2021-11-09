class FormView {
    #$inputs;

    constructor(options) {

        this.options = options;
        this.$rootEl = this.initView();
        this.#$inputs = this.$rootEl.find('input, textarea');
    }

    appendTo($container) {
        $container.append(this.$rootEl);
    }

    initView() {
        return $(`
        <form>
            <input name="id" type="hidden">
            <input name="name" type="text">
            <button>Save</button>
</form>
        `).on('submit', this.onFormSubmit.bind(this));
    }


    onFormSubmit(e) {
        e.preventDefault();

        const student = this.getFormData();

        this.options.onSubmit(student);
    }

    setFormData(student) {
        for (const input of this.#$inputs) {
            if (input.name in student) {
                input.value = student[input.name];
            }
        }
    }

    getFormData() {
        const student = {};

        for (const input of this.#$inputs) {
            student[input.name] = input.value;
        }

        return student;
    }

    restForm() {
        this.#$inputs.val('');
    }

}
