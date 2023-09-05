'use client'

import * as storage from "../storage/storage.service";

const getAccessToken = (): string | null => {
  if (storage.getItem("token"))
    return String(storage.getItem("token")).replace('"', "").replace('"', "");
  return null;
};

export { getAccessToken };
