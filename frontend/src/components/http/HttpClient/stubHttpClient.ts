import { HttpInterface } from './index'
import { HttpResponseInterface } from '../HttpResponse/index'

/* eslint @typescript-eslint/no-explicit-any: 0 */

export default class StubHttpClient implements HttpInterface {
    get_wasCalled = false
    get_returnValue: HttpResponseInterface<any> = {} as HttpResponseInterface<any>
    get_actualUrl: string = ''

    async get<D>(url: string): Promise<HttpResponseInterface<D>> {
        this.get_actualUrl = url
        this.get_wasCalled = true
        return this.get_returnValue
    }

    post_wasCalled = false
    post_returnValue: HttpResponseInterface<any> = {} as HttpResponseInterface<any>
    post_actualUrl: string = ''
    post_actualBody: any = {}
    async post<D>(url: string, body: any): Promise<HttpResponseInterface<D>> {
        this.post_actualUrl = url
        this.post_wasCalled = true
        this.post_actualBody = body
        return this.post_returnValue
    }

    put_wasCalled = false
    put_returnValue: HttpResponseInterface<any> = {} as HttpResponseInterface<any>
    put_actualUrl: string = ''
    put_actualBody: any = {}
    async put<D>(url: string, body: any): Promise<HttpResponseInterface<D>> {
        this.put_actualUrl = url
        this.put_wasCalled = true
        this.put_actualBody = body
        return this.put_returnValue
    }

    delete_wasCalled = false
    delete_returnValue: HttpResponseInterface<any> = {} as HttpResponseInterface<any>
    delete_actualUrl: string = ''
    async delete<D>(url: string): Promise<HttpResponseInterface<D>> {
        this.delete_actualUrl = url
        this.delete_wasCalled = true
        return this.delete_returnValue
    }
}
