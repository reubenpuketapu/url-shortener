import { Schema, model } from 'mongoose';

export interface IUrl {
    url: string;
    short: string;
}

export const Url = model<IUrl>('Url', 
    new Schema<IUrl>({
        url: { type: String, required: true },
        short: { type: String, required: true, unique: true }
    }
));

export const generateShort = (): string => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (var i = 8; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}
