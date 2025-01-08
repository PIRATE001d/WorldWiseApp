import { useLocation } from 'react-router-dom';

export function UseUrlPosition() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Maplat = queryParams.get('lat');
  const Maplng = queryParams.get('lng');

  return { Maplat, Maplng };
}
