import React, { useMemo } from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import { Container, Info, CheckinList, Time } from './styles';

export default function CheckIn({ data, num }) {
  const dataParsered = useMemo(() => {
    return formatDistanceToNow(parseISO(data.createdAt), new Date(), {
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Info>
        <CheckinList>Checkin #{num + 1}</CheckinList>
        <Time>{dataParsered} ago</Time>
      </Info>
    </Container>
  );
}

CheckIn.propTypes = {
  data: PropTypes.shape({ createdAt: PropTypes.string.isRequired }).isRequired,
  num: PropTypes.number.isRequired,
};
