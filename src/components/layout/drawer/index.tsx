import {useTranslations} from "next-intl";

import DrawerContent from "@/components/layout/drawer/DrawerContent";

const Drawer = ()=>{
    const t = useTranslations();
    const routes = [
        {"label": t("tasks.create"), "to": "/"},
        {"label": t("tasks.find"), "to": "/"},
        {"label": t("tasks.my"), "to": "/"},
    ]
    return (
        <DrawerContent
            messages={{"connect": t("common.connect"), "text_support": t("common.text_support")}}
            routes={routes}/>
    )
}

export default Drawer;
