import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import dbConnect from '@/app/lib/dbConnect'
import Issue from '@/app/models/Issue'
import mongoose from 'mongoose'
import { notFound } from 'next/navigation'
import React from 'react'

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
            <div>{issue.title} <IssueStatusBadge status={issue.status} /></div>
            <p>{issue.description}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    )
}

export default IssueDetailPage
