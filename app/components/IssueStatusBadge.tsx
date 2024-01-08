import { Badge } from '@radix-ui/themes'
import React from 'react'
import classnames from 'classnames'

interface Props {
    status: 'OPEN' | 'CLOSED' | 'IN_PROGRESS'
}

const statusMap: Record<string, { label: string, color: 'red' | 'violet' | 'green' }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' }
}

const IssueStatusBadge = ({ status }: Props) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge