import winston,{ LoggerOptions }  from "winston";
import Env, { ENV_KEY, EnvInterface } from "./src/EnvMananger";

export const getLogConfig = ():LoggerOptions => {
  
  const env:EnvInterface = new Env(process.env);
  const nodeEnv: string = env.get(ENV_KEY.NODE_ENV);

  if (nodeEnv === "development" || nodeEnv === "test") {
    return {
      level: "debug",
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: "logs/error.log",level: "error"}),
        new winston.transports.File({ filename: "logs/app.log" }),
      ],
    };
  } else if (nodeEnv === "production") {
    return {
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: "logs/error.log",level: "error"}),
        new winston.transports.File({ filename: "logs/app.log" }),
      ],
    };
  } else {
    throw new Error("NODE_ENV is not set");
  }
};
