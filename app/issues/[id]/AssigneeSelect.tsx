'use client'
import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useUsers()

    const assignIssue = (userId: string) => {
        toast.promise(axios.patch(`/api/issues/${issue.id}`, userId === "remove" ? { userId: null } : { userId: userId }), {
            loading: 'Loading ...',
            success: 'User assigned Succesfuly',
            error: 'Error when fetching',
        });
    }

    if (isLoading) return <Skeleton height="2rem" />
    if (error) return null

    return (
        <>
            <Select.Root defaultValue={issue.userId || "remove"} onValueChange={assignIssue}>
                <Select.Trigger placeholder='Assign ...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="remove">- UnAssigned</Select.Item>
                        {users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
})

export default AssigneeSelect