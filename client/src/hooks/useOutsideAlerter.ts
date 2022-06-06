import { useEffect } from 'react'

//https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref: any, callback?: () => any) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target) && callback) {
				//alert('You clicked outside of me!')
				callback()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, callback])
}
