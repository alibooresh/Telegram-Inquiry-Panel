import api from "../../../base/axios/axios.config";
import InquiryModel from "../model/InquiryModel";

class InquiryService {
    inquiryList = (data: any) => {
        return api.post<InquiryModel[]>("/inquiry/search", data);
    };
    startInquiry = (data: any) => {
        return api.post("/inquiry/start", data);
    };
}

export default InquiryService