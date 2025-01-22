// swagger/servers.js

import dotenv from 'dotenv';
dotenv.config();

const basePath = 'api';
const versionsApi = ['v1'];
const port = process.env.PORT || 3000;

const servers = [
    {
        url: `http://localhost:${port}/${basePath}/${versionsApi}`,
        description: "Local server",
        variables: {
            basePath: {
                enum: [basePath],
                default: basePath
            },
            versionApi: {
                enum: versionsApi,
                default: versionsApi[0]
            },
        },
    }
];

export default servers;
