import SDocsLogger, { SDocsLoggerInterface, createLogger } from "./index";
import winston, { LoggerOptions } from "winston";
import { getLogConfig } from "../../logger.config";

afterEach(() => {
  jest.clearAllMocks();
});

describe("createLogger", () => {
  it("loggerが作成されること", async () => {
    // * Arrage
    const expectConfig: LoggerOptions = {
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error",
        }),
        new winston.transports.File({ filename: "logs/combined.log" }),
      ],
    };

    const expectCreateLogger: winston.Logger =
      winston.createLogger(expectConfig);
    let actualOptions: LoggerOptions | undefined = {};
    jest
      .spyOn(winston, "createLogger")
      .mockImplementation((options: LoggerOptions | undefined) => {
        actualOptions = options;
        return expectCreateLogger;
      });

    // * Act
    const actualCreateLogger: LoggerOptions = createLogger(expectConfig);

    // * Assert
    expect(actualCreateLogger).toBe(expectCreateLogger);
    expect(actualOptions).toBe(expectConfig);
  });
});

describe("SDocsLogger.knexNodeEnvLog", () => {
  it("knexでのNODE_ENVに関するログメッセージがロガーのlogに渡されること", () => {
    // * Arrange
    const logger = winston.createLogger(getLogConfig());
    let actualLevel: string = "";
    let actualMessage: string = "";
    let actualMeta = undefined;

    jest
      .spyOn(logger, "log")
      .mockImplementation((level: string, message: string, ...meta) => {
        actualLevel = level;
        actualMessage = message;
        actualMeta = meta;
        return logger;
      });
    const targetLogger = new SDocsLogger(logger);

    // * Act
    targetLogger.knexNodeEnvLog("test-node-env");

    // * Assert
    expect(actualLevel).toEqual("info");
    expect(actualMessage).toEqual("NODE_ENV is test-node-env");
    expect(actualMeta).toEqual([]);
  });
});

describe("SDocsLogger.knexSeedLog", () => {
  it("knexでのseed nameに関するログメッセージがロガーのlogに渡されること", () => {
    // * Arrange
    const logger = winston.createLogger(getLogConfig());
    let actualLevel: string = "";
    let actualMessage: string = "";
    let actualMeta = undefined;

    jest
      .spyOn(logger, "log")
      .mockImplementation((level: string, message: string, ...meta) => {
        actualLevel = level;
        actualMessage = message;
        actualMeta = meta;
        return logger;
      });
    const targetLogger: SDocsLoggerInterface = new SDocsLogger(logger);

    // * Act
    targetLogger.knexSeedLog("test-seed-name");

    // * Assert
    expect(actualLevel).toEqual("info");
    expect(actualMessage).toEqual("Knex seed test-seed-name");
    expect(actualMeta).toEqual([]);
  });
});
describe("SDocsLogger.expressServerStartLog", () => {
  it("express起動に関するログメッセージがロガーのlogに渡されること", () => {
    // * Arrange
    const logger = winston.createLogger(getLogConfig());

    let actualMessage: string = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let actualMeta: any[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockInfo = (message: any, ...meta: any) => {
      actualMessage = message;
      actualMeta = meta;
      return logger;
    };

    jest.spyOn(logger, "info").mockImplementation(mockInfo);
    const targetLogger: SDocsLoggerInterface = new SDocsLogger(logger);

    // * Act
    targetLogger.expressServerStartLog("test-server");

    // * Assert
    expect(actualMessage).toEqual("Express server listening on port test-server");
    expect(actualMeta).toEqual([]);
  });
});
