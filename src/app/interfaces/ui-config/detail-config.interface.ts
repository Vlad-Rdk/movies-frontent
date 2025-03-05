export interface DetailConfig {
    image: string;
    subtitle?:string;
    description:string;
    rate: number;
    isVertical:boolean;
    detailCard:DetailCard[]
}

export interface DetailCard{
    title:string;
    description:string;
}