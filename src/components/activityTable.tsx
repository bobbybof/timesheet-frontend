import { deleteActivity } from '@/services/http/activity'
import ActivityForm from '@/components/activityForm'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/dataTable'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { extendedDayjs } from '@/utils/dayjs_extend'
import { Activity } from '@/models/activity'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronsUpDown, PencilLine, Trash } from 'lucide-react'
import { useMemo } from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface ActivityTableProps
	extends Partial<React.HTMLAttributes<HTMLDivElement>> {
	activities: Activity[] | undefined
}

export default function ActivityTable({
	activities,
	...props
}: ActivityTableProps) {
	if (!activities) activities = []
	const queryClient = useQueryClient()
	const deleteMutation = useMutation({
		mutationFn: deleteActivity,
		onSuccess: () => {
			queryClient.invalidateQueries('activities')
		},
	})
	const columns: ColumnDef<Activity>[] = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Judul Kegiatan
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
			},
			{
				accessorKey: 'project_name',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Nama Proyek
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
			},
			{
				accessorKey: 'date_start',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Tanggal Mulai
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (cell) => (
					<div>
						{extendedDayjs(cell.getValue() as string)
							.locale('id')
							.format('DD MMM YYYY')}
					</div>
				),
			},
			{
				accessorKey: 'date_end',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Tanggal Berakhir
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (cell) => (
					<div>
						{extendedDayjs(cell.getValue() as string)
							.locale('id')
							.format('DD MMM YYYY')}
					</div>
				),
			},
			{
				accessorKey: 'date_start',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Waktu Mulai
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (cell) => {
					return (
						<div>
							{extendedDayjs.utc(cell.getValue() as string)
								.format('HH:mm')}
						</div>
					)

				},
			},
			{
				accessorKey: 'date_end',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Waktu Berakhir
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (cell) => (
					<div>
						{extendedDayjs.utc(cell.getValue() as string)
							.locale('id')
							.format('HH:mm')}
					</div>
				),
			},
			{
				accessorKey: 'id',
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Durasi
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: ({ row }) => {
					const startTime = extendedDayjs(row.original.date_start, 'HH:mm:ss')
					const start = extendedDayjs(row.original.date_start)
						.add(startTime.hour(), 'hour')
						.add(startTime.minute(), 'minute')
					const endTime = extendedDayjs(row.original.date_end, 'HH:mm:ss')
					const end = extendedDayjs(row.original.date_end)
						.add(endTime.hour(), 'hour')
						.add(endTime.minute(), 'minute')
					const day = end.diff(start, 'd')
					const hour = end.diff(start, 'h') % 24
					const minute = end.diff(start, 'm') % 60
					return (
						<div>
							{day > 0 && `${day} hari`} {hour > 0 && `${hour} jam`}{' '}
							{minute > 0 && `${minute} menit`}
						</div>
					)
				},
			},
			{
				accessorKey: 'id',
				header: 'Aksi',
				cell: ({ row }) => (
					<div className="flex gap-1">
						<Dialog >
							<DialogTrigger className="text-yellow-600 rounded-lg border p-1.5 hover:bg-timesheet-background">
								<PencilLine height={16} />
							</DialogTrigger>
							<ActivityForm
								defaultValues={row.original}
							/>
						</Dialog>
						<Button
							variant="ghost"
							className="text-timesheet-red border hover:text-timesheet-red hover:bg-timesheet-background p-1.5"
							onClick={() => deleteMutation.mutate(row.getValue('id'))}
						>
							<Trash height={16} />
						</Button>
					</div>
				),
			},
		],
		[],
	)
	return (
		<DataTable
			{...props}
			columns={columns}
			data={activities}
			emptyMessage="Belum ada kegiatan"
		/>
	)
}
