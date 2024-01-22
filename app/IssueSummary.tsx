import { Status } from '@prisma/client'
import { Card, Grid, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
    open: number
    inProgress: number
    closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const containers: {
        label: string;
        value: number;
        status: Status;
    }[] = [
            { label: 'Open Issues', value: open, status: 'OPEN' },
            { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
            { label: 'Closed Issues', value: closed, status: 'CLOSED' },
        ]
    return (
        <Grid columns="3" gap="4">
            {containers.map(container => (
                <Card key={container.status}>
                    <Flex direction="column" gap="2">
                        <Link className='font-medium text-sm' href={`/issues?status=${container.status}`}>
                            {container.label}
                        </Link>
                        <Text size="5" className='font-bold'>
                            {container.value}
                        </Text>
                    </Flex>
                </Card>
            ))}
        </Grid>
    )
}

export default IssueSummary