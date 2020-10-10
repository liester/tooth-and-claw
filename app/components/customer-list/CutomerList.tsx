import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import styles from './CusomterList.css';
import db from '../../utils/db';
import routes from '../../constants/routes.json';

interface Customer {
  _id: any;
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
  const history = useHistory();
  const [searchText] = useState('');

  const [customers, setCustomers] = useState<Customer[] | []>([]);

  useEffect(() => {
    db.customers.find<Customer>({}).then((dbCustomers) => {
      setCustomers(dbCustomers);
      return dbCustomers;
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
          actions={[
            {
              icon: 'note',
              tooltip: 'Add Note',
              onClick: (_event, rowData) => {
                if ('_id' in rowData) {
                  history.push(`${routes.COUNTER}/${rowData._id}`);
                }
              },
            },
          ]}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(async () => {
                  const customer: Customer = await db.customers.insert(newData);
                  setCustomers([...customers, customer]);

                  resolve();
                }, 1000);
              }),
            onRowUpdate: async (newData) => {
              await db.customers.update<Customer>(
                { _id: newData._id },
                { ...newData }
              );
              const updatedCustomers = await db.customers.find<Customer>({});
              setCustomers(updatedCustomers);
            },
            onRowDelete: async (oldData: Customer) => {
              await db.customers.remove({ _id: oldData._id }, { multi: false });
              const updatedCustomers = await db.customers.find<Customer>({});
              setCustomers(updatedCustomers);
            },
          }}
        />
      </div>
    </div>
  );
}
