/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import nodeEnvInjectionToken from "../../../common/vars/node-env-injection-token";
import loggerInjectable from "../../../common/logger.injectable";
import { onLoadOfApplicationInjectionToken } from "@k8slens/application";

const setupDeveloperToolsInDevelopmentEnvironmentInjectable = getInjectable({
  id: "setup-developer-tools-in-development-environment",

  instantiate: (di) => {
    const logger = di.inject(loggerInjectable);
    const nodeEnv = di.inject(nodeEnvInjectionToken);

    return {
      id: "setup-developer-tools-in-development-environment",
      run: () => {
        if (nodeEnv !== "development") {
          return;
        }

        logger.info("🤓 Installing developer tools");

        import("electron-devtools-installer")
          .then(({ default: devToolsInstaller, REACT_DEVELOPER_TOOLS }) =>
            devToolsInstaller([REACT_DEVELOPER_TOOLS]),
          )
          .then((name) =>
            logger.info(`[DEVTOOLS-INSTALLER]: installed ${name}`),
          )
          .catch((error) =>
            logger.error(`[DEVTOOLS-INSTALLER]: failed`, { error }),
          );
      },
    };
  },

  injectionToken: onLoadOfApplicationInjectionToken,
});

export default setupDeveloperToolsInDevelopmentEnvironmentInjectable;
