/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import HttpClient from './index'
import axios from 'axios'
import HttpResponse from '../HttpResponse/index'

describe('HttpClient', () => {
    describe('get', () => {
        it('getメソッドが呼ばれること', async () => {
            // * Arrange
            const axiosMock = axios.create({
                baseURL: 'http://localhost:3000/api',
                headers: { 'Content-type': 'application/json' }
            })
            const mockGet = vi.fn()
            axiosMock.get = mockGet
            const expectedResponse = new HttpResponse(200, 'OK', structuredClone({ value: 'test' }))
            mockGet.mockReturnValue(Promise.resolve(expectedResponse))

            const targetHttpClient = new HttpClient(axiosMock)
            const expectedUrl = '/tests-url'

            // * Act
            const actualResponse = await targetHttpClient.get(expectedUrl)

            // * Assert
            expect(mockGet).toBeCalledTimes(1)
            expect(mockGet).toBeCalledWith(expectedUrl)
            expect(actualResponse).toEqual(expectedResponse)
        })
    })
    describe('post', () => {
        it('postメソッドが呼ばれること', async () => {
            // * Arrange
            const axiosMock = axios.create({
                baseURL: 'http://localhost:3000/api',
                headers: { 'Content-type': 'application/json' }
            })
            const mockPost = vi.fn()
            axiosMock.post = mockPost
            const expectedResponse = new HttpResponse(200, 'OK', structuredClone({ value: 'test' }))
            mockPost.mockReturnValue(Promise.resolve(expectedResponse))

            const targetHttpClient = new HttpClient(axiosMock)
            const expectedUrl = '/tests-url'
            const expectedBody = { value: 'test' }

            // * Act
            const actualResponse = await targetHttpClient.post(expectedUrl, expectedBody)

            // * Assert
            expect(mockPost).toBeCalledTimes(1)
            expect(mockPost).toBeCalledWith(expectedUrl, expectedBody)
            expect(actualResponse).toEqual(expectedResponse)
        })
    })
    describe('put', () => {
        it('putメソッドが呼ばれること', async () => {
            // * Arrange
            const axiosMock = axios.create({
                baseURL: 'http://localhost:3000/api',
                headers: { 'Content-type': 'application/json' }
            })
            const mockPut = vi.fn()
            axiosMock.put = mockPut
            const expectedResponse = new HttpResponse(200, 'OK', structuredClone({ value: 'test' }))
            mockPut.mockReturnValue(Promise.resolve(expectedResponse))

            const targetHttpClient = new HttpClient(axiosMock)
            const expectedUrl = '/tests-url'
            const expectedBody = { value: 'test' }

            // * Act
            const actualResponse = await targetHttpClient.put(expectedUrl, expectedBody)

            // * Assert
            expect(mockPut).toBeCalledTimes(1)
            expect(mockPut).toBeCalledWith(expectedUrl, expectedBody)
            expect(actualResponse).toEqual(expectedResponse)
        })
    })

    describe('delete', () => {
        it('deleteメソッドが呼ばれること', async () => {
            // * Arrange
            const axiosMock = axios.create({
                baseURL: 'http://localhost:3000/api',
                headers: { 'Content-type': 'application/json' }
            })
            const mockDelete = vi.fn()
            axiosMock.delete = mockDelete
            const expectedResponse = new HttpResponse(200, 'OK', structuredClone({ value: 'test' }))
            mockDelete.mockReturnValue(Promise.resolve(expectedResponse))

            const targetHttpClient = new HttpClient(axiosMock)
            const expectedUrl = '/tests-url'

            // * Act
            const actualResponse = await targetHttpClient.delete(expectedUrl)

            // * Assert
            expect(mockDelete).toBeCalledTimes(1)
            expect(mockDelete).toBeCalledWith(expectedUrl)
            expect(actualResponse).toEqual(expectedResponse)
        })
    })
})
