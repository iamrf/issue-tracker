'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { orderBy } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    return (
        <Select.Root
            defaultValue={searchParams.get('status') || ''}
            onValueChange={status => {
                const params = new URLSearchParams()
                if (status) params.append('status', status)
                if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!)
                if (searchParams.get('page')) params.append('page', searchParams.get('page')!)

                const query = params.size ? '?' + params.toString() : ''
                router.push(query)
            }}>
            <Select.Trigger placeholder='Filter Status' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Select Status</Select.Label>
                    {statuses.map(status => (
                        <Select.Item key={status.value || status.label} value={status.value || 'all'}>{status.label}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>

        </Select.Root>
    )
}

export default IssueStatusFilter