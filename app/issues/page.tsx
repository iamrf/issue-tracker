import { IssueStatusBadge, Link } from '@/app/components'
import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import { Metadata } from 'next'
import IssueActions from './IssueActions'
import prisma from '@/prisma/client'

export const metadata: Metadata = {
    title: 'Issues',
}

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany()
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
        </div>
    )
}

export default IssuesPage