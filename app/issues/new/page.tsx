'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

// interface IssueForm {
//     title: string
//     description: string
// }
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) })
    const [error, setError] = useState('')

    return (
        <div className='max-w-xl'>
            {error &&
                <Callout.Root color="red" className='mb-4'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }

            <form onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issues', data)
                    router.push('/issues')
                } catch (error) {
                    setError('an error occured')
                }
            })} className='space-y-4'>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="write description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage