import { Millennium, sleep } from "@steambrew/client";

const WaitForElement = async (sel: string, parent = document) =>
	[...(await Millennium.findElement(parent, sel))][0];

const WaitForElementTimeout = async (sel: string, parent = document, timeOut = 1000) =>
	[...(await Millennium.findElement(parent, sel, timeOut))][0];

const WaitForElementList = async (sel: string, parent = document) =>
	[...(await Millennium.findElement(parent, sel))];

async function OnPopupCreation(popup: any) {
    if (popup.m_strTitle === "Store Supernav") {
        var mwbm = undefined;
        while (!mwbm) {
            console.log("[millennium-pages-gui] Waiting for MainWindowBrowserManager");
            try {
                mwbm = MainWindowBrowserManager;
            } catch {
                await sleep(100);
            }
        }

        const anyItem = await WaitForElement("div.contextMenuItem", popup.m_popup.document);
        const pluginsItem = anyItem.cloneNode(true);
        const themesItem = anyItem.cloneNode(true);

        pluginsItem.textContent = "Plugins";
        anyItem.parentNode.appendChild(pluginsItem);
        pluginsItem.addEventListener("click", async () => {
            MainWindowBrowserManager.ShowURL("https://steambrew.app/plugins", "store");
        });

        themesItem.textContent = "Themes";
        anyItem.parentNode.appendChild(themesItem);
        themesItem.addEventListener("click", async () => {
            MainWindowBrowserManager.ShowURL("https://steambrew.app/themes", "store");
        });
    }
}

export default async function PluginMain() {
    console.log("[millennium-pages-gui] Frontend startup");
    await App.WaitForServicesInitialized();

    g_PopupManager.m_mapPopups.data_.forEach(popup => {
        if (popup.value_.m_strTitle === "Store Supernav") {
            OnPopupCreation(popup.value_);
        }
    });

	g_PopupManager.AddPopupCreatedCallback(OnPopupCreation);
}
