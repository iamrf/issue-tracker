'use client'
import { ErrorMessage, Spinner } from '@/app/components';
import { Issues } from '@/app/models/Issue';
import { IssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

// interface IssueForm {
//     title: string
//     description: string
// }
type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issues }) => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({ resolver: zodResolver(IssueSchema) })
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            if (issue) {
                await axios.patch(`/api/issues/${issue._id}`, data)
                router.push(`/issues/${issue._id}`)
                router.refresh()
            }
            else {
                await axios.post('/api/issues', data)
                router.push('/issues')
                router.refresh()
            }
        } catch (error) {
            setSubmitting(false)
            setError('an error occured')
        }
    })

    return (
        <div className='max-w-xl'>
            {error &&
                <Callout.Root color="red" className='mb-4'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }

            <form onSubmit={onSubmit} className='space-y-4'>
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="write description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Edit Issue' : 'Submit New Issue'}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm