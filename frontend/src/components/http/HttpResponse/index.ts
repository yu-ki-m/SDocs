export interface HttpResponseInterface<D> {
    status: number
    data: D
    statusText: string
}

export default class HttpResponse<D> implements HttpResponseInterface<D> {
    status: number
    data: D
    statusText: string
    constructor(status: number, statusText: string, data: D) {
        this.status = status
        this.statusText = statusText
        this.data = data
    }
}
