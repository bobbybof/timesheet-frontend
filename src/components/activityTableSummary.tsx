import { moneyFormatter } from '@/utils/helper'
import { Activity } from '@/models/activity'
import { User } from '@/models/user'
import { useMemo } from 'react'
import { extendedDayjs } from '@/utils/dayjs_extend'
import { tm } from '@/utils/twmerge'

interface ActivityTableSummaryProps
	extends Partial<React.HTMLAttributes<HTMLDivElement>> {
	activities: Activity[] | undefined
	user: User | undefined
}

export default function ActivityTableSummary({
	activities,
	user,
	...props
}: ActivityTableSummaryProps) {
	const totalMinutes = useMemo(
		() =>
			activities?.reduce((acc, activity) => {
				const startTime = extendedDayjs.utc(activity.date_start)
				const endTime = extendedDayjs.utc(activity.date_end)
				const minute = endTime.diff(startTime, 'm')
				return acc + minute
			}, 0),
		[activities],
	)

	const totalHours = useMemo(() => {
		if (totalMinutes) return Math.floor(totalMinutes / 60)
		else return 0
	}, [totalMinutes])
	return (
		<div
			{...props}
			className={tm(
				'flex justify-between bg-timesheet-background',
				props.className,
			)}
		>
			<div className="flex flex-col gap-1">
				<p>Total Durasi</p>
				<p className="font-bold text-lg">Total Pendapatan</p>
			</div>
			<div className="flex flex-col gap-1 text-end">
				<p>
					{totalMinutes === 0 && '-'}
					{totalHours ? `${totalHours} jam` : ''}{' '}
					{totalMinutes ? `${totalMinutes % 60} menit` : ''}
				</p>
				<p className="font-bold text-lg">
					{totalHours === 0 ? '-' : user?.rate && moneyFormatter.format(user.rate * totalHours)}
				</p>
			</div>
		</div>
	)
}
