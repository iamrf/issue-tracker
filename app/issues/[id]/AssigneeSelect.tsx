'use client'
import { Users } from '@/app/models/User'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {
    const [users, setUsers] = useState<Users[]>([])
    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get<Users[]>('/api/users')
            setUsers(data)
        }
        fetchUsers()
    }, [])
    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign ...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users.map(user => (
                        <Select.Item key={user.email} value={user.email}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect