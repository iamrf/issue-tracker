'use client'
import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    })

    if (isLoading) return <Skeleton height="2rem" />
    if (error) return null

    return (
        <Select.Root onValueChange={(userId) => {
            axios.patch(`/api/issues/${issue.id}`, { userId: userId })
        }}>
            <Select.Trigger placeholder='Assign ...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map(user => (
                        <Select.Item key={user.id.toString()} value={user.id.toString()}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect