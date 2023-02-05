import { ReactNode, createContext, useContext } from "react";

import { UserAgent } from "next-useragent";

export const UserAgentContext = createContext<Partial<UserAgent>>({});

/**
 * Bu method yalnızca SSR için kullanılmalıdır. Client tarafında ekran boyutu almak istiyorsan `useMatchMedia` kullanabilirsin.
 */
export const useUserDevice = () => {
  return useContext(UserAgentContext);
};

type UserAgentContextProps = {
  children: ReactNode;
  value: UserAgent;
};

export const UserDeviceProvider = (props: UserAgentContextProps) => {
  return <UserAgentContext.Provider {...props} />;
};
