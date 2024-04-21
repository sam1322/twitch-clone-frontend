import { FC } from "react";

interface KeysPageProps {}

const KeysPage: FC<KeysPageProps> = ({}) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        {/* <ConnectModal /> */}
      </div>
      <div className="space-y-4">
        {/* <UrlCard value={stream.serverUrl} />
    <KeyCard value={stream.streamKey} /> */}
      </div>
    </div>
  );
};

export default KeysPage;
