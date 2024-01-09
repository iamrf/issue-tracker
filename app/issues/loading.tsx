import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'
import IssueActions from './IssueActions'

const LoadingIssuePage = () => {
    const issues = [1, 2, 3, 4, 5]

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
                        return <Table.Row key={issue}>
                            <Table.RowHeaderCell>
                                <Skeleton />
                            </Table.RowHeaderCell>
                            <Table.RowHeaderCell className='hidden md:table-cell'>
                                <Skeleton />
                            </Table.RowHeaderCell>
                            <Table.RowHeaderCell className='hidden md:table-cell'>
                                <Skeleton />
                            </Table.RowHeaderCell>
                            <Table.RowHeaderCell className='hidden md:table-cell'>
                                <Skeleton />
                            </Table.RowHeaderCell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default LoadingIssuePage