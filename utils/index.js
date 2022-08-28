import { v4 as uuidv4 } from "uuid";

export const initialKey = {
  id: uuidv4(),
  title: "",
  cpa: "",
  cda: "",
  space: "",
  token: "",
};

export const STRINGS = {
  ADD_LABEL: "Add site",
  SAVE_LABEL: "Save site",
  CLEAR_LABEL: "Remove all sites",
  IMPORT_LABEL: "Import configuration",
  EXPORT_LABEL: "Export configuration",
  TITLE: "Title",
  CPA: "CPA",
  CDA: "CDA",
  TOKEN: "Token",
  ACCESS_TOKEN: "Access Token",
  SPACE: "Space",
  SPACE_ID: "SpaceID",
  ADD_ENTRY: "+ Add Entry",
  AUTH_TOKEN: "keyPassData",
  INVALID_ENTRY: "Please enter a valid entry.",
  INVALID_EXPORT: "Please enter exported config data.",
  SITE_TITLE: "Contentful KeyPass",
  SITE_INFO:
    "Contentful KeyPass is a tool to assist web developers who work with Contentful sites on a daily basis.",
};
