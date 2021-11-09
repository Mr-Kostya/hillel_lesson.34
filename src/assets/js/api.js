class StudentAPI {
    static STUDENT_API_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students'

    static HEADERS = {
        'Content-type': 'application/json; charset=UTF-8',
    };

    static request(uri = '', method = 'GET', data) {
        return fetch(`${StudentAPI.STUDENT_API_URL}${uri}`, {
            method,
            headers: this.HEADERS,
            body: data ? JSON.stringify(data) : undefined,
        })
            .then((res) => {
                return res.json()
            });
    }

    static getList() {
        return this.request()
    }

    static getOne(id) {
        return this.request(`/${id}`);
    }
    static create(data) {
        return this.request('', 'POST', data);
    }
    static update(id, data) {
        return this.request(`/${id}`, 'PUT', data);
    }
    static delete(id) {
        return this.request(`/${id}`, 'DELETE');
    }
}
