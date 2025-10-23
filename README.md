# SquadJS-Flipt-Base-Plugin

Базовый класс для SquadJS с поддержкой Flipt, сервиса фича флагов, для динамического включения и выключения работы плагинов или их фич

Используется примерно вот так

```js
export default class MyCoolPlugin extends BaseFeatureFlagsPlugin {

...

  this.server.on(`CHAT_COMMAND:${command}`, (data) => {
    if (!this.ffClient.getBooleanValue("flag_key__enabled", false)) {
      this.verbose(2, "Вызов команды: Флаг выключен");
      return;
    }
    ... какой-то код
  });
```

P.s.: вам понадобится поднятый [Flipt](https://flipt.io/)
