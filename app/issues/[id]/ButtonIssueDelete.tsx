'use client'
import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PiTrash } from 'react-icons/pi'

const ButtonIssueDelete = ({ issueId, issueTitle }: { issueId: string, issueTitle: string }) => {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/issues/${issueId}`)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isLoading}>
                        {isLoading ?
                            <>
                                Loading ...
                                <Spinner />
                            </>
                            :
                            <>
                                <PiTrash className="text-lg" />
                                &nbsp;Delete Issue
                            </>}
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
                            <Button color='red' onClick={handleDelete}>Delete</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
                    <AlertDialog.Action>
                        <AlertDialog.Cancel>
                            <Button mt="4" color='gray' variant='soft' onClick={() => setError(false)}>OK</Button>
                        </AlertDialog.Cancel>
                    </AlertDialog.Action>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default ButtonIssueDelete