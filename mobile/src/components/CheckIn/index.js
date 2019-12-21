import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';

import { Container, Info, CheckinList, Time } from './styles';

export default function CheckIn({ data, num }) {
  const dataParserd = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Info>
        <CheckinList>Checkin #{num + 1}</CheckinList>
        <Time>{dataParserd}</Time>
      </Info>
    </Container>
  );
}
