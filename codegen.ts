import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/generated/graphql-schema.graphql',
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-operations',
        'typescript-react-query',
      ],
    },
  },
}

export default config
