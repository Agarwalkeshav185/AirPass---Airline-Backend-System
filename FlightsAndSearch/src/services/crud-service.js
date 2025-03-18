class crudService{
    constructor(repository){
        this.repository = repository;
    }

    async create(data){
        try {
            const result = await this.repository.create(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in the crud Service Layer');
            throw error;
        }
    }

    async destory(id){
        try {
            const result = await this.repository.delete(id);
            return result;
        } catch (error) {
            console.log('Something went wrong in the crud Service Layer');
            throw error;
        }
    }

    async get(id){
        try {
            const response = await this.repository.get(id);
            return response;
        } catch (error) {
            console.log('Something went wrong in the crud Service Layer');
            throw error;
        }
    }

    async getAll(){
        try {
            const response = await this.repository.getAll();
            return response;
        } catch (error) {
            console.log('Something went wrong in the crud Service Layer');
            throw error;
        }
    }

    async update(id, data){
        try {
            const response = await this.repository.update(id, data);
            return response;
        } catch (error) {
            console.log('Something went wrong in the crud Service Layer');
            throw error;
        }
    }
}

module.exports = crudService;