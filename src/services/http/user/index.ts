import { User } from '@/models/user'
import TIMESHEET_API from '@/constants/api_url'
import axios from 'axios'

export const getUser = async () => axios.get(`${TIMESHEET_API.USER_URL}/1`).then((res) => res.data.data as User)

export const putUser = async (user: User) => axios.put(`${TIMESHEET_API.USER_URL}/${user.id}`, user)
