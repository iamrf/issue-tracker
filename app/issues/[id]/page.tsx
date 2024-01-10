import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import dbConnect from '@/app/lib/dbConnect'
import Issue from '@/app/models/Issue'
import { Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import mongoose from 'mongoose'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from "react-markdown"
import { PiNotePencilDuotone } from "react-icons/pi";

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
            <div className='space-y-4'>
                <Heading>{issue.title} </Heading>
                <Flex className='space-x-4'>
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose mt-8'>
                    <ReactMarkdown>
                        {issue.description}
                    </ReactMarkdown>
                </Card>
            </div>
            <div>
                <Button>
                    <Link className='flex items-center' href={`/issues/${issue.id}/edit`}>
                        <PiNotePencilDuotone className="text-lg" />
                        &nbsp;Edit Issue
                    </Link>
                </Button>
            </div>
        </Grid>
    )
}

export default IssueDetailPage
