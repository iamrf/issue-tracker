import { Heading, Flex, Card, Box } from "@radix-ui/themes";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
    return (
        <Box className='max-w-xl space-y-4'>
            <Heading><Skeleton /> </Heading>
            <Flex className='space-x-4'>
                <Skeleton width="3rem" />
                <Skeleton width="6rem" />
            </Flex>
            <Card className='prose mt-8'>
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}

export default LoadingIssueDetailPage;