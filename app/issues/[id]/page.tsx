import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import dbConnect from '@/app/lib/dbConnect'
import Issue from '@/app/models/Issue'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import mongoose from 'mongoose'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
    title: 'Issue Detail Page',
}

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    if (!mongoose.Types.ObjectId.isValid(params.id)) notFound()

    await dbConnect()
    const issue = await Issue.findById(params.id)

    if (!issue) notFound();

    return (
        <div className='space-y-4'>
            <Heading>{issue.title} </Heading>
            <Flex className='space-x-4'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>{issue.description}</Card>
        </div>
    )
}

export default IssueDetailPage
