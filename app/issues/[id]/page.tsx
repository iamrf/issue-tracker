import dbConnect from '@/app/lib/dbConnect'
import Issue from '@/app/models/Issue'
import { Box, Grid } from '@radix-ui/themes'
import mongoose from 'mongoose'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ButtonIssueEdit from './ButtonIssueEdit'
import IssueDetails from './IssueDetails'

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
        <Grid columns={{ initial: "1", md: "2" }} gap='4' >
            <Box className='space-y-4'>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <ButtonIssueEdit issueId={issue.id} />
            </Box>
        </Grid>
    )
}

export default IssueDetailPage
