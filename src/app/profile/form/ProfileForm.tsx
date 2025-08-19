import React, {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import {UserModel} from "../model/UserModel";
import ProfileService from "../service/ProfileService";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import {useNavigate} from "react-router-dom";

const ProfileForm: React.FC = () => {
    const [user, setUser] = useState<UserModel>({id: null, phoneNumber: null});
    const [loading, setLoading] = useState<boolean>(true);
    const service = new ProfileService();
    const navigate = useNavigate();
    useEffect(() => {
        if (user.id==null){
            service.getMe().then(value => {
                setUser(value.data);
            }).catch(reason => {
                setUser({...user,id:0});
            }).finally(() => setLoading(false));
        }
    })
    return (
        <>
            {
                loading ?
                    <Card sx={{maxWidth: 800, margin: "2rem auto", borderRadius: 3, boxShadow: 3}}>
                        <CardContent className={"profile-content"}>
                            <CircularProgress/>
                        </CardContent>
                    </Card>
                    :
                    <>
                        {user.id == null ?
                            <Card sx={{maxWidth: 800, margin: "2rem auto", borderRadius: 3, boxShadow: 3}}>
                                <CardContent className={"profile-content"}>
                                    <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                                        پروفایل کاربر
                                    </Typography>
                                    <Divider sx={{mb: 2}}/>
                                    <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                                        اطلاعاتی جهت نمایش وجود ندارد
                                    </Typography>

                                </CardContent>
                            </Card>
                            :
                            <Card sx={{maxWidth: 800, margin: "2rem auto", borderRadius: 3, boxShadow: 3}}>
                                <CardHeader
                                    title={
                                        <Typography variant="h5" align="right" fontWeight="bold" gutterBottom>
                                            پروفایل کاربر
                                        </Typography>
                                    }
                                    action={
                                        <Stack textAlign={"left"} direction="row-reverse">
                                            <IconButton title={"خروج"} color="error"
                                                        onClick={() => navigate("/login")}>
                                                <LogoutIcon/>
                                            </IconButton>
                                            <IconButton color="primary" title={"استعلام"}
                                                        onClick={() => navigate("/inquiry")}>
                                                <PersonSearchIcon/>
                                            </IconButton>
                                            {/*<IconButton color="error" onClick={()=>{}}>*/}
                                            {/*    <DeleteIcon />*/}
                                            {/*</IconButton>*/}
                                        </Stack>
                                    }
                                />
                                <CardContent className={"profile-content"}>
                                    {/*<Typography variant="h5" align="center" fontWeight="bold" gutterBottom>*/}
                                    {/*    پروفایل کاربر*/}
                                    {/*</Typography>*/}
                                    {/*<Divider sx={{mb: 2}}/>*/}

                                    <Typography variant="body1">
                                        <strong>نام:</strong> {user.firstName || "-"}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>نام خانوادگی:</strong> {user.lastName || "-"}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>شماره تلفن:</strong> {user.phoneNumber}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>شناسه کاربری:</strong> {user.id}
                                    </Typography>

                                    <Divider sx={{my: 2}}/>

                                    {/* یوزرنیم‌ها */}
                                    <Typography variant="h6" gutterBottom>
                                        نام‌های کاربری
                                    </Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemText className={"rtl"} primary="یوزرنیم فعال"/>
                                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                                {user.usernames?.activeUsernames?.map((uname, i) => (
                                                    <Chip key={i} label={uname} color="success" variant="outlined"/>
                                                ))}
                                            </Stack>
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText className={"rtl"} primary="یوزرنیم غیرفعال"/>
                                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                                {user.usernames?.disabledUsernames?.map((uname, i) => (
                                                    <Chip key={i} label={uname} color="error" variant="outlined"/>
                                                ))}
                                            </Stack>
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText className={"rtl"} primary="یوزرنیم قابل ویرایش"/>
                                            {user.usernames?.editableUsername ? (
                                                <Chip label={user.usernames.editableUsername} color="primary"/>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    ندارد
                                                </Typography>
                                            )}
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        }
                    </>
            }
        </>
    );
};

export default ProfileForm;
