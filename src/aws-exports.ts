import { Amplify } from 'aws-amplify';

const awsConfig = {
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_APPSYNC_URL,
      region: 'eu-central-1',
      defaultAuthMode: 'apiKey',
      apiKey: import.meta.env.VITE_APPSYNC_API_KEY
    }
  },
  Storage: {
    S3: {
      bucket: import.meta.env.VITE_S3_BUCKET,
      region: 'eu-central-1'
    }
  }
};

Amplify.configure({ ...awsConfig, ssr: true });

export default awsConfig;