import { APIRequestContext, APIResponse } from '@playwright/test';
import { ConduitApiClient } from '../api/clients/ConduitApiClient';

/**
 * ApiHelper wraps APIRequestContext with convenience HTTP methods
 * and exposes typed API clients as properties.
 *
 * Methods return the raw APIResponse without asserting status —
 * status validation is the responsibility of each API client method
 * or the test itself, to allow both positive and negative scenarios.
 */
export class ApiHelper {
  private readonly request: APIRequestContext;
  readonly conduitApiClient: ConduitApiClient;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.conduitApiClient = new ConduitApiClient(this);
  }

  async get(url: string, options?: Parameters<APIRequestContext['get']>[1]): Promise<APIResponse> {
    return this.request.get(url, options);
  }

  async post(
    url: string,
    options?: Parameters<APIRequestContext['post']>[1],
  ): Promise<APIResponse> {
    return this.request.post(url, options);
  }

  async put(url: string, options?: Parameters<APIRequestContext['put']>[1]): Promise<APIResponse> {
    return this.request.put(url, options);
  }

  async delete(
    url: string,
    options?: Parameters<APIRequestContext['delete']>[1],
  ): Promise<APIResponse> {
    return this.request.delete(url, options);
  }
}
