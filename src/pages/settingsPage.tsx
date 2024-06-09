import { getUser } from '@/services/http/user'
import { SettingsForm, BaseSettingsForm } from '@/components/settingsForm'
import { useQuery } from 'react-query'

export default function SettingsPage() {
	const { data } = useQuery({ queryKey: 'user', queryFn: () => getUser() })
	if (!data)
		return (
			<main className="bg-timesheet-background flex grow justify-center items-center">
				<BaseSettingsForm />
			</main>
		)
	return (
		<main className="bg-timesheet-background flex grow justify-center items-center">
			<SettingsForm user={data} />
		</main>
	)
}
