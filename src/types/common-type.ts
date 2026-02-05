export type BaseCommonDataProp = {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
};

export type fileObjetType = {
  uri?: string;
  type?: string; // e.g. 'image/jpeg'
  filename?: string; // e.g. 'photo.jpg'
};
