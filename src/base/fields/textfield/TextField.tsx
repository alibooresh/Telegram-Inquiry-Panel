import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
    name: string;
    label: string;
    type?: string;
}

const TextFieldWrapper: React.FC<Props> = ({ name, label, type = "text", ...otherProps }) => {
    const [field, meta] = useField(name);

    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: "outlined" as const,
        label,
        type,
    };


    return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
