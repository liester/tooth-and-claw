import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import styles from './CusomterList.css';
import db from '../../utils/db';

interface Customer {
  id: any;
  name: string;
  email: string;
  phone: string;
  tableData?: {
    id: number;
  };
}

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'email' },
  { title: 'Phone', field: 'phone' },
];

export default function CustomerList(): JSX.Element {
  const [searchText] = useState('');

  const [customers, setCustomers] = useState<Customer[] | []>([]);

  useEffect(() => {
    db.customers.find({}).then((customers) => {
      setCustomers(customers);
    });
  }, []);
  return (
    <div className={styles.container} data-tid="container">
      <div className={styles.tableContainer}>
        <MaterialTable
          title="Customer Information"
          columns={columns}
          data={customers}
          options={{
            pageSize: 40,
            pageSizeOptions: [40, 100],
            emptyRowsWhenPaging: false,
            rowStyle: { height: 75 },
            exportButton: true,
            search: true,
            searchText: searchText || '',
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(async () => {
                  const customer: Customer = await db.customers.insert(newData);
                  setCustomers([...customers, customer]);

                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  if (oldData) {
                    const dataUpdate = [...customers];
                    const index = (oldData.tableData || {}).id;
                    if (index) {
                      dataUpdate[index] = newData;
                      setCustomers([...dataUpdate]);
                    }
                  }
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData: Customer) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  const dataDelete = [...customers];
                  const index = (oldData.tableData || {}).id;
                  if (index) {
                    dataDelete.splice(index, 1);
                    setCustomers([...dataDelete]);
                  }
                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
    </div>
  );
}
