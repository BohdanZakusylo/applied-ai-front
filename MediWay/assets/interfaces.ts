export interface MessageProp {
    id: string
    isIncoming: boolean,
    text: string
}

export interface ChatResponse {
    response: string
    message_id: string
    timestamp: string
}