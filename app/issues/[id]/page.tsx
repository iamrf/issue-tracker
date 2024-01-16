import authOptions from '@/app/auth/authOptions'
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import AssigneeSelect from './AssigneeSelect'
import ButtonIssueDelete from './ButtonIssueDelete'
import ButtonIssueEdit from './ButtonIssueEdit'
import IssueDetails from './IssueDetails'

export const metadata: Metadata = {
    title: 'Issue Detail Page',
}

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions)

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap='4' >
            <Box className='md:col-span-4'>
                {/* {issue.assignedToUser &&
                    <Text>{issue.assignedToUser.name}</Text>
                } */}
                <IssueDetails issue={issue} />
            </Box>
            {session &&
                <Box>
                    <Flex direction="column" gap="4">
                        <AssigneeSelect issue={issue} />
                        <ButtonIssueEdit issueId={issue.id.toString()} />
                        <ButtonIssueDelete issueId={issue.id.toString()} issueTitle={issue.title} />
                    </Flex>
                </Box>
            }
        </Grid>
    )
}

export default IssueDetailPage
