import React from 'react'
import IssueForm from '../../_components/IssueForm'
import dbConnect from '@/app/lib/dbConnect'
import Issue from '@/app/models/Issue'
import { notFound } from 'next/navigation'
import mongoose from 'mongoose'

interface Props {
    params: { id: string }
}

const IssueEditPage = async ({ params }: Props) => {
    if (!mongoose.Types.ObjectId.isValid(params.id)) notFound()
    await dbConnect()
    const issue = await Issue.findById(params.id)

    if (!issue) notFound()

    return (
        <IssueForm issue={issue} />
    )
}

export default IssueEditPage