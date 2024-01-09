import { Skeleton } from "@/app/components"
import { Box } from '@radix-ui/themes'

const LoadingNewIssuePage = () => {
    return (
        <Box className='max-w-lg'>
            <Skeleton />
            <Skeleton height="20rem" />
            <Skeleton width="8rem" />
        </Box>
    )
}

export default LoadingNewIssuePage