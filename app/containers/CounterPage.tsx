import React from 'react';
import Counter from '../features/counter/Counter';

export default function CounterPage(props: any) {
  const { userId } = props.match.params;
  return <Counter userId={userId} />;
}
