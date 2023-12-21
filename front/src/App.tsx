import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList, UserEdit, UserCreate } from "./Users";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";

import UserIcon from "@mui/icons-material/VerifiedUser";

export type ResourceType = {
  name: string;
  data: Record<string, any>;
  path?: string;
};

export type ResourcesType = Record<string, ResourceType>;

const resources: ResourcesType = {
  users: {
    name: "users",
    data: {
      icon: UserIcon,
      list: UserList,
      edit: UserEdit,
      create: UserCreate,
    },
    path: "/users",
  },
};

export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}
  >
    {Object.keys(resources).map((key) => (
      <Resource key={key} name={resources[key].name} {...resources[key].data} />
    ))}
  </Admin>
);
