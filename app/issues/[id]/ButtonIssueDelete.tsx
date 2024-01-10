import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { PiTrash } from 'react-icons/pi'

const ButtonIssueDelete = ({ issueId }: { issueId: string }) => {
    return (
        <Button color='red'>
            <PiTrash className="text-lg" />
            &nbsp;Delete Issue
        </Button>
    )
}

export default ButtonIssueDelete