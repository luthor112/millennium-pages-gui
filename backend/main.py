import Millennium, PluginUtils # type: ignore
logger = PluginUtils.Logger()

###############
# PLUGIN UTIL #
###############

def install_plugin_url(plugin_url):
    pass

##############
# INTERFACES #
##############

class Backend:
    @staticmethod
    def install_plugin(plugin_url):
        logger.log(f"install_plugin({plugin_url})")
        return True

class Plugin:
    def _front_end_loaded(self):
        logger.log("Frontend loaded")

    def _load(self):
        logger.log(f"Plugin base dir: {PLUGIN_BASE_DIR}")

        logger.log("Backend loaded")
        Millennium.ready()

    def _unload(self):
        logger.log("Unloading")
