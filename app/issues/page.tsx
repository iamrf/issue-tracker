import { Badge, Button, Table, TableColumnHeaderCell } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import dbConnect from '../lib/dbConnect'
import Issue from '../models/Issue'
import IssueStatusBadge from '../components/IssueStatusBadge'
import IssueActions from './IssueActions'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Issues',
}

const IssuesPage = async () => {
    await dbConnect();
    const issues = await Issue.find();
    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <TableColumnHeaderCell>
                            Issue
                        </TableColumnHeaderCell>
                        <TableColumnHeaderCell className='hidden md:table-cell'>
                            Status
                        </TableColumnHeaderCell>
                        <TableColumnHeaderCell className='hidden md:table-cell'>
                            Description
                        </TableColumnHeaderCell>
                        <TableColumnHeaderCell className='hidden md:table-cell'>
                            Created
                        </TableColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => {
                        return <Table.Row key={issue._id}>
                            <Table.RowHeaderCell>
                                <Link href={`/issues/${issue._id}`}>
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
        </div>
    )
}

export default IssuesPage