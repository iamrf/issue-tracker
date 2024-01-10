'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { PiTrash } from 'react-icons/pi'

const ButtonIssueDelete = ({ issueId, issueTitle }: { issueId: string, issueTitle: string }) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>
                    <PiTrash className="text-lg" />
                    &nbsp;Delete Issue
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Delete {issueTitle}</AlertDialog.Title>
                <AlertDialog.Description>Are you sure?</AlertDialog.Description>
                <Flex mt="4" gap='4'>
                    <AlertDialog.Cancel>
                        <Button color='gray' variant='soft'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color='red'>Delete</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default ButtonIssueDelete