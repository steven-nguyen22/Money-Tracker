import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export type User = {
  id: string;
  username: string;
};

export interface UserContextInterface {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
}

const defaultState = {
  userInfo: {
    id: "",
    username: "",
  },
  setUserInfo: (userInfo: User) => {
    console.log(userInfo);
  },
} as UserContextInterface;

export const UserContext = createContext(defaultState);

type UserProvideProps = {
  children: ReactNode;
};

export default function UserContextProvider({ children }: UserProvideProps) {
  const [userInfo, setUserInfo] = useState<User>({
    id: "",
    username: "",
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
