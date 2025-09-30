import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface IConfig {
    NODE_ENV: number;
    MONGO_URI: string;
    PORT: number;
    JWT_SECRET: string;
    CLIENT_URL: string;
    GEMINI_API_KEY: string;
    MAILTRAP_SMTP_HOST: string;
    MAILTRAP_SMTP_PORT: number;
    MAILTRAP_SMTP_USER: string;
    MAILTRAP_SMTP_PASS: string;

}


@Injectable()
export class Config implements IConfig {
    constructor(private readonly configService : ConfigService){}

    get NODE_ENV(): number {
        return this.configService.getOrThrow<number>('NODE_ENV');
    }
    get MONGO_URI(): string {
        return this.configService.getOrThrow<string>('MONGO_URI');
    }
    get PORT(): number {
        return this.configService.getOrThrow<number>('PORT');
    }
    get JWT_SECRET(): string {
        return this.configService.getOrThrow<string>('JWT_SECRET');
    }   
    get CLIENT_URL(): string {
        return this.configService.getOrThrow<string>('CLIENT_URL');
    }
    get GEMINI_API_KEY(): string {
        return this.configService.getOrThrow<string>('GEMINI_API_KEY');
    }
    get MAILTRAP_SMTP_HOST(): string {
        return this.configService.getOrThrow<string>('MAILTRAP_SMTP_HOST');
    }
    get MAILTRAP_SMTP_PORT(): number {
        return this.configService.getOrThrow<number>('MAILTRAP_SMTP_PORT');
    }
    get MAILTRAP_SMTP_USER(): string {
        return this.configService.getOrThrow<string>('MAILTRAP_SMTP_USER');
    }
    get MAILTRAP_SMTP_PASS(): string {
        return this.configService.getOrThrow<string>('MAILTRAP_SMTP_PASSWORD');
    }

    


}

