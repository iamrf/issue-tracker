import { Skeleton } from '@/app/components'
import { Box } from '@radix-ui/themes'

const IssueFormSkeleton = () => {
    return (
        <Box className='max-w-lg'>
            <Skeleton height="2rem" />
            <Skeleton height="20rem" />
            <Skeleton width="8rem" height="2rem" />
        </Box>
    )
}

export default IssueFormSkeleton