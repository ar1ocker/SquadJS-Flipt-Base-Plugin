//@ts-check
import BasePlugin from "./base-plugin.js";
import { OpenFeature } from "@openfeature/web-sdk";
import { OFREPWebProvider } from "@openfeature/ofrep-web-provider";

export default class BaseFeatureFlagsPlugin extends BasePlugin {
  constructor(server, options, connectors) {
    super(server, options, connectors);

    const featureFlagsConfig = this.options.feature_flags;

    OpenFeature.setProvider(
      this.constructor.name,
      new OFREPWebProvider({
        baseUrl: featureFlagsConfig.url,
        pollInterval: 30000,
        headers: [["X-Flipt-Namespace", featureFlagsConfig.namespace]],
      })
    );

    this.ffClient = OpenFeature.getClient(this.constructor.name);
    this.ffClient.addHooks({
      error: (hookContext, err) => {
        this.verbose(1, `Feature flag error: ${err?.message}`);
      },
    });
  }

  async warn(playerID, message, repeat = 1, frequency = 5) {
    for (let i = 0; i < repeat; i++) {
      await this.server.rcon.warn(playerID, message + "\u{00A0}".repeat(i));

      if (i !== repeat - 1) {
        await new Promise((resolve) => setTimeout(resolve, frequency * 1000));
      }
    }
  }
}
