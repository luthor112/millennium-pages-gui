import Millennium, PluginUtils # type: ignore
logger = PluginUtils.Logger()

class Plugin:
    def _front_end_loaded(self):
        logger.log("Frontend loaded")

    def _load(self):
        logger.log(f"Plugin base dir: {PLUGIN_BASE_DIR}")

        logger.log("Backend loaded")
        Millennium.ready()

    def _unload(self):
        logger.log("Unloading")
