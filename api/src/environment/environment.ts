interface EnvironmentConfig {
    enviroment: string;
    dbUrl: string;
    dbUsername: string;
    dbPassword: string;
    port: number;
}

export const environment: EnvironmentConfig = {
    enviroment: process.env.NODE_ENV as string,
    dbUrl: process.env.DB_URL as string,
    dbUsername: process.env.DB_USER as string,
    dbPassword: process.env.DB_PASSWORD as string,
    port: 80,
};