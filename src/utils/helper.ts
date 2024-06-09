import { extendedDayjs } from "./dayjs_extend"

export const moneyFormatter = Intl.NumberFormat('id-ID', {
	currency: 'IDR',
	style: 'currency',
	maximumFractionDigits: 0,
})

export const debounceHTML = (
	fn: (event: React.ChangeEvent<HTMLInputElement>) => void,
	delay: number,
) => {
	let timeoutId: NodeJS.Timeout
	return (event: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => fn(event), delay)
	}
}


export const parseDateToDateTimeIso = (date: Date, time: string) => {
	const parseDateStart = extendedDayjs(date)
    const [h, m] = time.split(':').map(Number)
    return parseDateStart.hour(h).minute(m).format('YYYY-MM-DD HH:mm')
}