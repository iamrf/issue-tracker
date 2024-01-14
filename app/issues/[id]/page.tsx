import dbConnect from '@/app/lib/dbConnect'
import Issue from '@/app/models/Issue'
import { Box, Flex, Grid } from '@radix-ui/themes'
import mongoose from 'mongoose'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ButtonIssueEdit from './ButtonIssueEdit'
import IssueDetails from './IssueDetails'
import ButtonIssueDelete from './ButtonIssueDelete'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'

export const metadata: Metadata = {
    title: 'Issue Detail Page',
}

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions)

    if (!mongoose.Types.ObjectId.isValid(params.id)) notFound()

    await dbConnect()
    const issue = await Issue.findById(params.id)

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap='4' >
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session &&
                <Box>
                    <Flex direction="column" gap="4">
                        <AssigneeSelect />
                        <ButtonIssueEdit issueId={issue.id} />
                        <ButtonIssueDelete issueId={issue.id} issueTitle={issue.title} />
                    </Flex>
                </Box>
            }
        </Grid>
    )
}

export default IssueDetailPage
