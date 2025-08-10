import api from "../../../base/axios/axios.config";
import InquiryModel from "../model/InquiryModel";

class InquiryService {
    inquiryList = (data: any) => {
        return api.post<InquiryModel[]>("/auth/login", data);
    };
}

export default InquiryService