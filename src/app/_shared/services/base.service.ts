
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

    constructor(private client: HttpClient) {}

}
