import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { PiNotePencilDuotone } from 'react-icons/pi'

const ButtonIssueEdit = ({ issueId }: { issueId: string }) => {
    return (
        <Button>
            <Link className='flex items-center' href={`/issues/${issueId}/edit`}>
                <PiNotePencilDuotone className="text-lg" />
                &nbsp;Edit Issue
            </Link>
        </Button>
    )
}

export default ButtonIssueEdit