/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from "react"

export const useLocalStorage = (initialValue, storageName) => {
	const getValue = () => {
		const storage = localStorage.getItem(storageName)
		if (storage) {
			return JSON.parse(storage)
		}
		return initialValue
	}

	const [value, setValue] = useState(getValue)

	useEffect(() => {
		localStorage.setItem(storageName, JSON.stringify(value))
	}, [value])

	return [value, setValue]
}