import api from "../../../base/axios/axios.config";
import InquiryDetailModel from "../model/InquiryDetailModel";

class InquiryDetailService {
    inquiryList = (data: any) => {
        return api.post<InquiryDetailModel[]>("/auth/login", data);
    };
}

export default InquiryDetailService