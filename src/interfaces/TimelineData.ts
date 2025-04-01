export interface Evento {
    title: string;
    description: string;
}

export interface Year {
    title: string;
    tech: string[];
    events: Evento[];
}

export interface Timeline {
    [year: number]: Year;
}