class ListView {
    static EDIT_BTN_SELECTOR = '.edit-btn';
    static DELETE_BTN_SELECTOR = '.delete-btn';
    static STUDENT_LIST_SELECTOR = '#studentList';
    static STUDENT_ITEM_SELECTOR = '.student-item';
    static MARK_INPUT_SELECTOR = '.mark-input';

    constructor(options) {
        this.options = options;
        this.$rootEl = this.initViev();
        this.$list = this.$rootEl.find(ListView.STUDENT_LIST_SELECTOR);
    }

    initViev() {
        return $(`
        <table>
            <tr>
                <th>Name</th>
                <th colspan="10">Marks</th>
                <th>Action</th>
            </tr>
 <tbody id="studentList"></tbody>
</table>
        `);
    }

    appendTo($container) {
        $container.append(this.$rootEl);
    }

    addEventListeners() {
        this.$list
            .on('focusout', ListViev.MARK_INPUT_SELECTOR, this.onMarkInputFocusOut.bind(this))
            .on('click', ListViev.DELETE_BTN_SELECTOR, this.onDeleteBtnClick.bind(this));
    }

    onDeleteBtnClick(e) {
        console.log(e);
        e.stopPropagation();

        const id = this.getElementId(e.target);
        const marks = this.getAllMarksById(id);

        this.options.onDelete(id);
    }

    onMarkInputFocusOut(e) {
        e.stopPropagation();

        const id = this.getElementId(e.target);
        const marks = this.getAllMarksById(id);

        this.options.onDelete(id);
    }

    getElementId(el) {
        const id = el.closest(ListView.STUDENT_ITEM_SELECTOR)?.dataset;

        return id ? +id : NaN;
    }

    generateStudentHTML(student) {
        return `
        <tr data-id="${student.id}" class="student-item">
        <td>${student.name}</td>
        ${student.marks.map(mark => `
        <td>
        <input class="mark-input" type="text" value="${mark}">
</td>
        `).join('')}
        <td><button class="delete-btn"></button></td>   
</tr>
        `;
    }

    renderList(list) {
        const html = list.map(student => this.generateStudentHTML(student)).join('');
        this.$list.html(html);
    }

    addElement(student) {
        const studentHtml = this.generateStudentHTML(student);

        this.$list.append(studentHtml);
    }

    removeElement(id) {
        this.getElById(id).remove();
    }

    updateElement(student, isNew = false) {
        const id = isNew ? '' : student.id;
        const studentHtml = this.generateStudentHTML(student);

        this.getElById(id).replaceWith(studentHtml);
    }

    getAllMarksById(id) {
        return Array
            .from(this.getElById(id).find(ListView.MARK_INPUT_SELECTOR))
            .map(el => +el.value);
    }

    getElById(id) {
        return this.$list.find(`[data-id="${id}"]`);
    }
}
