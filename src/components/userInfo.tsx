import { Base } from '@/components/ui/base'
import { User } from '@/models/user'
import { moneyFormatter } from '@/utils/helper'
import { tm } from '@/utils/twmerge'

interface UserInfoProps extends Partial<React.HTMLAttributes<HTMLDivElement>> {
	user: User | undefined
}

export default function UserInfo({ user, ...props }: UserInfoProps) {
	if (!user)
		return (
			<div
				{...props}
				className={tm('flex items-center gap-16 border-b', props.className)}
			>
				<div>
					<p className="text-sm text-muted-foreground">Nama Karyawan</p>
					<Base className="h-6 w-32" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Rate</p>
					<Base className="h-6 w-32" />
				</div>
			</div>
		)
	return (
		<div
			{...props}
			className={tm('flex items-center gap-16 border-b-4 border-timesheet-background', props.className)}
		>
			<div>
				<p className="text-sm text-muted-foreground">Nama Karyawan</p>
				<p>{user.name}</p>
			</div>
			<div>
				<p className="text-sm text-muted-foreground">Rate</p>
				<p>{moneyFormatter.format(user.rate)}/jam</p>
			</div>
		</div>
	)
}
