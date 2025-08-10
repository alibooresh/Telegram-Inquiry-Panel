import api from "../../../base/axios/axios.config";

class ExampleService {
    example = (data: any) => {
        return api.post<any>("/any", data);
    };
} export default ExampleService;