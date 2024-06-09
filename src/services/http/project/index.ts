import { Project } from '@/models/projects'
import TIMESHEET_API from '@/constants/api_url'
import axios from 'axios'

export const postProject = async (project: Project) => {
	return axios
		.post(TIMESHEET_API.PROJECT_URL, project)
		.then((res) => res.data.data as Project)
}

export const getProjects = async () => {
	return axios
		.get(`${TIMESHEET_API.PROJECT_URL}s`)
		.then((res) => res.data.data as Project[])
}