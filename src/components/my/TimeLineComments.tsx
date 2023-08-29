import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Post } from '@/app/common/types/post.types';
import { Card } from '../ui/card';
import { useEffect, useState } from 'react';

type Comment = {
    id: number;
    created_at: Date;
    updated_at: Date;
    text: string;
    nameAuthor: string;
    postId: number;
};

export default function TimeLineComments({ comments }: { comments: Comment[] }) {
    const [commentList, setCommentList] = useState<Comment[]>([]);

    useEffect(() => {
      setCommentList(comments);
    }, [comments]);

    return (
        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                },
            }}
        >
            {comments.map((comment, index) => (
                <TimelineItem key={index}>
                    <TimelineOppositeContent>
                        <p>Por: { comment.nameAuthor ? comment.nameAuthor : 'Anônimo'}</p>
                        <small className='text-muted-foreground'>{new Date(comment.created_at).toLocaleString('pt-BR', { timeZone: 'UTC' })}</small>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        {index !== comments.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                        <Card className='px-2 py-8'>
                            {comment.text}
                        </Card>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
}
