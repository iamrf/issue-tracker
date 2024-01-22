'use client'
import { Card } from '@radix-ui/themes';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
    open: number
    inProgress: number
    closed: number
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
    const data: { label: string, count: number }[] = [
        { label: 'Open', count: open },
        { label: 'In Progress', count: inProgress },
        { label: 'Closed', count: closed },
    ]

    return (
        <Card>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart width={800} height={400} data={data}>
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 4" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default IssueChart