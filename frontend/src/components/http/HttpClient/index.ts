import { AxiosInstance ,AxiosResponse } from "axios";
import HttpResponse, { HttpResponseInterface} from '../HttpResponse/index'

export interface HttpInterface {
    get<D>(url: string): Promise<HttpResponse<D>>;
    post<D>(url: string, body: any): Promise<HttpResponse<D>>;
    put<D>(url: string, body: any): Promise<HttpResponse<D>>;
    delete<D>(url: string): Promise<HttpResponse<D>>;
}

export default class HttpClient implements HttpInterface {
  apiClient: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  async get<D>(url: string): Promise<HttpResponseInterface<D>> {
    return this.apiClient.get<D, AxiosResponse<D>>(url).then((response) => {
      return new HttpResponse<D>(response.status,response.statusText,response.data)
    });
  }

  async post<D>(url: string, body: any): Promise<HttpResponseInterface<D>> {
    return this.apiClient.post<D, AxiosResponse<D>>(url, body).then((response) => {
      return new HttpResponse<D>(response.status,response.statusText,response.data)
    });
  }

  async put<D>(url: string, body: any): Promise<HttpResponseInterface<D>> {
    return this.apiClient.put<D, AxiosResponse<D>>(url, body).then((response) => {
      return new HttpResponse<D>(response.status,response.statusText,response.data)
    });
  }

  async delete<D>(url: string): Promise<HttpResponseInterface<D>> {
    return this.apiClient.delete<D,AxiosResponse<D>>(url).then((response) => {
      return new HttpResponse<D>(response.status,response.statusText,response.data)
    });
  }
}
