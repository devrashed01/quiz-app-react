import { useContext } from 'react';

import { AppContext } from 'context/AppContext';

const useAppState = () => useContext(AppContext);

export default useAppState;
