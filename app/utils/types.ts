export interface Customer {
  _id: any;
  name: string;
  email: string;
  phone: string;
  tableData?: {
    id: number;
  };
}

export interface Note {
  userId: string;
  _id: string;
}
