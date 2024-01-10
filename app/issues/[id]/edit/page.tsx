import dbConnect from '@/app/lib/dbConnect'
import Issue from '@/app/models/Issue'
import mongoose from 'mongoose'
import dynamic from "next/dynamic"
import { notFound } from 'next/navigation'
import IssueFormSkeleton from '../../_components/IssueFormSkeleton'

const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    }
)

interface Props {
    params: { id: string }
}

const IssueEditPage = async ({ params }: Props) => {
    if (!mongoose.Types.ObjectId.isValid(params.id)) notFound()
    await dbConnect()
    const issue = await Issue.findById(params.id)

    if (!issue) notFound()

    return (
        <IssueForm issue={{
            _id: issue._id.toString(),
            title: issue.title,
            description: issue.description
        }} />
    )
}

export default IssueEditPage