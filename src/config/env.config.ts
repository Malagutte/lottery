export default () => {
    const env = process.env.NODE_ENV
    const isProd = env.toLowerCase() == 'prod' || env.toLowerCase() == 'production';

    
    return isProd ? { ignoreEnvFile: isProd } : { envFilePath: [`.${env}.env`] }
}