import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';
import { throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  // Color codes
  private colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
  };

  private getStatusColor(statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) return this.colors.green;
    if (statusCode >= 300 && statusCode < 400) return this.colors.yellow;
    if (statusCode >= 400 && statusCode < 500) return this.colors.red;
    if (statusCode >= 500) return this.colors.magenta;
    return this.colors.white;
  }

  private getMethodColor(method: string): string {
    switch (method.toUpperCase()) {
      case 'GET': return this.colors.blue;
      case 'POST': return this.colors.green;
      case 'PUT': return this.colors.yellow;
      case 'DELETE': return this.colors.red;
      case 'PATCH': return this.colors.magenta;
      default: return this.colors.cyan;
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    
    const { method, url, ip, headers, body } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - startTime;
        const { statusCode } = response;
        const size = data ? (Buffer.byteLength(JSON.stringify(data), 'utf8')/1024).toFixed(2) : '0.00';
        
        // Colorized success log
        console.log(
          `\n${this.getMethodColor(method)} ${method}${this.colors.reset}` +
          ` ${this.colors.yellow}${url}${this.colors.reset} - ` +
          `${this.getStatusColor(statusCode)}${statusCode}${this.colors.reset} - ` +
          `${this.colors.yellow}${duration}ms${this.colors.reset} - ` +
          `${this.colors.blue}${size} KB${this.colors.reset} - ` +
          `\n${this.colors.gray}${ip}${this.colors.reset}` +
          `${this.colors.dim}${headers['user-agent'] || ''}${this.colors.reset}`
          + `\n${this.colors.cyan}Request Body:${this.colors.reset} ` +
            JSON.stringify(body, null, 2)
          
        );
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;
        // Get status code from error or response, fallback to 500
        const statusCode = error.status || error.statusCode || response.statusCode || 500;
        
        // Colorized error log
        console.error(
          `\n${this.getMethodColor(method)}${method}${this.colors.reset} ` +
          `${this.colors.cyan}${url}${this.colors.reset} - ` +
          `${this.getStatusColor(statusCode)}${statusCode}${this.colors.reset} - ` +
          `${this.colors.yellow}${duration}ms${this.colors.reset} - ` +
          `${this.colors.red}Error: ${error.message || 'Unknown error'}${this.colors.reset} \n` +
          // `\n${this.colors.cyan}Request Body:${this.colors.reset} ` +
          //   JSON.stringify(body, null, 2)+ '\n' +
          `${this.colors.red}Stack Trace: ${this.colors.reset}${error.stack}\n`+
          `${this.colors.magenta}Cause: ${this.colors.reset}${error.cause}` 
  
        );
        
        // Re-throw the error to maintain normal error flow
        return throwError(() => error);
      })
    );
  }
}