'use client';
import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';

export default function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'free-discovery-call' });
      cal('floatingButton', {
        calLink: 'michael-jones-zxe6yc/free-discovery-call',
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return null;
}
