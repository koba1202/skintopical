import { useState } from 'react';
import HomeScreen from '@/components/home/HomeScreen'
import TreatmentPlanSetting from '@/components/plan/TreatmentPlanSetting'

type Page = 'home' | 'plan';

function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div>
      <h1>skintopical</h1>
      {/* <nav> */}
      {/*   <botton type="button" onClick={() => {setPage('home')}}>ホーム</botton> */}
      {/*   <botton type="button" onClick={() => {setPage('plan')}}>治療計画</botton> */}
      {/* </nav> */}
      {/* {page === 'home' ? <HomeScreen /> : <TreatmentPlanSetting/>} */}
      <HomeScreen />
      <hr/>
      <TreatmentPlanSetting/>
    </div>
  );
}

export default App;
