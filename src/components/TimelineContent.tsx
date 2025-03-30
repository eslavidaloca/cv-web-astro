"use client";

import type { Year } from '@/interfaces/TimelineData';
import { Badge }  from "@/components/ui/badge"

interface Props {
    data: Year;
}

export function TimelineContent(data: Props) {
    return (
        <div>
            <div className="text-3xl text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-bronze-800 to-jade-800">
                {data.data.title}
            </div>
            <div>
                {data.data.tech.map((tech, index) => <Badge key={index} className="bg-accent text-accent-foreground text-xs rounded-md p-1 mr-2 my-2">{tech}</Badge>)}
            </div>
            <ul>
                {data.data.events.map((event) =>
                <li>
                    <div className="font-bold text-2xl text-bronze-600">
                        {event.title}
                    </div>
                    <div>
                        {event.description}
                    </div>
                </li>)}
            </ul>
        </div>
    )
}
