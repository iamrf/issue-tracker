import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { PiArrowUp } from 'react-icons/pi'
import { IssueStatusBadge } from '../components'
import { Issue, Status } from '@prisma/client'
import NextLink from "next/link"

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    page: string
}

interface Props {
    searchParams: IssueQuery,
    issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    {columns.map(col => (
                        <TableColumnHeaderCell key={col.value} className={col.className}>
                            <NextLink href={{
                                query: { ...searchParams, orderBy: col.value }
                            }}>{col.label}</NextLink>
                            {col.value === searchParams.orderBy && <PiArrowUp className="ml-2 inline" />}
                        </TableColumnHeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map(issue => {
                    return <Table.Row key={issue.id}>
                        <Table.RowHeaderCell>
                            <Link href={`/issues/${issue.id}`}>
                                {issue.title}
                            </Link>
                            <div className='block md:hidden text-xs'>
                                <IssueStatusBadge status={issue.status} />
                            </div>
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell className='hidden md:table-cell'>
                            <IssueStatusBadge status={issue.status} />
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell className='hidden md:table-cell'>
                            {issue.description}
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell className='hidden md:table-cell'>
                            {issue.createdAt.toDateString()}
                        </Table.RowHeaderCell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table.Root>
    )
}

const columns: {
    label: string;
    value: keyof Issue;
    className?: string
}[] = [
        { label: 'Issue', value: 'title' },
        { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
        { label: 'Description', value: 'description', className: 'hidden md:table-cell' },
        { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
    ]

export const columnNames = columns.map(col => col.value)

export default IssueTable