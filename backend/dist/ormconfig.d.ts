export let type: string;
export let host: string;
export let port: number;
export let username: string;
export let password: string;
export let database: string;
export let synchronize: boolean;
export let logging: boolean;
export let entities: string[];
export let migrations: string[];
export let subscribers: string[];
export namespace cli {
    let entitiesDir: string;
    let migrationsDir: string;
    let subscribersDir: string;
}
