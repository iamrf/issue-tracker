import { IssueStatusBadge } from '@/app/components'
import { Issues } from '@/app/models/Issue'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issues }) => {
    return (
        <>
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
        </>
    )
}

export default IssueDetails