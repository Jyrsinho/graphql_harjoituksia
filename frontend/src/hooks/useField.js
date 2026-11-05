import {useState} from "react";

const useField = (type, label) => {
    const [value, setValue] = useState("")

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return [
        {
            type,
            value,
            onChange,
            label,
        },
        () => setValue("")
    ]
}

export default useField;