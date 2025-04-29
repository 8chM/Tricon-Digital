import { Amplify } from 'aws-amplify';

const config = {
  API: {
    GraphQL: {
      endpoint: 'https://ytndk7v7wnbulcr2sofehyxzrm.appsync-api.eu-central-1.amazonaws.com/graphql',
      region: 'eu-central-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-n2ye4z5udrcvldbz6ch3vrduta'
    }
  }
};

Amplify.configure({ ...config, ssr: true });

export default config;