

interface Data {
    userId: string | null
}

export interface ThrowSuccess {
    data: Data,
    status: number,
    message: string
}