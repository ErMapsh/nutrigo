import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../redux/store";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // Initialize with AppStore, not null
    const storeRef = useRef<AppStore>(makeStore());

    return <Provider store={storeRef.current}>{children}</Provider>;
}
