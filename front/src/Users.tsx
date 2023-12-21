import { useState } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  useRecordContext,
  BooleanInput,
  PasswordInput,
  SelectInput,
} from "react-admin";
import {
  inputAttributes,
  validateUsername,
  validateEmail,
  validatePassword,
} from "./inputAttributes";

export const UserList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  const isLarge = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.username}
          secondaryText={(record) => record.role}
        />
      ) : !isLarge ? (
        <SimpleList
          primaryText={(record) => record.username}
          secondaryText={(record) => record.email}
          tertiaryText={(record) => record.role}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="username" />
          <TextField source="email" />
          <TextField source="role" />
          <EmailField source="password" />
          <TextField source="id_abonne" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

const UserTitle = () => {
  const record = useRecordContext();
  return <span> Profil {record ? `"${record.username}"` : ""}</span>;
};

const roleList = [
  { id: "abonne", name: "Abonné(e)", value: "abonne" },
  { id: "gestionnaire", name: "Gestionnaire", value: "gestionnaire" },
  { id: "admin", name: "Administrateur", value: "admin" },
];

export const UserEdit = () => {
  const [changePassword, setChangePassword] = useState(false);

  return (
    <Edit title={<UserTitle />}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput
          source="username"
          validate={validateUsername}
          title={inputAttributes.title.username}
        />
        <TextInput
          source="email"
          validate={validateEmail}
          title={inputAttributes.title.password}
        />
        <BooleanInput
          source="changePassword"
          label="Changer le mot de passe"
          onChange={(event) => setChangePassword(event.target.checked)}
        />
        {changePassword && (
          <PasswordInput
            source="password"
            name=""
            validate={validatePassword}
            title={inputAttributes.title.password}
          />
        )}
        <SelectInput source="role" choices={roleList} />
        <TextInput source="id_abonne" disabled />
      </SimpleForm>
    </Edit>
  );
};

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="username"
        validate={validateUsername}
        title={inputAttributes.title.username}
      />
      <TextInput
        source="email"
        validate={validateEmail}
        title={inputAttributes.title.password}
      />
      <PasswordInput
        source="password"
        validate={validatePassword}
        title={inputAttributes.title.password}
      />
      <SelectInput source="role" choices={roleList} />
    </SimpleForm>
  </Create>
);
