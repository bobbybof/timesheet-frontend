import Searchbar from '@/components/searchbar'
import { PlusCircle } from 'lucide-react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import ActivityForm from '@/components/activityForm'
import { useState } from 'react'
import { tm } from '@/utils/twmerge'

interface ActivityListHeaderProps
	extends Partial<React.HTMLAttributes<HTMLDivElement>> {}
export default function ActivityListHeader({
	...props
}: ActivityListHeaderProps) {
	const [dialogOpen, setDialogOpen] = useState(false)
	return (
		<div {...props} className={tm('flex justify-between', props.className)}>
			<div className="flex gap-4 items-center">
				<p className="font-bold text-xl">Daftar Kegiatan</p>
				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogTrigger className="flex p-1.5 items-center rounded gap-1 text-base font-bold text-timesheet-blue bg-timesheet-blue hover:bg-timesheet-blue hover:text-timesheet-blue hover:bg-opacity-5 bg-opacity-10">
						<PlusCircle height={20} />
						Tambah Kegiatan
					</DialogTrigger>
					<ActivityForm setDialogOpen={setDialogOpen} />
				</Dialog>
			</div>
			<div className="flex gap-4 items-center">
				<Searchbar />
			</div>
		</div>
	)
}
