import {useState, useEffect} from "react"

export const useLocalStorage = (initialValue, storageName) => {
    const getValue = () => {
        const storage = localStorage.getItem(storageName);
        return storage ? JSON.parse(storage) : initialValue;
    }

    const [value, setValue] = useState(getValue())

    useEffect(() => {
        const saveData = async () => {
            await localStorage.setItem(storageName, JSON.stringify(value));
        }
        saveData();
    }, [value, storageName]);

    return [value, setValue]
}