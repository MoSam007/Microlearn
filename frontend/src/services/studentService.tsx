import axios from 'axios';

const baseUrl = '/api/students';

interface Student {
    name: string;
    email: string;
}

const getAll = () => axios.get(baseUrl);
const create = (student: Student) => axios.post(baseUrl, student);

export default { getAll, create };
