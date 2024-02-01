import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { routingControllersOptions } from "..";

const schemas: { [schema: string]: any } = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
})

const storage = getMetadataArgsStorage();

export const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      basicAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',  
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
    },
  },
  openapi: "3.0.0",
  info: {
    title: "AIMA Documentation",
    version: "0.1.0",
    description: "Initial docs",
    license: {
      name: "MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
  },
  servers: [
    {
      url: "http://localhost:3005",
    },
  ],
})