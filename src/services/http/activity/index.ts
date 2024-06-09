import { Activity, ActivityRequestBody } from '@/models/activity'
import TIMESHEET_API from '@/constants/api_url'
import axios from 'axios'
import { parseDateToDateTimeIso } from '@/utils/helper'

export const getActivities = async ({
    projects,
    search,
    user_id
}: {
    search?: string | null
    projects?: string | null
    user_id?: number | null
}) => {
    console.log(projects)
    return axios
        .get(TIMESHEET_API.ACTIVITIES_URL, {
            params: { search, projects: projects?.split('-').join(' '), user_id },
        })
        .then((res) => res.data.data as Activity[])
}

export const postActivity = async (activity: Activity) => {
    const activityBodyRequest: ActivityRequestBody = {
        date_start: parseDateToDateTimeIso(activity.date_start, activity.time_start),
        date_end: parseDateToDateTimeIso(activity.date_end, activity.time_end),
        name: activity.name,
        user_id: activity.user_id,
        project_id: activity.project_id
    }

    return axios
        .post(TIMESHEET_API.ACTIVITY_URL, activityBodyRequest)
        .then((res) => res.data.data as Activity)
}

export const putActivity = async (activity: Activity) => {
    
    const activityBodyRequest: ActivityRequestBody = {
        date_start: parseDateToDateTimeIso(activity.date_start, activity.time_start),
        date_end: parseDateToDateTimeIso(activity.date_end, activity.time_end),
        name: activity.name,
        project_id: activity.project_id
    }

    return axios
        .put(`${TIMESHEET_API.ACTIVITY_URL}/${activity.id}`, activityBodyRequest)
        .then((res) => res.data.data as Activity)
}

export const deleteActivity = (id: number) => axios.delete(`${TIMESHEET_API.ACTIVITY_URL}/${id}`)