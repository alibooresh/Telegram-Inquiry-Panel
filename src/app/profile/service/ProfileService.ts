import api from "../../../base/axios/axios.config";
import {UserModel} from "../model/UserModel";

class ProfileService {
    getMe = () => {
        return api.get<UserModel>("/user/getMe");
    };

}

export default ProfileService