import ActivityPage from '@/pages/activityPage'
import ErrorPage from '@/pages/errorPage'
import RootLayout from '@/layouts/rootLayout'
import SettingsPage from '@/pages/settingsPage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '',
				element: <ActivityPage />,
			},
			{
				path: '/settings',
				element: <SettingsPage />,
			},
		],
	},
])
export default router
