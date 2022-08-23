/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import { LocalShellSession } from "./local-shell-session";
import type { Cluster } from "../../../common/cluster/cluster";
import type WebSocket from "ws";
import createKubectlInjectable from "../../kubectl/create-kubectl.injectable";
import terminalShellEnvModifiersInjectable from "../shell-env-modifier/terminal-shell-env-modify.injectable";

interface InstantiationParameter {
  webSocket: WebSocket;
  cluster: Cluster;
  tabId: string;
}

const localShellSessionInjectable = getInjectable({
  id: "local-shell-session",

  instantiate: (di, { cluster, tabId, webSocket }: InstantiationParameter) => {
    const createKubectl = di.inject(createKubectlInjectable);
    const localShellEnvModify = di.inject(terminalShellEnvModifiersInjectable);

    const kubectl = createKubectl(cluster.version);

    return new LocalShellSession(localShellEnvModify, kubectl, webSocket, cluster, tabId);
  },

  lifecycle: lifecycleEnum.transient,
});

export default localShellSessionInjectable;
